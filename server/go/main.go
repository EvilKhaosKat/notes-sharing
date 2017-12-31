package main

import (
	"time"
	"math/rand"
)

// main function
func main() {
	rand.Seed(time.Now().UnixNano())

	app := initApp()
	app.StartWebServer()
}

func initApp() *App {
	app := &App{Db: initDb(), ActiveSessions: make(map[Session]*User)}
	app.LoadUsers()

	return app
}
