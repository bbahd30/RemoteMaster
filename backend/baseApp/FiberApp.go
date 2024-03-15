package base

import (
	"backend/apis"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type BaseFiberApp struct {
	App *fiber.App
}

func FiberApp() *BaseFiberApp {

	app := &BaseFiberApp{
		App: fiber.New(),
	}

	app.App.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins:     strings.Join([]string{"http://localhost:3000"}, ","),
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.registerLoginApis()
	app.registerUserApis()
	app.registerPatientApis()
	app.registerTestApis()
	app.registerParameterApis()
	app.registerBookingApis()
	app.registerResultApis()
	app.registerParamValueApis()
	app.registerParamDetailApis()

	return app
}

func (fiberApp *BaseFiberApp) registerLoginApis() {
	loginRouter := fiberApp.App.Group("/login")

	apis.Login(loginRouter)
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

func (fiberApp *BaseFiberApp) registerParamDetailApis() {
	paramDetailRouter := fiberApp.App.Group("/param_detail")

	apis.CreateParamDetail(paramDetailRouter)
	apis.GetParamDetail(paramDetailRouter)
	apis.GetParamDetails(paramDetailRouter)
	apis.UpdateParamDetail(paramDetailRouter)
	apis.DeleteParamDetail(paramDetailRouter)
}
