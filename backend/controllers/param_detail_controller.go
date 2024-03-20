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

func GetBounds(ctx *fiber.Ctx) error {
	parameterID := ctx.Params("parameterID")
	testID := ctx.Params("testID")

	
	parameterUUID, err := uuid.Parse(parameterID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid parameter ID"})
	}
	
	parameter := new(models.Parameter)
	if err := database.DB.First(&parameter, parameterUUID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamDetail not found"})
		}
		return err
	}

	testUUID, err := uuid.Parse(testID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid test ID"})
	}

	paramDetail := new(models.ParamDetail)

	if err := database.DB.Where("parameter_id = ? AND test_id = ?", parameterUUID, testUUID).First(paramDetail).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.JSON(nil)
			// return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamDetail not found"})
		}
		return err
	}
	
	type Bounds struct {
        LowerBound float64 `json:"lower_bound"`
        UpperBound float64 `json:"upper_bound"`
		ParameterName string `json:"param_name"`
		Unit string `json:"unit"`
    }

    bounds := Bounds{
        LowerBound: paramDetail.LowerBound,
        UpperBound: paramDetail.UpperBound,
		ParameterName: parameter.ParameterName,
		Unit: paramDetail.Unit,
    }

    return ctx.JSON(bounds)
}


func GetStatusData(ctx *fiber.Ctx) error {
	type RequestData struct {
		ParamID uuid.UUID `json:"paramID"`
		TestID  uuid.UUID `json:"testID"`
		Status  int       `json:"status"`
	}

	var requestData []RequestData
	if err := ctx.BodyParser(&requestData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Cannot parse request data"})
	}

	type BoundsText struct {
		LowerText  string `json:"lower_text"`
		UpperText  string `json:"upper_text"`
		NormalText string `json:"normal_text"`
		LowerReasons string `json:"lower_reasons"`
		UpperReasons string `json:"upper_reasons"`
	}

	responseData := make([]BoundsText, len(requestData))

	for i, data := range requestData {
		var paramDetail models.ParamDetail
		if err := database.DB.Where("parameter_id = ? AND test_id = ?", data.ParamID, data.TestID).First(&paramDetail).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "ParamDetail not found for parameter " + data.ParamID.String()})
			}
			return err
		}

		switch data.Status {
		case -1:
			responseData[i] = BoundsText{
				LowerText:    paramDetail.LowerText,
				LowerReasons: paramDetail.LowerReasons,
			}
		case 0:
			responseData[i] = BoundsText{NormalText: "Good Job!, You are in normal range"}
		case 1:
			responseData[i] = BoundsText{
				UpperText:    paramDetail.UpperText,
				UpperReasons: paramDetail.UpperReasons,
			}
		}
	}

	return ctx.JSON(responseData)
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
