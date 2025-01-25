from fastapi import UploadFile, HTTPException
import os
import logging
import uuid
from typing import List
import boto3
from botocore.exceptions import ClientError
from langchain_community.document_loaders.pdf import AmazonTextractPDFLoader
from langchain_core.documents import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from urllib.parse import urlparse
from textractor import Textractor
from textractor.data.constants import TextractFeatures

class OcrService:
    def __init__(self):
        self.access_key = os.getenv("AWS_ACCESS_KEY_ID")
        self.secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.region = os.getenv("AWS_REGION")
        self.bucket_name = os.getenv("AWS_BUCKET")
        
        self.s3_client = boto3.client("s3")
        
        self.textract_client = boto3.client(
            'textract',
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
            region_name=self.region
        )

    async def upload_file(self, file: UploadFile) -> bool:
        """
        Upload a file to an S3 bucket

        :param file: UploadFile object to upload
        :return: True if file was uploaded successfully, False otherwise
        """
        try:
            file_content = await file.read()
            self.s3_client.put_object(Body=file_content, Bucket=self.bucket_name, Key=file.filename)
            return True
        except ClientError as ex:
            logging.error(ex)
            return False
        except Exception as ex:
            logging.error(ex)
            return False

    async def load_document(self, uri: str) -> List[Document]:
        documents = []
        key = urlparse(uri).path.lstrip('/')
        file_name = key.split('/')[-1]
        document_uuid = str(uuid.uuid4())
        
        try:
            extractor = Textractor()
            document = extractor.analyze_document(
                file_source=uri,
                features=[TextractFeatures.FORMS],
                save_image=False
            )
            
            print("Key values:")
            print(document.key_values)
                
            return documents
        except Exception as ex:
            print("Error: ", ex)
            return []
            

    async def upload_and_process_file(self, file: UploadFile):
        try:
            print("-- Upload step --")
            if not await self.upload_file(file=file):
                raise HTTPException(status_code=500, detail="Failed to upload file to S3")
            
            s3_uri = f"s3://{self.bucket_name}/{file.filename}"
            
            print("-- Processing step --")
            documents = await self.load_document(s3_uri)
            for i, doc in enumerate(documents):
                print("Chunk ", i, " --- Document: ", doc)
            
        except Exception as e:
            print("Error")