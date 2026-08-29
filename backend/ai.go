package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

func SendToNLP(filePath string) (map[string]interface{}, error) {

	file, err := os.Open(filePath)

	if err != nil {
		return nil, err
	}

	defer file.Close()

	body := &bytes.Buffer{}

	writer := multipart.NewWriter(body)

	part, err := writer.CreateFormFile(
		"contract",
		filepath.Base(filePath),
	)

	if err != nil {
		return nil, err
	}

	_, err = io.Copy(part, file)

	if err != nil {
		return nil, err
	}

	writer.Close()

	req, err := http.NewRequest(
		"POST",
		"http://localhost:8000/analyze",
		body,
	)

	if err != nil {
		return nil, err
	}

	req.Header.Set(
		"Content-Type",
		writer.FormDataContentType(),
	)

	client := &http.Client{}

	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	responseBody, _ := io.ReadAll(resp.Body)

	fmt.Println("NLP Response:")
	fmt.Println(string(responseBody))

	var result map[string]interface{}

	err = json.Unmarshal(responseBody, &result)

	if err != nil {
		return nil, err
	}

	return result, nil
}