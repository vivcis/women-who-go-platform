package handlers

import (
	"github.com/vivcis/women-who-go-backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vivcis/women-who-go-backend/models"
)

func GetResources(c *gin.Context) {
	var resources []models.Resource

	// Optional filters
	category := c.Query("category")
	difficulty := c.Query("difficulty")

	query := database.DB

	if category != "" {
		query = query.Where("category = ?", category)
	}
	if difficulty != "" {
		query = query.Where("difficulty = ?", difficulty)
	}

	if err := query.Order("created_at DESC").Find(&resources).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch resources"})
		return
	}

	c.JSON(http.StatusOK, resources)
}

func CreateResource(c *gin.Context) {
	var resource models.Resource

	if err := c.ShouldBindJSON(&resource); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if resource.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	if err := database.DB.Create(&resource).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create resource"})
		return
	}

	c.JSON(http.StatusCreated, resource)
}

func GetResourceCategories(c *gin.Context) {
	categories := []string{"tutorial", "video", "article", "book", "course", "guide"}
	c.JSON(http.StatusOK, categories)
}
