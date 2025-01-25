from fastapi import UploadFile
import os
import boto3
from langchain_community.document_loaders.pdf import AmazonTextractPDFLoader

class OcrService:
    def __init(self):
        self.access_key = os.getenv("AWS_ACCESS_KEY_ID")
        self.secret_key = os.getenv("AWS_SECRET_ACCESS_KEY_ID")
        self.region = os.getenv("AWS_REGION")
        self.textract_client = boto3.client(
            'textract',
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
            region_name=self.region
        )
    
    async def upload_and_process_file(self, file: UploadFile):
        try:
            print("-- Upload step --")
            
            print("-- Processing step --")
            # loader = AmazonTextractPDFLoader(file_path=)       
            
        except Exception as e:
            print("Error")