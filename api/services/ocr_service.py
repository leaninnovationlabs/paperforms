from fastapi import UploadFile, HTTPException
import os
import logging
import boto3
from botocore.exceptions import ClientError
from langchain_community.document_loaders.pdf import AmazonTextractPDFLoader

class OcrService:
    def __init__(self):
        self.access_key = os.getenv("AWS_ACCESS_KEY_ID")
        self.secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.region = os.getenv("AWS_REGION")
        self.bucket_name = os.getenv("AWS_BUCKET")
        
        self.s3_client = boto3.client("s3")
        
        # self.textract_client = boto3.client(
        #     'textract',
        #     aws_access_key_id=self.access_key,
        #     aws_secret_access_key=self.secret_key,
        #     region_name=self.region
        # )

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
    
    async def upload_and_process_file(self, file: UploadFile):
        try:
            print("-- Upload step --")
            if not await self.upload_file(file=file):
                raise HTTPException(status_code=500, detail="Failed to upload file to S3")
            
            print("-- Processing step --")
            # loader = AmazonTextractPDFLoader(file_path=)       
            
        except Exception as e:
            print("Error")