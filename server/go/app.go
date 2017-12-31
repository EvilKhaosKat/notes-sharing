package main

import (
	"fmt"
	"crypto/sha256"
	"github.com/asdine/storm"
	"net/http"
	"log"
)

//App is core structure, represents server application
type App struct {
	Db    *storm.DB
	users []*User
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

	hasher := sha256.New()
	hasher.Write([]byte(password))

	user := &User{Login: login, PasswordHash: hasher.Sum(nil)}
	app.users = append(app.users, user)
	app.Db.Save(user)

	return nil
}

func (app *App) IsUserExists(login string) bool {
	for _, user := range app.users {
		if user.Login == login {
			return true
		}
	}

	return false
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
