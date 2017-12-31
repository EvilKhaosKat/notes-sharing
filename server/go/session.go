package main

import "math/rand"

const (
	sessionLength = 16
)

type Session string

func MakeSessionObject(app *App) Session {
	session := makeSessionByString()
	for {
		if app.IsSessionExists(session) {
			session = Session(createRandomString())
		} else {
			break
		}
	}

	return session
}

func makeSessionByString() Session {
	return Session(createRandomString())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func createRandomString() string {
	b := make([]rune, sessionLength)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}