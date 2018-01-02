package main

import (
	"math/rand"
	"time"
)

// main function
func main() {
	rand.Seed(time.Now().UnixNano())

	app := initApp()
	app.StartWebServer()
	defer app.Close()
}

func initApp() *App {
	app := &App{Db: initDb(), ActiveSessions: make(map[Session]*User)}
	app.LoadUsers()

	return app
}
