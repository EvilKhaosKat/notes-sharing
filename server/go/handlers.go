package main

import (
	"bytes"
	"fmt"
	"net/http"
	"time"
)

const (
	loginParam    = "login"
	passwordParam = "password"
	createParam   = "create"
	sessionParam  = "session"
)

type Auth struct {
	app *App
}

//Auth is http handler function
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

	fmt.Fprintf(w, "Auth with %s:%s", login, password)
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
