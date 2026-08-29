import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")


def ask_llm(prompt):

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "nvidia/nemotron-3-super-120b-a12b:free",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    response.raise_for_status()

    data = response.json()

    return data["choices"][0]["message"]["content"]