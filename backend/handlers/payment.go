package handlers

import (
	"fmt"
	"github.com/vivcis/women-who-go-backend/database"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/vivcis/women-who-go-backend/models"
)

// InitiatePayment - Start a payment transaction
func InitiatePayment(c *gin.Context) {
	var req struct {
		UserID        uint    `json:"user_id" binding:"required"`
		Amount        float64 `json:"amount" binding:"required"`
		PaymentMethod string  `json:"payment_method" binding:"required"`
		PlanType      string  `json:"plan_type" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate user exists
	var user models.User
	if err := database.DB.First(&user, req.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Generate unique payment reference (like you do at Betika!)
	reference := fmt.Sprintf("WWG-%d-%d", req.UserID, time.Now().Unix())

	// Create transaction record
	transaction := models.Transaction{
		UserID:           req.UserID,
		Amount:           req.Amount,
		Currency:         "USD",
		PaymentMethod:    req.PaymentMethod,
		PaymentReference: reference,
		Status:           "pending",
	}

	if err := database.DB.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	// In real world, you'd integrate with:
	// - M-Pesa for mobile money
	// - Stripe for card payments
	// - PayPal API
	// For assignment, we simulate the process

	c.JSON(http.StatusOK, gin.H{
		"reference":      reference,
		"transaction_id": transaction.ID,
		"status":         "pending",
		"payment_method": req.PaymentMethod,
		"amount":         req.Amount,
		"message":        "Payment initiated successfully",
	})
}

// PaymentCallback - Handle payment gateway callback
// This simulates callbacks from Orange DRC, TeleBirr, M-Pesa etc that you handle at work
func PaymentCallback(c *gin.Context) {
	var callback struct {
		Reference string `json:"reference" binding:"required"`
		Status    string `json:"status" binding:"required"` // completed, failed
		UserID    uint   `json:"user_id" binding:"required"`
		PlanType  string `json:"plan_type" binding:"required"`
	}

	if err := c.ShouldBindJSON(&callback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the transaction
	var transaction models.Transaction
	if err := database.DB.Where("payment_reference = ?", callback.Reference).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
		return
	}

	// Update transaction status
	transaction.Status = callback.Status
	database.DB.Save(&transaction)

	// If payment successful, create/update membership
	if callback.Status == "completed" {
		membership := models.Membership{
			UserID:    callback.UserID,
			PlanType:  callback.PlanType,
			Amount:    transaction.Amount,
			Status:    "active",
			StartDate: time.Now(),
			EndDate:   time.Now().AddDate(0, 1, 0), // 1 month from now
		}

		if err := database.DB.Create(&membership).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create membership"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":     "Payment processed and membership activated",
			"transaction": transaction,
			"membership":  membership,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Payment callback processed",
		"transaction": transaction,
	})
}

// GetPayment - Check payment status
func GetPayment(c *gin.Context) {
	reference := c.Param("reference")

	var transaction models.Transaction
	if err := database.DB.Preload("User").Where("payment_reference = ?", reference).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		return
	}

	c.JSON(http.StatusOK, transaction)
}
