from backend.app.resume.resume_parser import ResumeParser

parser = ResumeParser()

text = parser.extract_text("uploads/PRASANNAJIT PANIGRAHI 2.pdf")

print("=" * 80)
print("EXTRACTED TEXT")
print("=" * 80)
print(text)
print("=" * 80)