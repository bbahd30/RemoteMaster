package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreateBooking(bookingGroup fiber.Router) {
	bookingGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreateBooking(ctx)
	})
}

func GetBooking(bookingGroup fiber.Router) {
	bookingGroup.Get("/:bookingID", func(ctx *fiber.Ctx) error {
		return controllers.GetBooking(ctx)
	})
}

func GetBookings(bookingGroup fiber.Router) {
	bookingGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListBookings(ctx)
	})
}

func UpdateBooking(bookingGroup fiber.Router) {
	bookingGroup.Put("/:bookingID", func(ctx *fiber.Ctx) error {
		return controllers.UpdateBooking(ctx)
	})
}

func DeleteBooking(bookingGroup fiber.Router) {
	bookingGroup.Delete("/:bookingID", func(ctx *fiber.Ctx) error {
		return controllers.DeleteBooking(ctx)
	})
}
