package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/vivcis/women-who-go-backend/database"
	"github.com/vivcis/women-who-go-backend/models"
)

func GetMemberships(c *gin.Context) {
	var memberships []models.Membership

	// Include user data
	if err := database.DB.Preload("User").Find(&memberships).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch memberships"})
		return
	}

	c.JSON(http.StatusOK, memberships)
}

func CreateMembership(c *gin.Context) {
	var membership models.Membership

	if err := c.ShouldBindJSON(&membership); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate user exists
	var user models.User
	if err := database.DB.First(&user, membership.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Set default dates if not provided
	if membership.StartDate.IsZero() {
		membership.StartDate = time.Now()
	}
	if membership.EndDate.IsZero() {
		// Default to 1 month
		membership.EndDate = membership.StartDate.AddDate(0, 1, 0)
	}

	// Set default status
	if membership.Status == "" {
		membership.Status = "active"
	}

	if err := database.DB.Create(&membership).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create membership"})
		return
	}

	// Load user data for response
	database.DB.Preload("User").First(&membership, membership.ID)

	c.JSON(http.StatusCreated, membership)
}

func GetMembershipPlans(c *gin.Context) {
	plans := []gin.H{
		{
			"name":        "Free",
			"price":       0,
			"description": "Access to community resources and monthly meetups",
			"features": []string{
				"Community forum access",
				"Monthly virtual meetups",
				"Resource library",
			},
		},
		{
			"name":        "Supporter",
			"price":       10,
			"description": "Support the community and get exclusive content",
			"features": []string{
				"Everything in Free",
				"Exclusive workshops",
				"1-on-1 mentorship (1 session/month)",
				"Early access to events",
			},
		},
		{
			"name":        "Patron",
			"price":       25,
			"description": "Maximum support with premium benefits",
			"features": []string{
				"Everything in Supporter",
				"Unlimited mentorship sessions",
				"Job board access",
				"Conference ticket discounts",
				"Priority support",
			},
		},
	}

	c.JSON(http.StatusOK, plans)
}
