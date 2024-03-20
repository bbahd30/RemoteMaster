package controllers

import (
	"backend/database"
	models "backend/models"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreatePatient(ctx *fiber.Ctx) error {
	type CreatePatientRequest struct {
		Name         string    `json:"name"`
		DateOfBirth  string    `json:"dob"`
		Gender       string    `json:"gender"`
		ContactPhone string    `json:"contact_phone"`
		Email        string    `json:"email"`
		Address      string    `json:"address"`
		Age 		int       `json:"age"`
	}

	req := new(CreatePatientRequest)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	result := database.DB.Unscoped().Delete(&models.Patient{}, "deleted_at IS NOT NULL")
	if result.Error != nil {
		return result.Error
	}

	patient := &models.Patient{
		Name:         req.Name,
		DateOfBirth:  req.DateOfBirth,
		Gender:       req.Gender,
		ContactPhone: req.ContactPhone,
		Email:        req.Email,
		Address:      req.Address,
		Age: 		  req.Age,
	}

	if err := database.DB.Create(&patient).Error; err != nil {
		return err
	}

	return ctx.JSON(patient)
}

func ListPatients(ctx *fiber.Ctx) error {
	patients := []models.Patient{}
	database.DB.Find(&patients)

	return ctx.JSON(patients)
}

func GetPatient(ctx *fiber.Ctx) error {

	id := ctx.Params("patientId")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}

	var patient models.Patient

	if err := database.DB.First(&patient, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Patient not found"})
		}
		return err
	}

	return ctx.JSON(patient)
}

func UpdatePatient(ctx *fiber.Ctx) error {
	type PutPatientRequest struct {
		Name         string    `json:"name"`
		DateOfBirth  string `json:"dob"`
		Gender       string    `json:"gender"`
		ContactPhone string    `json:"contact_phone"`
		Email        string    `json:"email"`
		Address      string    `json:"address"`
		Age 		int       `json:"age"`
	}

	id := ctx.Params("patientId")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}
	var patient models.Patient

	if err := database.DB.First(&patient, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Patient not found"})
		}
		return err
	}

	req := new(PutPatientRequest)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	patient.Name = req.Name
	patient.DateOfBirth = req.DateOfBirth
	patient.Gender = req.Gender
	patient.ContactPhone = req.ContactPhone
	patient.Email = req.Email
	patient.Address = req.Address
	patient.Age = req.Age

	database.DB.Save(&patient)
	return ctx.SendString("Patient updated successfully")
}

func DeletePatient(ctx *fiber.Ctx) error {
	id := ctx.Params("patientId")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		fmt.Println("Error parsing UUID:", err)
		return ctx.SendString("")
	}
	var patient models.Patient

	if err := database.DB.First(&patient, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Patient not found"})
		}
		return err
	}

	database.DB.Delete(&patient)
	return ctx.SendString("Patient deleted successfully")
}
