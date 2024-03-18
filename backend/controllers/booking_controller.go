package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CreateBooking(ctx *fiber.Ctx) error {
	delReq := database.DB.Unscoped().Delete(&models.Booking{}, "deleted_at IS NOT NULL")
	if delReq.Error != nil {
		return delReq.Error
	}

	req := new(models.Booking)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	booking := models.Booking{
		LeadID:    req.LeadID,
		TestID:    req.TestID,
		PatientID: req.PatientID,
	}

	booking.ID = uuid.New()

	result := &models.Result{
		ID:        uuid.New(),
		BookingID: booking.ID,
	}
	if err := database.DB.Create(result).Error; err != nil {
		return err
	}

	booking.ResultID = result.ID

	if err := database.DB.Create(&booking).Error; err != nil {
		return err
	}

	database.DB.Preload("Result").Preload("Lead").Preload("Test").Preload("Patient").First(&booking, booking.ID)
	if err := database.DB.Save(&booking).Error; err != nil {
		return err
	}

	return ctx.JSON(booking)
}

func ListBookings(ctx *fiber.Ctx) error {
	bookings := []models.Booking{}
	database.DB.Preload("Patient").Preload("Lead").Preload("Test", func(db *gorm.DB) *gorm.DB {
        return db.Preload("Parameters")
    }).Preload("Result").Find(&bookings)

	return ctx.JSON(bookings)
}

func GetBooking(ctx *fiber.Ctx) error {

	id := ctx.Params("bookingID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	booking := new(models.Booking)

	if err := database.DB.Preload("Patient").Preload("Lead").Preload("Test").Preload("Result").First(&booking, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Booking not found"})
		}
		return err
	}

	return ctx.JSON(booking)
}

func UpdateBooking(ctx *fiber.Ctx) error {
	id := ctx.Params("bookingID")
	uuidFromString, err := uuid.Parse(id)
	if err != nil {
		return ctx.SendString("")
	}

	req := new(models.Booking)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	if err := database.DB.Model(&models.Booking{}).Where("id = ?", uuidFromString).Updates(req).Error; err != nil {
		return err
	}

	booking := new(models.Booking)
	if err := database.DB.Preload("Patient").Preload("Lead").Preload("Test").Preload("Result").First(&booking, uuidFromString).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Booking not found"})
		}
		return err
	}

	return ctx.JSON(booking)
}

func DeleteBooking(ctx *fiber.Ctx) error {
	bookingID := ctx.Params("bookingID")
	uuidFromString, err := uuid.Parse(bookingID)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid booking ID format"})
	}

	if err := database.DB.Where("booking_id = ?", uuidFromString).Delete(&models.Result{}).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete associated results"})
	}

	if err := database.DB.Delete(&models.Booking{}, uuidFromString).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete booking"})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Booking deleted successfully"})
}
