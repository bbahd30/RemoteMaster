package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateParamDetail(ctx *fiber.Ctx) error {

	paramDetail := new(models.ParamDetail)
	if err := ctx.BodyParser(paramDetail); err != nil {
		return err
	}

	req := database.DB.Unscoped().Delete(&models.ParamDetail{}, "deleted_at IS NOT NULL")
	if req.Error != nil {
		return req.Error
	}

	if err := database.DB.Create(&paramDetail).Error; err != nil {
		return err
	}

	return ctx.JSON(paramDetail)
}

func ListParamDetails(ctx *fiber.Ctx) error {
	paramDetails := []models.ParamDetail{}
	database.DB.Find(&paramDetails)

	return ctx.JSON(paramDetails)
}

func GetParamDetail(ctx *fiber.Ctx) error {

	id := ctx.Params("paramDetailID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	paramDetail := new(models.ParamDetail)

	if err := database.DB.First(&paramDetail, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamDetail not found"})
		}
		return err
	}

	return ctx.JSON(paramDetail)
}

func UpdateParamDetail(ctx *fiber.Ctx) error {
	id := ctx.Params("paramDetailID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	req := new(models.ParamDetail)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	if err := database.DB.Model(&models.ParamDetail{}).Where("id = ?", uuidFromString).Updates(req).Error; err != nil {
		return err
	}

	paramDetail := new(models.ParamDetail)
	if err := database.DB.First(&paramDetail, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamDetail not found"})
		}
		return err
	}

	return ctx.SendString("ParamDetail updated successfully")
}

func DeleteParamDetail(ctx *fiber.Ctx) error {
	id := ctx.Params("paramDetailID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}
	req := database.DB.Unscoped().Delete(&models.ParamDetail{}, "deleted_at IS NOT NULL")
	if req.Error != nil {
		return req.Error
	}

	if err := database.DB.Where("param_detail_id = ?", uuidFromString).Delete(&models.ParamDetail{}).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete associated results"})
	}

	if err := database.DB.Delete(&models.ParamDetail{}, uuidFromString).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete result"})
	}

	return ctx.SendString("ParamDetail deleted successfully")
}
