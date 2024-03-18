package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateParamValue(ctx *fiber.Ctx) error {

	paramValue := new(models.ParamValue)
	if err := ctx.BodyParser(paramValue); err != nil {
		return err
	}

	req := database.DB.Unscoped().Delete(&models.ParamValue{}, "deleted_at IS NOT NULL")
	if req.Error != nil {
		return req.Error
	}

	if err := database.DB.Create(&paramValue).Error; err != nil {
		return err
	}

	result := new(models.Result)
    if err := database.DB.Where("id = ?", paramValue.ResultID).First(result).Error; err != nil {
        return err
    }
	result.ParameterResults = append(result.ParameterResults, *paramValue)
	if err := database.DB.Save(result).Error; err != nil {
        return err
    }
	return ctx.JSON(paramValue)
}

func ListParamValues(ctx *fiber.Ctx) error {
	paramValues := []models.ParamValue{}
	database.DB.Find(&paramValues)

	return ctx.JSON(paramValues)
}

func GetParamValue(ctx *fiber.Ctx) error {

	id := ctx.Params("paramValueID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	paramValue := new(models.ParamValue)

	if err := database.DB.First(&paramValue, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamValue not found"})
		}
		return err
	}

	return ctx.JSON(paramValue)
}

func GetTestValue(ctx *fiber.Ctx) error {
	parameterID := ctx.Params("parameterID")
	testID := ctx.Params("testID")

	parameterUUID, err := uuid.Parse(parameterID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid parameter ID"})
	}

	testUUID, err := uuid.Parse(testID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid test ID"})
	}

	ParamValue := new(models.ParamValue)

	if err := database.DB.Where("parameter_id = ? AND test_id = ?", parameterUUID, testUUID).First(ParamValue).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamValue not found"})
		}
		return err
	}

    return ctx.JSON(ParamValue.Value)
}


func UpdateParamValue(ctx *fiber.Ctx) error {
	id := ctx.Params("paramValueID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	req := new(models.ParamValue)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	if err := database.DB.Model(&models.ParamValue{}).Where("id = ?", uuidFromString).Updates(req).Error; err != nil {
		return err
	}

	paramValue := new(models.ParamValue)
	if err := database.DB.First(&paramValue, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamValue not found"})
		}
		return err
	}

	return ctx.SendString("ParamValue updated successfully")
}

func DeleteParamValue(ctx *fiber.Ctx) error {
	id := ctx.Params("paramValueID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}
	req := database.DB.Unscoped().Delete(&models.ParamValue{}, "deleted_at IS NOT NULL")
	if req.Error != nil {
		return req.Error
	}

	if err := database.DB.Where("param_value_id = ?", uuidFromString).Delete(&models.ParamValue{}).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete associated results"})
	}

	if err := database.DB.Delete(&models.ParamValue{}, uuidFromString).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete result"})
	}

	return ctx.SendString("ParamValue deleted successfully")
}
