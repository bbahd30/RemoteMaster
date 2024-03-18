package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// result for a test will have all the parameter values in it which were needed in the test

type Result struct {
	gorm.Model
	ID               uuid.UUID `gorm:"primaryKey;type:uuid"`
	BookingID        uuid.UUID
	ParameterResults []ParamValue `json:"parameter_results" gorm:"foreignKey:ResultID;references:ID"`
}

func (result *Result) BeforeCreate(tx *gorm.DB) (err error) {
	if(result.ID == uuid.Nil){
		result.ID = uuid.New()
	}
	return nil
}
