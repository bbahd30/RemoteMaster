package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Parameter struct {
	gorm.Model
	ID            uuid.UUID `gorm:"primaryKey;type:uuid"`
	ParameterName string    `json:"param_name" gorm:"not null;default:null"`
	Tests         []*Test   `json:"tests" gorm:"many2many: tests;"`
}

func (parameter *Parameter) BeforeCreate(tx *gorm.DB) (err error) {
	if parameter.ID == uuid.Nil {
		parameter.ID = uuid.New()

	}

	return nil
}
