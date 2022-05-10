package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)


func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/vehicles/:vin", app.getVehicleInfo)

	return app.enableCORS(router)
}