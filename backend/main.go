package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.Use(cors.Default())

	// Routes
	router.GET("/", HomeHandler)

	router.GET("/health", HealthHandler)

	router.POST("/analyze", AnalyzeHandler)

	router.POST("/chat", ChatHandler)

	router.DELETE("/contract", DeleteContractHandler)

	router.POST("/builder", ContractBuilderHandler)
	// Start server
	router.Run(":8080")
}