import fitz
def extract_text(pdf_path):
    try:
        document = fitz.open(pdf_path)

        text = ""

        for page in document:
            text += page.get_text()

        document.close()

        return text

    except Exception as e:
        raise Exception(f"PDF Reader Error: {str(e)}")