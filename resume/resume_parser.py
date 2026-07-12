from PyPDF2 import PdfReader


class ResumeParser:

    def extract_text(self, file_path):

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            text += page.extract_text() + "\n"

        return text