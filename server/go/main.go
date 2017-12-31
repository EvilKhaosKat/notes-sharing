package main

// main function
func main() {
	app := initApp()
	app.StartWebServer()
}

func initApp() *App {
	app := &App{Db: initDb()}
	app.LoadUsers()

	return app
}
