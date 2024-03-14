package controllers

import (
	"backend/database"
	models "backend/models"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateTest(ctx *fiber.Ctx) error {
	test := new(models.Test)
	if err := ctx.BodyParser(test); err != nil {
		return err
	}

	result := database.DB.Unscoped().Delete(&models.Test{}, "deleted_at IS NOT NULL")
	if result.Error != nil {
		return result.Error
	}

	if err := database.DB.Omit("Parameters.*").Create(&test).Error; err != nil {
		return err
	}

	for _, param := range test.Parameters {
		var fullParam models.Parameter
		if err := database.DB.First(&fullParam, param.ID).Error; err != nil {
			return err
		}

		if err := database.DB.Model(&fullParam).Association("Tests").Append(test); err != nil {
			return err
		}
	}

	if err := database.DB.Preload("Parameters").First(&test, test.ID).Error; err != nil {
		return err
	}

	return ctx.JSON(test)
}

func ListTests(ctx *fiber.Ctx) error {
	tests := []models.Test{}
	database.DB.Preload("Parameters").Find(&tests)

	return ctx.JSON(tests)
}

func GetTest(ctx *fiber.Ctx) error {

	id := ctx.Params("testID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}

	var test models.Test

	if err := database.DB.Preload("Parameters").First(&test, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Test not found"})
		}
		return err
	}

	return ctx.JSON(test)
}

func UpdateTest(ctx *fiber.Ctx) error {
	id := ctx.Params("testID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}
	test := new(models.Test)
	if err := database.DB.Preload("Parameters").First(&test, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Test not found"})
		}
		return err
	}

	updatedTest := new(models.Test)
	if err := ctx.BodyParser(updatedTest); err != nil {
		return err
	}

	test.TestName = updatedTest.TestName
	test.TestCode = updatedTest.TestCode
	test.TestMethod = updatedTest.TestMethod

	for _, oldParam := range test.Parameters {
		found := false
		for _, newParam := range updatedTest.Parameters {
			if oldParam.ID == newParam.ID {
				found = true
				break
			}
		}
		if !found {
			if err := database.DB.Model(&oldParam).Association("Tests").Delete(&test); err != nil {
				return err
			}
			if err := database.DB.Model(&test).Association("Parameters").Delete(&oldParam); err != nil {
				return err
			}
		}
	}

	for _, newParam := range updatedTest.Parameters {
		found := false
		for _, oldParam := range test.Parameters {
			if oldParam.ID == newParam.ID {
				found = true
				break
			}
		}
		if !found {
			var fullParam models.Parameter
			if err := database.DB.First(&fullParam, newParam.ID).Error; err != nil {
				return err
			}

			fullParam.Tests = append(fullParam.Tests, test)

			if err := database.DB.Save(&fullParam).Error; err != nil {
				return err
			}

			test.Parameters = append(test.Parameters, &fullParam)

			if err := database.DB.Save(&test).Error; err != nil {
				return err
			}
		}

	}

	if err := database.DB.Save(&test).Error; err != nil {
		return err
	}

	return ctx.JSON(test)
}

func DeleteTest(ctx *fiber.Ctx) error {
	id := ctx.Params("testID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}
	var test models.Test

	if err := database.DB.Preload("Parameters").First(&test, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Test not found"})
		}
		return err
	}

	database.DB.Delete(&test)
	result := database.DB.Unscoped().Delete(&models.Test{}, "deleted_at IS NOT NULL")
	if result.Error != nil {
		return result.Error
	}
	return ctx.SendString("Test deleted successfully")
}
