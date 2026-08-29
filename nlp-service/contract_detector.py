from llm import ask_llm
from prompts import CONTRACT_TYPE_PROMPT


def detect_contract_type(text):

    prompt = CONTRACT_TYPE_PROMPT.format(
        text=text[:4000]
    )

    response = ask_llm(prompt)

    return response.strip()