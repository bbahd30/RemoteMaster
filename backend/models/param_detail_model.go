package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// as the param has different bound values for diff tests => general details of parameter
type ParamDetail struct {
	gorm.Model
	ID          uuid.UUID `gorm:"type:uuid"`
	ParameterID uuid.UUID `json:"paramID" gorm:"primaryKey;type:uuid"`
	TestID      uuid.UUID `json:"testID" gorm:"primaryKey;type:uuid"`
	LowerBound  float64   `json:"lower_bound" gorm:"type:decimal(10,2);default:0.0"`
	UpperBound  float64   `json:"upper_bound" gorm:"type:decimal(10,2);default:0.0"` // need to fix unable to update as 0.0
	TestName    string    `json:"test_name"`
	Unit	    string 	  `json:"unit" gorm:"default:''"`
}

func (paramDetail *ParamDetail) BeforeCreate(tx *gorm.DB) (err error) {
	if paramDetail.ID == uuid.Nil {
		paramDetail.ID = uuid.New()
	}

	return nil
}
