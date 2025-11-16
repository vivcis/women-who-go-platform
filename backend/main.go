package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/vivcis/women-who-go-backend/database"
	"github.com/vivcis/women-who-go-backend/handlers"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Connect to database
	database.Connect()

	// Initialize Gin
	router := gin.Default()

	// CORS configuration - allow frontend development server
	config := cors.DefaultConfig()
	allowedOrigins := []string{
		"http://localhost:3000",
		"https://*.railway.app",    // Allow all Railway subdomains
		"https://*.up.railway.app", // Railway's domain
	}

	// Add FRONTEND_URL if it's set and not empty
	if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}

	config.AllowOrigins = allowedOrigins
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization", "Accept"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	// Serve static files (frontend)
	router.Static("/_next", "./static/_next")
	router.Static("/images", "./static/images")
	router.StaticFile("/", "./static/index.html")
	router.StaticFile("/favicon.ico", "./static/favicon.ico")

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Women Who Go API is running",
		})
	})

	// API routes
	api := router.Group("/api")
	{
		// Users
		api.GET("/users", handlers.GetUsers)
		api.POST("/users", handlers.CreateUser)
		api.GET("/users/:id", handlers.GetUser)
		// api.PUT("/users/:id", handlers.UpdateUser)
		// api.DELETE("/users/:id", handlers.DeleteUser)

		// Memberships
		api.GET("/memberships", handlers.GetMemberships)
		api.POST("/memberships", handlers.CreateMembership)
		api.GET("/membership-plans", handlers.GetMembershipPlans)

		// Payments
		api.POST("/payments/initiate", handlers.InitiatePayment)
		api.POST("/payments/callback", handlers.PaymentCallback)
		api.GET("/payments/:reference", handlers.GetPayment)

		// Resources
		api.GET("/resources", handlers.GetResources)
		api.POST("/resources", handlers.CreateResource)
		api.GET("/resource-categories", handlers.GetResourceCategories)

		// Stats
		api.GET("/stats", handlers.GetStats)
	}

	// Catch-all route for frontend routing
	router.NoRoute(func(c *gin.Context) {
		c.File("./static/index.html")
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	router.Run(":" + port)
}
