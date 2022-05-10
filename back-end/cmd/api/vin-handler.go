package main

import (
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"Traxero-Go-Lang-Assesment/back-end/models"
)

func (app *application) getVehicleInfo(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	app.logger.Println(params.ByName("vin"))


	resp, err := http.Get("https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/" + params.ByName("vin") + "?format=json")
	if err != nil {
		app.logger.Fatalln(err)
		return
	}

	//body, err := ioutil.ReadAll(resp.Body)
	//if err != nil {
	//	app.logger.Fatalln(err)
	//	return
	//}

	result := map[string]interface{}{}
	json.NewDecoder(resp.Body).Decode(&result)

	vehicle := models.Vehicle{
		Vin: params.ByName("vin"),
		Make: result["Results"].([]interface{})[0].(map[string]interface{})["Make"].(string),
		Model: result["Results"].([]interface{})[0].(map[string]interface{})["Model"].(string),
		Year: result["Results"].([]interface{})[0].(map[string]interface{})["ModelYear"].(string),
	}

	app.writeJSON(w, http.StatusOK, vehicle, "vehicle" )
}
