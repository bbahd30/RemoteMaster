package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	ID             uuid.UUID `gorm:"primaryKey;type:uuid"`
	PatientID      uuid.UUID `json:"patientID" gorm:"type:uuid;not null;default:null"`
	Patient        Patient   `gorm:"foreignKey:PatientID;not null;default:null"`
	TestID         uuid.UUID `json:"testID" gorm:"type:uuid;not null;default:null"`
	Test           Test      `gorm:"foreignKey:TestID;not null;default:null"`
	CollectionDate time.Time `json:"c_date"`
	BookingDate    time.Time `json:"b_date"`
	LeadID         uuid.UUID `json:"leadID"`
	Lead           User      `gorm:"foreignKey:LeadID"`
	ResultID       uuid.UUID `json:"resultID"`
	Result         Result    `gorm:"foreignKey:ResultID;constraint:OnDelete:CASCADE"`
}

func (booking *Booking) BeforeCreate(tx *gorm.DB) (err error) {
	if booking.ID == uuid.Nil {
		booking.ID = uuid.New()
	}
	booking.BookingDate = time.Now()

	return nil
}
