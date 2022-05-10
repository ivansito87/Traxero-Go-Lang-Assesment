package models

type Vehicle struct {
	Vin   string `json:"vin"`
	Make  string `json:"make"`
	Model string `json:"model"`
	Year  string `json:"year"`
}
