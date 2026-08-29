import json

from llm import ask_llm
from prompts import ANALYSIS_PROMPT


def analyze_contract(text):
    prompt = ANALYSIS_PROMPT.format(
        text=text[:6000]
    )
    response = ask_llm(prompt)

    print("\n========== RAW AI RESPONSE ==========\n")
    print(response)
    print("\n=====================================\n")

    response = response.replace("```json", "")
    response = response.replace("```", "")
    response = response.strip()

    start = response.find("{")
    end = response.rfind("}")

    if start != -1 and end != -1:
        response = response[start:end + 1]

    try:
        return json.loads(response)

    except Exception as e:
        print("JSON ERROR:", e)
        print(response)

        return {
            "contract_type": "Unknown",
            "risk_level": "Unknown",
            "risk_score": 0,
            "summary": response,
            "clauses": [],
            "missing_clauses": [],
            "recommendations": []
        }