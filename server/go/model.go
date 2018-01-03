package main

import "time"

//User describes user model
type User struct {
	Id           int `storm:"id,increment"`
	Login        string
	PasswordHash []byte
	Name         string
}

//UserId is wrapper for int (currently used as id for user in model)
type UserId int

//Note describes note model
type Note struct {
	Id          int `storm:"id,increment"`
	Head        string
	Body        string
	Archived    bool
	CreatedWhen time.Time
	CreateBy    int
	Owners      []int //TODO replace with UserId
}
