package main

import (
	"fmt"
	"net/http"
)

var (
	username = "abc"
	password = "123"
)

func setupResponse(w *http.ResponseWriter, req *http.Request) {
    // allowing access to only localhost be able to make the request
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func (app *application) enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		setupResponse(&w, r)

		if r.Method == "OPTIONS" {
			w.WriteHeader(204)
			return
		}

		u, p, ok := r.BasicAuth()
		if !ok {
			fmt.Println(r)
			fmt.Println("Error parsing basic auth")
			w.WriteHeader(401)
			return
		}
		if u != username {
			fmt.Printf("Username provided is correct: %s\n", u)
			w.WriteHeader(401)
			return
		}
		if p != password {
			fmt.Printf("Password provided is correct: %s\n", u)
			w.WriteHeader(401)
			return
		}
		fmt.Printf("Username: %s\n", u)
		fmt.Printf("Password: %s\n", p)
		w.WriteHeader(200)
		next.ServeHTTP(w, r)
	})
}