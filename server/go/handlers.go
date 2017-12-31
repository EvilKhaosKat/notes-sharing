package main

import (
	"fmt"
	"net/http"
)

const (
	loginParam    = "login"
	passwordParam = "password"
	createParam   = "create"
)


type Auth struct{
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
		authUser(w, login, password)
	}
}

func authUser(w http.ResponseWriter, login string, password string) {
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
