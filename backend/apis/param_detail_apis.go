package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateParamDetail(paramDetailGroup fiber.Router) {
	paramDetailGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateParamDetail(ctx)
	})
}

func GetParamDetail(paramDetailGroup fiber.Router) {
	paramDetailGroup.Get("/:paramDetailID", func(ctx *fiber.Ctx) error {
		return controllers.GetParamDetail(ctx)
	})
}

func GetParamDetails(paramDetailGroup fiber.Router) {
	paramDetailGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListParamDetails(ctx)
	})
}

func UpdateParamDetail(paramDetailGroup fiber.Router) {
	paramDetailGroup.Put("/:paramDetailID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateParamDetail(ctx)
	})
}

func DeleteParamDetail(paramDetailGroup fiber.Router) {
	paramDetailGroup.Delete("/:paramDetailID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteParamDetail(ctx)
	})
}

func GetBounds(paramDetailGroup fiber.Router) {
	paramDetailGroup.Get("/:parameterID/:testID", func(ctx *fiber.Ctx) error {
		return controllers.GetBounds(ctx)
	})
}
