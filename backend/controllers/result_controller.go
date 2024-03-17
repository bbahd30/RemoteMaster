package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateResult(ctx *fiber.Ctx) error {
	req := database.DB.Unscoped().Delete(&models.Result{}, "deleted_at IS NOT NULL")
	if req.Error != nil {
		return req.Error
	}

	result := new(models.Result)
	if err := ctx.BodyParser(result); err != nil {
		return err
	}

	if err := database.DB.Create(&result).Error; err != nil {
		return err
	}

	return ctx.JSON(result)
}

func ListResults(ctx *fiber.Ctx) error {
	results := []models.Result{}
	database.DB.Find(&results)

	return ctx.JSON(results)
}

func GetResult(ctx *fiber.Ctx) error {

	id := ctx.Params("resultID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	var result models.Result

	if err := database.DB.Preload("ParameterResults").First(&result, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Result not found"})
		}
		return err
	}

	return ctx.JSON(result)
}

func UpdateResult(ctx *fiber.Ctx) error {
	id := ctx.Params("resultID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	req := new(models.Result)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	if err := database.DB.Model(&models.Result{}).Where("id = ?", uuidFromString).Updates(req).Error; err != nil {
		return err
	}

	result := new(models.Result)
	if err := database.DB.Preload("ParameterResults").First(&result, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Result not found"})
		}
		return err
	}

	return ctx.SendString("Result updated successfully")
}

func DeleteResult(ctx *fiber.Ctx) error {
	resultID := ctx.Params("resultID")
	uuidFromString, err := uuid.Parse(resultID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid result ID format"})
	}

	if err := database.DB.Where("result_id = ?", uuidFromString).Delete(&models.Result{}).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete associated results"})
	}

	if err := database.DB.Delete(&models.Booking{}, uuidFromString).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete result"})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Result deleted successfully"})
}
