package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateParamValue(paramValueGroup fiber.Router) {
	paramValueGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateParamValue(ctx)
	})
}

func GetParamValue(paramValueGroup fiber.Router) {
	paramValueGroup.Get("/:paramValueID", func(ctx *fiber.Ctx) error {
		return controllers.GetParamValue(ctx)
	})
}

func GetTestValue(paramValueGroup fiber.Router) {
	paramValueGroup.Get("/:parameterID/:bookingID", func(ctx *fiber.Ctx) error {
		return controllers.GetTestValue(ctx)
	})
}

func GetParamValues(paramValueGroup fiber.Router) {
	paramValueGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListParamValues(ctx)
	})
}

func UpdateParamValue(paramValueGroup fiber.Router) {
	paramValueGroup.Put("/:paramValueID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateParamValue(ctx)
	})
}

func DeleteParamValue(paramValueGroup fiber.Router) {
	paramValueGroup.Delete("/:paramValueID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteParamValue(ctx)
	})
}
