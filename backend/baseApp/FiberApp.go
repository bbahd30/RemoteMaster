package base

import (
	"backend/apis"

	"github.com/gofiber/fiber/v2"
)

type BaseFiberApp struct {
	App *fiber.App
}

func FiberApp() *BaseFiberApp {

	app := &BaseFiberApp{
		App: fiber.New(),
	}

	app.registerUserApis()
	app.registerPatientApis()

	return app
}

func (fiberApp *BaseFiberApp) registerUserApis() {
	userRouter := fiberApp.App.Group("/user")

	apis.CreateUser(userRouter)
	apis.GetUser(userRouter)
	apis.GetUsers(userRouter)
	apis.UpdateUser(userRouter)
	apis.DeleteUser(userRouter)
}

func (fiberApp *BaseFiberApp) registerPatientApis() {
	patientRouter := fiberApp.App.Group("/patient")

	apis.CreatePatient(patientRouter)
	apis.GetPatient(patientRouter)
	apis.GetPatients(patientRouter)
	apis.UpdatePatient(patientRouter)
	apis.DeletePatient(patientRouter)
}
