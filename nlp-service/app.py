import os
import traceback
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pdf_reader import extract_text
from analyzer import analyze_contract
from builder import build_contract
from pydantic import BaseModel

app = FastAPI(title="Contract Risk Analyzer NLP Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BuilderRequest(BaseModel):

    contractType: str

    partyOne: str

    partyTwo: str

    startDate: str

    endDate: str

    payment: str

    description: str

# Home
@app.get("/")
def home():
    return {
        "message": "Contract Risk Analyzer NLP Service Running"
    }


# Health
@app.get("/health")
def health():
    return {
        "status": "Server Running"
    }


# Analyze Contract
@app.post("/analyze")
async def analyze(contract: UploadFile = File(...)):

    try:

        # Create contracts folder
        os.makedirs("contracts", exist_ok=True)

        # Save uploaded contract
        file_path = os.path.join("contracts", contract.filename)

        with open(file_path, "wb") as file:
            file.write(await contract.read())

        print("Saved:", file_path)

        # Extract text
        text = extract_text(file_path)

        print("Text extracted successfully.")

        # AI Analysis
        result = analyze_contract(text)

        # Add extra information
        result["success"] = True
        result["filename"] = contract.filename
        result["contract_text"] = text

        return result

    except Exception as e:

        traceback.print_exc()

        return {
            "success": False,
            "error": str(e)
        }

# Chat
@app.post("/chat")
def chat():

    return {
        "message": "Chat endpoint created successfully."
    }

@app.post("/generate-contract")
def generate_contract(request: BuilderRequest):

    contract = build_contract(request)

    return {

        "success": True,

        "contract": contract

    }