package database

import (
	"github.com/vivcis/women-who-go-backend/models"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL environment variable not set")
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully!")

	// Auto-migrate all models
	err = DB.AutoMigrate(
		&models.User{},
		&models.Membership{},
		&models.Transaction{},
		&models.Resource{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	log.Println("Database migration completed!")

	// Seed initial data (optional)
	seedData()
}

func seedData() {
	// Check if data already exists
	var count int64
	DB.Model(&models.Resource{}).Count(&count)

	if count > 0 {
		log.Println("Database already seeded, skipping...")
		return
	}

	log.Println("Seeding initial data...")

	// Seed some resources
	resources := []models.Resource{
		{
			Title:       "A Tour of Go",
			Description: "Official interactive introduction to Go programming language",
			URL:         "https://go.dev/tour/",
			Category:    "tutorial",
			Difficulty:  "beginner",
		},
		{
			Title:       "Effective Go",
			Description: "Document that gives tips for writing clear, idiomatic Go code",
			URL:         "https://go.dev/doc/effective_go",
			Category:    "article",
			Difficulty:  "intermediate",
		},
		{
			Title:       "Go by Example",
			Description: "Hands-on introduction to Go using annotated example programs",
			URL:         "https://gobyexample.com/",
			Category:    "tutorial",
			Difficulty:  "beginner",
		},
		{
			Title:       "Concurrency in Go",
			Description: "Deep dive into goroutines, channels, and concurrency patterns",
			URL:         "https://www.oreilly.com/library/view/concurrency-in-go/9781491941294/",
			Category:    "book",
			Difficulty:  "advanced",
		},
		{
			Title:       "Women Who Go - Getting Started",
			Description: "Beginner-friendly guide for women entering the Go community",
			URL:         "https://www.womenwhogo.org/getting-started",
			Category:    "guide",
			Difficulty:  "beginner",
		},
	}

	for _, resource := range resources {
		DB.Create(&resource)
	}

	// Seed a demo user
	demoUser := models.User{
		Email:      "demo@womenwho.go",
		Name:       "Demo User",
		Location:   "Lagos, Nigeria",
		SkillLevel: "intermediate",
		Bio:        "Passionate about Go and empowering women in tech",
		GithubURL:  "https://github.com/demouser",
	}
	DB.Create(&demoUser)

	log.Println("Initial data seeded successfully!")
}
