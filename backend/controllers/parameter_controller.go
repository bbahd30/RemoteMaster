package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateParameter(ctx *fiber.Ctx) error {

	parameter := new(models.Parameter)
	if err := ctx.BodyParser(parameter); err != nil {
		return err
	}

	result := database.DB.Unscoped().Delete(&models.Parameter{}, "deleted_at IS NOT NULL")
	if result.Error != nil {
		return result.Error
	}

	if err := database.DB.Create(&parameter).Error; err != nil {
		return err
	}

	return ctx.JSON(parameter)
}

func ListParameters(ctx *fiber.Ctx) error {
	parameters := []models.Parameter{}
	database.DB.Preload("Tests").Find(&parameters)

	return ctx.JSON(parameters)
}

func GetParameter(ctx *fiber.Ctx) error {

	id := ctx.Params("parameterID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	var parameter models.Parameter

	if err := database.DB.Preload("Tests").First(&parameter, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Parameter not found"})
		}
		return err
	}

	return ctx.JSON(parameter)
}

func UpdateParameter(ctx *fiber.Ctx) error {
	id := ctx.Params("parameterID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}
	var parameter models.Parameter

	if err := database.DB.Preload("Tests").First(&parameter, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Parameter not found"})
		}
		return err
	}

	updatedParam := new(models.Parameter)
	if err := ctx.BodyParser(updatedParam); err != nil {
		return err
	}

	parameter.ParameterName = updatedParam.ParameterName
	parameter.Tests = updatedParam.Tests

	for _, oldTest := range parameter.Tests {
		found := false
		for _, newTest := range updatedParam.Tests {
			if oldTest.ID == newTest.ID {
				found = true
				break
			}
		}
		if !found {
			if err := database.DB.Model(&oldTest).Association("Parameters").Delete(&parameter); err != nil {
				return err
			}
			if err := database.DB.Model(&parameter).Association("Tests").Delete(&oldTest); err != nil {
				return err
			}
		}
	}

	database.DB.Save(&parameter)

	return ctx.SendString("Parameter updated successfully")
}

func DeleteParameter(ctx *fiber.Ctx) error {
	id := ctx.Params("parameterID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}
	var parameter models.Parameter

	if err := database.DB.Preload("Tests").First(&parameter, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Parameter not found"})
		}
		return err
	}

	for _, test := range parameter.Tests {
		if err := database.DB.Model(&test).Association("Parameters").Delete(&parameter); err != nil {
			return err
		}
	}

	if err := database.DB.Model(&parameter).Association("Tests").Clear(); err != nil {
		return err
	}
	if err := database.DB.Delete(&parameter).Error; err != nil {
		return err
	}

	result := database.DB.Unscoped().Delete(&models.Parameter{}, "deleted_at IS NOT NULL")
	if result.Error != nil {
		return result.Error
	}

	return ctx.SendString("Parameter deleted successfully")
}
