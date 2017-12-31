package main

import (
	"log"

	"github.com/asdine/storm"
)

const (
	dbFilename = "notes_sharing.db"
)

func initDb() *storm.DB {
	db, err := storm.Open(dbFilename)

	if err != nil {
		log.Panic(err)
	}

	return db
}
