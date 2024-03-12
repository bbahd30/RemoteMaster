package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Patient struct {
	gorm.Model
	ID           uuid.UUID `gorm:"type:uuid"`
	Name         string    `json:"name"`
	DateOfBirth  time.Time `json:"dob"`
	Gender       string    `json:"gender"`
	ContactPhone string    `json:"phone"`
	Email        string    `json:"email"`
	Address      string    `json:"address"`
}

func (patient *Patient) BeforeCreate(tx *gorm.DB) (err error) {
	patient.ID = uuid.New()

	return nil
}
