package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateTest(testGroup fiber.Router) {
	testGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateTest(ctx)
	})
}

func GetTest(testGroup fiber.Router) {
	testGroup.Get("/:testID", func(ctx *fiber.Ctx) error {
		return controllers.GetTest(ctx)
	})
}

func GetTests(testGroup fiber.Router) {
	testGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListTests(ctx)
	})
}

func UpdateTest(testGroup fiber.Router) {
	testGroup.Put("/:testID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateTest(ctx)
	})
}

func DeleteTest(testGroup fiber.Router) {
	testGroup.Delete("/:testID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteTest(ctx)
	})
}
