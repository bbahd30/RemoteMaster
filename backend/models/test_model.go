package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Test struct {
	gorm.Model
	ID         uuid.UUID    `gorm:"primaryKey;type:uuid"`
	TestName   string       `json:"test_name" gorm:"not null;default:null"`
	TestCode   string       `json:"test_code" gorm:"not null;default:null"`
	TestMethod string       `json:"test_method"`
	Parameters []*Parameter `json:"parameters"gorm:"many2many:test_parameter;constraint:OnUpdate:CASCADE;"`
}

func (test *Test) BeforeCreate(tx *gorm.DB) (err error) {
	if test.ID == uuid.Nil {
		test.ID = uuid.New()
	}

	return nil
}
