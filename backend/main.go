package main

import (
	baseApp "backend/baseApp"
	"backend/database"
)

func main() {

	app := baseApp.FiberApp()

	database.ConnectDB()

	// err := database.DB.AutoMigrate()
	// if err != nil {
	// 	panic("Error during migration: " + err.Error())
	// }

	app.App.Listen(":3000")
}
