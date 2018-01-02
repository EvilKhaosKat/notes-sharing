package main

import (
	"crypto/sha256"
	"fmt"
	"log"
	"net/http"

	"github.com/asdine/storm"
)

//App is core structure, represents server application
type App struct {
	Db    *storm.DB
	users []*User
	ActiveSessions map[Session]*User
}

func (app *App) StartWebServer() {
	http.Handle("/auth", &Auth{app})

	fmt.Println("Starting server at :8080")
	http.ListenAndServe(":8080", nil)
}

func (app *App) AddUser(login, password string) error {
	if app.IsUserExists(login) {
		return fmt.Errorf("user with login %s already exists", login)
	}

	user := &User{Login: login, PasswordHash: GetPasswordHash(password)}
	app.users = append(app.users, user)
	app.Db.Save(user)

	return nil
}

//TODO create hash only once, and reset it
func GetPasswordHash(password string) []byte {
	hash := sha256.New()
	hash.Write([]byte(password))

	return hash.Sum(nil)
}

func (app *App) IsUserExists(login string) bool {
	return app.GetUserByLogin(login) != nil
}

func (app *App) GetUserByLogin(login string) *User {
	for _, user := range app.users {
		if user.Login == login {
			return user
		}
	}

	return nil
}

func (app *App) LoadUsers() {
	var users []*User

	err := app.Db.All(&users)
	if err != nil {
		log.Panic(err)
	}

	app.users = users
}

func (app *App) Close() {
	//TODO close webserver
	app.Db.Close()
}

func (app *App) GetUserBySession(session Session) *User {
	user, _ := app.ActiveSessions[session]

	return user
}

func (app *App) IsSessionExists(session Session) bool {
	return app.GetUserBySession(session) != nil
}

func (app *App) AssignSessionForUser(session Session, user *User) {
	app.ActiveSessions[session] = user
}