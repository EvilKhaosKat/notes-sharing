package handlers

import (
	"fmt"
	"net/http"
)

//Auth is http handler function
func Auth(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Test auth")
}
