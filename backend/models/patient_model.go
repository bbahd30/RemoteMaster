package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Patient struct {
	gorm.Model
	ID           uuid.UUID `gorm:"primaryKey;type:uuid"`
	Name         string    `json:"name" gorm:"not null;default:null"`
	DateOfBirth  time.Time `json:"dob"`
	Gender       string    `json:"gender"`
	ContactPhone string    `json:"phone"`
	Email        string    `json:"email"`
	Address      string    `json:"address"`
}

func (patient *Patient) BeforeCreate(tx *gorm.DB) (err error) {
	if patient.ID == uuid.Nil {
		patient.ID = uuid.New()
	}

	return nil
}
