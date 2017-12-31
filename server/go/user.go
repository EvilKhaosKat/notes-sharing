package main

//User struct stands for user model description
type User struct {
	ID           int `storm:"id,increment"`
	Login        string
	PasswordHash []byte
	Name         string
}

