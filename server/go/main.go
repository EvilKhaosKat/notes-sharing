package main

import (
	"fmt"
	"net/http"

	"./handlers"
)

func main() {
	http.HandleFunc("/auth", handlers.Auth)

	fmt.Println("Starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
