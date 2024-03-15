package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateResult(resultGroup fiber.Router) {
	resultGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateResult(ctx)
	})
}

func GetResult(resultGroup fiber.Router) {
	resultGroup.Get("/:resultID", func(ctx *fiber.Ctx) error {
		return controllers.GetResult(ctx)
	})
}

func GetResults(resultGroup fiber.Router) {
	resultGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListResults(ctx)
	})
}

func UpdateResult(resultGroup fiber.Router) {
	resultGroup.Put("/:resultID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateResult(ctx)
	})
}

func DeleteResult(resultGroup fiber.Router) {
	resultGroup.Delete("/:resultID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteResult(ctx)
	})
}
