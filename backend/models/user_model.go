package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"primaryKey;type:uuid"`
	Username string    `json:"username" gorm:"not null;unique;default:null`
	Password string    `json:"password" gorm:"not null;default:null"`
	Name     string    `json:"name"`
	// Email        string    `json:"email"`
}

func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}

	return nil
}
