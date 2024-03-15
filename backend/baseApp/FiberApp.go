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
	app.registerTestApis()
	app.registerParameterApis()
	app.registerBookingApis()
	app.registerResultApis()
	app.registerParamValueApis()

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

func (fiberApp *BaseFiberApp) registerTestApis() {
	testRouter := fiberApp.App.Group("/test")

	apis.CreateTest(testRouter)
	apis.GetTest(testRouter)
	apis.GetTests(testRouter)
	apis.UpdateTest(testRouter)
	apis.DeleteTest(testRouter)
}

func (fiberApp *BaseFiberApp) registerParameterApis() {
	parameterRouter := fiberApp.App.Group("/parameter")

	apis.CreateParameter(parameterRouter)
	apis.GetParameter(parameterRouter)
	apis.GetParameters(parameterRouter)
	apis.UpdateParameter(parameterRouter)
	apis.DeleteParameter(parameterRouter)
}

func (fiberApp *BaseFiberApp) registerBookingApis() {
	bookingRouter := fiberApp.App.Group("/booking")

	apis.CreateBooking(bookingRouter)
	apis.GetBooking(bookingRouter)
	apis.GetBookings(bookingRouter)
	apis.UpdateBooking(bookingRouter)
	apis.DeleteBooking(bookingRouter)
}

func (fiberApp *BaseFiberApp) registerResultApis() {
	resultRouter := fiberApp.App.Group("/result")

	apis.CreateResult(resultRouter)
	apis.GetResult(resultRouter)
	apis.GetResults(resultRouter)
	apis.UpdateResult(resultRouter)
	apis.DeleteResult(resultRouter)
}

func (fiberApp *BaseFiberApp) registerParamValueApis() {
	paramValueRouter := fiberApp.App.Group("/param_value")

	apis.CreateParamValue(paramValueRouter)
	apis.GetParamValue(paramValueRouter)
	apis.GetParamValues(paramValueRouter)
	apis.UpdateParamValue(paramValueRouter)
	apis.DeleteParamValue(paramValueRouter)
}
