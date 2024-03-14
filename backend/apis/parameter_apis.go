package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateParameter(parameterGroup fiber.Router) {
	parameterGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateParameter(ctx)
	})
}

func GetParameter(parameterGroup fiber.Router) {
	parameterGroup.Get("/:parameterID", func(ctx *fiber.Ctx) error {
		return controllers.GetParameter(ctx)
	})
}

func GetParameters(parameterGroup fiber.Router) {
	parameterGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListParameters(ctx)
	})
}

func UpdateParameter(parameterGroup fiber.Router) {
	parameterGroup.Put("/:parameterID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateParameter(ctx)
	})
}

func DeleteParameter(parameterGroup fiber.Router) {
	parameterGroup.Delete("/:parameterID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteParameter(ctx)
	})
}
