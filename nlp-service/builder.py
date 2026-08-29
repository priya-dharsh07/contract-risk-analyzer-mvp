from llm import ask_llm

def build_contract(data):

    prompt = f"""
You are an experienced legal contract drafting assistant.

Generate a complete, professional, legally formatted contract based on the information provided.

Contract Type:
{data.contractType}

Party One:
{data.partyOne}

Party Two:
{data.partyTwo}

Start Date:
{data.startDate}

End Date:
{data.endDate}

Payment:
{data.payment}

Description:
{data.description}

Formatting Requirements:

- Use plain text only.
- Do NOT use Markdown.
- Do NOT use Markdown tables.
- Do NOT use HTML.
- Do NOT use "|" characters.
- Do NOT use emojis.
- Do NOT use code blocks.
- Use clear uppercase section headings.
- Leave one blank line between sections.
- Write in formal legal language.
- Make the document suitable for Microsoft Word printing.
- Replace placeholders with the provided information wherever possible.
- If any information is missing, write "Not Specified" instead of placeholders.

The contract must contain these sections in this exact order:

TITLE

PARTIES

PURPOSE

RESPONSIBILITIES

PAYMENT

CONFIDENTIALITY

TERM

TERMINATION

DISPUTE RESOLUTION

MISCELLANEOUS

SIGNATURES

Formatting Instructions:

- Do not use tables for any section.
- Present payment schedules as numbered items.
- Present responsibilities as numbered points.
- Use numbered clauses and sub-clauses where appropriate.
- Make every section properly spaced and easy to read.
- Do not include explanations outside the contract.

The SIGNATURES section must be formatted exactly like this:

SIGNATURES

Party One

Name: {data.partyOne}

Signature:
____________________________________

Date:
____________________________________


Party Two

Name: {data.partyTwo}

Signature:
____________________________________

Date:
____________________________________

Return ONLY the completed contract.
"""

    return ask_llm(prompt)