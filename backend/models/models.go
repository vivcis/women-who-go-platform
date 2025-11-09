package models

import (
	"time"
)

type User struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	Email      string    `gorm:"unique;not null" json:"email"`
	Name       string    `gorm:"not null" json:"name"`
	Location   string    `json:"location"`
	SkillLevel string    `json:"skill_level"` // beginner, intermediate, advanced
	Bio        string    `json:"bio"`
	GithubURL  string    `json:"github_url"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Membership struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null" json:"user_id"`
	User      User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	PlanType  string    `gorm:"not null" json:"plan_type"` // free, supporter, patron
	Amount    float64   `gorm:"default:0" json:"amount"`
	Status    string    `gorm:"default:active" json:"status"` // active, expired, cancelled
	StartDate time.Time `json:"start_date"`
	EndDate   time.Time `json:"end_date"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Transaction struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	UserID           uint      `gorm:"not null" json:"user_id"`
	User             User      `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"user,omitempty"`
	Amount           float64   `gorm:"not null" json:"amount"`
	Currency         string    `gorm:"default:USD" json:"currency"`
	PaymentMethod    string    `json:"payment_method"` // mpesa, card, paypal, bank_transfer
	PaymentReference string    `gorm:"unique;not null" json:"payment_reference"`
	Status           string    `gorm:"default:pending" json:"status"` // pending, completed, failed, refunded
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Resource struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `json:"description"`
	URL         string    `json:"url"`
	Category    string    `json:"category"`   // tutorial, video, article, book, course, guide
	Difficulty  string    `json:"difficulty"` // beginner, intermediate, advanced
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
