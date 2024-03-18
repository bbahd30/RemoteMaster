package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Patient struct {
	gorm.Model
	ID           uuid.UUID `gorm:"primaryKey;type:uuid"`
	Name         string    `json:"name" gorm:"not null;default:null"`
	DateOfBirth  string    `json:"dob"`
	Gender       string    `json:"gender"`
	ContactPhone string    `json:"contact_phone"`
	Email        string    `json:"email"`
	Address      string    `json:"address"`
	Age 		 int       `json:"age"`
}

func (patient *Patient) BeforeCreate(tx *gorm.DB) (err error) {
	if patient.ID == uuid.Nil {
		patient.ID = uuid.New()
	}

	return nil
}
