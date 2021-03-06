package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"path"
	"strconv"
	"time"
)

//queries params
const (
	loginParam    = "login"
	passwordParam = "password"
	createParam   = "create"
	sessionParam  = "session"
)

const (
	authPage = "/authPage" //TODO replace with real link
)

//errors and other string constants
const (
	errWrongMethod         = "wrong http method usage found"
	errNoActiveSessionById = "no active session with specified id"
	errNoteIdNotFound      = "note with such id wasn't found"
	errNewNoteNotProvided  = "new note value wasn't provided in body"
	errNewNoteWrongId      = "wrong id provided for new note/id cannot be changed"
)

type ContextParam int

const (
	UserContextParam      = ContextParam(iota)
	RequestIdContextParam = ContextParam(iota)
	AppContextParam       = ContextParam(iota)
)

//Auth is '/auth' http handler
type Auth struct {
	app *App
}

func (auth *Auth) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	login := r.FormValue(loginParam)
	password := r.FormValue(passwordParam)
	create := r.FormValue(createParam)

	if login == "" || password == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, "Login and password required")
		return
	}

	if create != "" {
		createUser(w, auth.app, login, password)
	} else {
		authUser(w, auth.app, login, password)
	}
}

func authUser(w http.ResponseWriter, app *App, login string, password string) {
	user := app.GetUserByLogin(login)
	if user == nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "User with login %s not found", login)

		return
	}

	if !bytes.Equal(user.PasswordHash, GetPasswordHash(password)) {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "Incorrect password for login %s", login)

		return
	}

	session := MakeSessionObject(app)
	app.AssignSessionForUser(session, user)

	expiration := time.Now().Add(365 * 24 * time.Hour)
	cookie := http.Cookie{Name: sessionParam, Value: string(session), Expires: expiration}
	http.SetCookie(w, &cookie)

	fmt.Fprintf(w, "Auth with %s", login)
}

func createUser(w http.ResponseWriter, app *App, login string, password string) {
	err := app.AddUser(login, password)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, err)
	} else {
		fmt.Fprintf(w, "User %s created", login)
	}
}

//Notes is '/notes' http handler
type Notes struct {
	app *App
}

func (notes *Notes) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	user := getUserFromContext(r.Context())

	noteId, err := getNoteIdIfSpecified(r)
	isNoteIdSpecified := /*noteId != -1 &&*/ err == nil

	if isNoteIdSpecified {
		notes.serveExactNote(w, r, user, noteId)
	} else {
		notes.serveAllNotes(w, r, user)
	}
}

//TODO minimize code duplication
func (notes *Notes) serveAllNotes(w http.ResponseWriter, r *http.Request, user *User) {
	switch r.Method {
	case "GET":
		notes := notes.app.GetNotesByUser(user)

		notesJson, err := json.Marshal(notes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprint(w, string(notesJson))
	case "POST":
		note := notes.app.CreateNewNote(user)

		noteJson, err := json.Marshal(note)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprint(w, string(noteJson))
	default:
		http.Error(w, errWrongMethod, http.StatusBadRequest)
	}
}

func (notes *Notes) serveExactNote(w http.ResponseWriter, r *http.Request, user *User, noteId int) {
	switch r.Method {
	case "PUT":
		note := notes.app.GetNoteByUser(user, noteId)
		if note == nil {
			http.Error(w, errNoteIdNotFound, http.StatusBadRequest)
			return
		}

		newNote, err := getNewNoteValue(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if newNote.Id != note.Id {
			http.Error(w, errNewNoteWrongId, http.StatusBadRequest)
		}

		notes.app.SaveNote(newNote)
	case "DELETE":
		note := notes.app.GetNoteByUser(user, noteId)
		if note == nil {
			http.Error(w, errNoteIdNotFound, http.StatusBadRequest)
			return
		}

		notes.app.RemoveNote(note)
	default:
		http.Error(w, errWrongMethod, http.StatusBadRequest)
	}
}

func getNewNoteValue(r *http.Request) (*Note, error) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return nil, err
	}

	if len(body) > 0 {
		note := new(Note)
		err := json.Unmarshal(body, note)
		if err != nil {
			return nil, err
		}

		return note, nil
	} else {
		return nil, fmt.Errorf(errNewNoteNotProvided)
	}
}

func getNoteIdIfSpecified(r *http.Request) (int, error) {
	idRaw := path.Base(r.URL.Path)
	return strconv.Atoi(idRaw)
}

//CheckAuthorized validates whether session was provided, and it's actually active session for real user,
//requires *App in context
func CheckAuthorized(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, found := getUser(r, getAppFromContext(r.Context())); !found {
			http.Redirect(w, r, authPage, http.StatusUnauthorized)
		} else {
			h.ServeHTTP(w, r)
		}
	})
}

func getUser(r *http.Request, app *App) (*User, bool) {
	sessionCookie, err := r.Cookie(sessionParam)
	if err != nil {
		return nil, false
	}

	user, found := getUserByActiveSession(app, Session(sessionCookie.Value))
	return user, found
}

func getUserByActiveSession(app *App, session Session) (*User, bool) {
	user, found := app.ActiveSessions[session]
	return user, found
}

//WithUser adds *User parameter in context,
//requires *App in context
func WithUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, userFound := newContextWithUser(r.Context(), r)

		if userFound { //TODO log an error
			next.ServeHTTP(w, r.WithContext(ctx))
		} else {
			http.Error(w, errNoActiveSessionById, http.StatusBadRequest)
		}
	})
}

//requires *App in context
func newContextWithUser(ctx context.Context, r *http.Request) (context.Context, bool) {
	app := getAppFromContext(ctx)
	user, found := getUser(r, app)

	if !found {
		return ctx, false
	}

	return context.WithValue(ctx, UserContextParam, user), true
}

func getUserFromContext(ctx context.Context) *User {
	return ctx.Value(UserContextParam).(*User)
}

//WithApp adds *App parameter in context
func WithApp(next http.Handler, app *App) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		ctx := context.WithValue(req.Context(), AppContextParam, app)
		next.ServeHTTP(rw, req.WithContext(ctx))
	})
}

func getAppFromContext(ctx context.Context) *App {
	return ctx.Value(AppContextParam).(*App)
}
