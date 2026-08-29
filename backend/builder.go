package main

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BuilderRequest struct {
	ContractType string `json:"contractType"`
	PartyOne     string `json:"partyOne"`
	PartyTwo     string `json:"partyTwo"`
	StartDate    string `json:"startDate"`
	EndDate      string `json:"endDate"`
	Payment      string `json:"payment"`
	Description  string `json:"description"`
}

func ContractBuilderHandler(c *gin.Context) {

	var request BuilderRequest

	if err := c.ShouldBindJSON(&request); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid request",
		})

		return
	}

	jsonData, _ := json.Marshal(request)

	resp, err := http.Post(
		"http://localhost:8000/generate-contract",
		"application/json",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": err.Error(),
		})

		return
	}

	defer resp.Body.Close()

	var result map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&result)

	c.JSON(http.StatusOK, result)

}