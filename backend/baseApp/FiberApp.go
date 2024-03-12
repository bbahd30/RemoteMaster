package base

import (
	"github.com/gofiber/fiber/v2"
)

type BaseFiberApp struct {
	App *fiber.App
}

func FiberApp() *BaseFiberApp {

	app := &BaseFiberApp{
		App: fiber.New(),
	}
	return app
}
