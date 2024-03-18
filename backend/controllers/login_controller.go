package controllers

import (
	"backend/database"
	models "backend/models"

	"github.com/gofiber/fiber/v2"
)

type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type UserResponse struct {
	ID 		 string    `json:"ID"`
    Username string    `json:"username"`
	Name     string    `json:"name"`
	Email    string    `json:"email"`
}

func Login(ctx *fiber.Ctx) error {
	req := new(models.User)
	if err := ctx.BodyParser(req); err != nil {
		return err
	}

	user := new(models.User)
    if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
        return ctx.Status(fiber.StatusUnauthorized).JSON(LoginResponse{Success: false, Message: "Invalid username or password"})
    }
	if user.Password != req.Password {
        return ctx.Status(fiber.StatusUnauthorized).JSON(LoginResponse{Success: false, Message: "Invalid username or password"})
    }

	userResponse := UserResponse{
		ID: user.ID.String(),
        Username: user.Username,
		Name: user.Name,
		Email: user.Email,
	}
	return ctx.JSON(userResponse)
}