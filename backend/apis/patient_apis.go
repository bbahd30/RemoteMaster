package apis

import (
	"backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func CreatePatient(patientGroup fiber.Router) {
	patientGroup.Post("/", func(ctx *fiber.Ctx) error {
		return controllers.CreatePatient(ctx)
	})
}

func GetPatient(patientGroup fiber.Router) {
	patientGroup.Get("/:patientId", func(ctx *fiber.Ctx) error {
		return controllers.GetPatient(ctx)
	})
}

func GetPatients(patientGroup fiber.Router) {
	patientGroup.Get("/", func(ctx *fiber.Ctx) error {
		return controllers.ListPatients(ctx)
	})
}

func UpdatePatient(patientGroup fiber.Router) {
	patientGroup.Put("/:patientId", func(ctx *fiber.Ctx) error {
		return controllers.UpdatePatient(ctx)
	})
}

func DeletePatient(patientGroup fiber.Router) {
	patientGroup.Delete("/:patientId", func(ctx *fiber.Ctx) error {
		return controllers.DeletePatient(ctx)
	})
}
