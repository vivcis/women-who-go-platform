package handlers

import (
	"github.com/vivcis/women-who-go-backend/database"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/vivcis/women-who-go-backend/models"
)

func GetStats(c *gin.Context) {
	var stats struct {
		TotalMembers      int64   `json:"total_members"`
		ActiveMemberships int64   `json:"active_memberships"`
		TotalResources    int64   `json:"total_resources"`
		TotalDonations    float64 `json:"total_donations"`
	}

	// Count users
	database.DB.Model(&models.User{}).Count(&stats.TotalMembers)

	// Count active memberships
	database.DB.Model(&models.Membership{}).
		Where("status = ?", "active").
		Count(&stats.ActiveMemberships)

	// Count resources
	database.DB.Model(&models.Resource{}).Count(&stats.TotalResources)

	// Sum completed donations
	var sum struct{ Total float64 }
	database.DB.Model(&models.Transaction{}).
		Where("status = ?", "completed").
		Select("COALESCE(SUM(amount), 0) as total").
		Scan(&sum)
	stats.TotalDonations = sum.Total

	c.JSON(http.StatusOK, stats)
}
