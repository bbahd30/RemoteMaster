package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(userGroup fiber.Router) {
	userGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateUser(ctx)
	})
}

func GetUser(userGroup fiber.Router) {
	userGroup.Get("/:userId", func(ctx *fiber.Ctx) error {
		return controllers.GetUser(ctx)
	})
}

func GetUsers(userGroup fiber.Router) {
	userGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListUsers(ctx)
	})
}

func UpdateUser(userGroup fiber.Router) {
	userGroup.Put("/:userId", func(ctx *fiber.Ctx) error {
		return controllers.UpdateUser(ctx)
	})
}

func DeleteUser(userGroup fiber.Router) {
	userGroup.Delete("/:userId", func(ctx *fiber.Ctx) error {
		return controllers.DeleteUser(ctx)
	})
}
