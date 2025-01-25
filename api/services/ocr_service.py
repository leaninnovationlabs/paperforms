from fastapi import UploadFile

class OcrService:
    async def process_file(self, file: UploadFile):
        try:
            print("OCR Service -- File Size:")
            print(file.size)
        except Exception as e:
            print("Error")