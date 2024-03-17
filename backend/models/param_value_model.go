package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// model to tell what is the value of param in the patient booking has already has patient id,
// as test and parameter bound different need bothID
type ParamValue struct {
	gorm.Model
	ID          uuid.UUID `gorm:"primaryKey;type:uuid"`
	ResultID    uuid.UUID `json:"resultID" gorm:"type:uuid;index;"`
	Value       float64   `json:"value" gorm:"type:decimal(10,2)"`
	TestID      uuid.UUID `json:"testID" gorm:"type:uuid"`
	ParameterID uuid.UUID `json:"parameterID" gorm:"type:uuid"`
}

func (paramValue *ParamValue) BeforeCreate(tx *gorm.DB) (err error) {
	if paramValue.ID == uuid.Nil {
		paramValue.ID = uuid.New()
	}
	return nil
}
