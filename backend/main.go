package main

import (
	baseApp "backend/baseApp"
	"backend/database"
	models "backend/models"
)

func main() {

	app := baseApp.FiberApp()

	database.ConnectDB()

	err := database.DB.AutoMigrate(&models.User{})
	if err != nil {
		panic("Error during migration: " + err.Error())
	}

	app.App.Listen(":3000")
}
