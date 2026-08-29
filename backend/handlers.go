package main

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)
// Home
func HomeHandler(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "Contract Risk Analyzer Backend Running!",
	})

}
// Health
func HealthHandler(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"status": "Server Running",
	})

}
// Analyze Contract
func AnalyzeHandler(c *gin.Context) {

	// Receive uploaded file
	file, err := c.FormFile("contract")

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Please upload a PDF.",
		})

		return
	}
	// Check file extension
	if !strings.HasSuffix(strings.ToLower(file.Filename), ".pdf") {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Only PDF files are allowed.",
		})

		return
	}
	// Create uploads folder if not present
	err = os.MkdirAll("uploads", os.ModePerm)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Could not create upload folder.",
		})

		return
	}

	// Save file path
	filePath := filepath.Join("uploads", file.Filename)
	// Save uploaded PDF
	err = c.SaveUploadedFile(file, filePath)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to save contract.",
		})
		return
	}

	// Debug confirmation
	println("File saved:", filePath)

	// Response
	response, err := SendToNLP(filePath)

    if err != nil {

	c.JSON(http.StatusInternalServerError, gin.H{
		"success": false,
		"message": err.Error(),
	})

	return

    }
    c.JSON(http.StatusOK, response)

}

// Chat With Contract
func ChatHandler(c *gin.Context) {
	type ChatRequest struct {
		Question string `json:"question"`
	}
	var request ChatRequest
	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{

			"success": false,

			"message": "Invalid Request",

		})
		return
	}
	c.JSON(http.StatusOK, gin.H{

		"success": true,

		"question": request.Question,

		"answer": "",

	})

}

// Delete Uploaded Contract
func DeleteContractHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Contract deleted successfully.",

	})

}