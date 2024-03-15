package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func Login(userGroup fiber.Router) {
	userGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.Login(ctx)
	})
}
