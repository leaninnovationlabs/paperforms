import os, logging, json
from google import genai
from google.genai import types
from fastapi import UploadFile, HTTPException
from pydantic import BaseModel
from botocore.exceptions import ClientError
from api.util.types import W2ExtractionResult, W9ExtractionResult

class EntityExtractionResult(BaseModel):
    entities: dict

class NERExtractorService:
    def __init__(self):
        # Initialize the service variables
        self.contents = None # Contents of the file to extract entities from
        self.gemini_api_key = os.getenv("GEMINI_API_KEY") # API key for the Gemini API
        self.gemini_model_name = os.getenv("GEMINI_MODEL_NAME") # Model to use for entity extraction
        self.client = genai.Client(
                                api_key=self.gemini_api_key,
                                http_options=types.HttpOptions(api_version='v1alpha') # API version to use
                                )
        self.document_type = None # Default document type to process

    async def extract_entities(self, contents, document_type: str) -> dict:
        """
        Extract entities from a given document type using the Gemini API.

        :param contents: PDF file contents in bytes
        :param document_type: Type of document to process (either "W2" or "W9")
        :return: Dictionary of extracted entities
        """
        try:
            # Define valid document types
            document_types = {
                "W2": {
                    "prompt_path": "api/prompts/w2_prompt.txt",
                    "response_schema": W2ExtractionResult,
                },
                "W9": {
                    "prompt_path": "api/prompts/w9_prompt.txt",
                    "response_schema": W9ExtractionResult,
                },
            }

            # Validate document type
            if document_type not in document_types:
                raise ValueError(f"Unsupported document type: {document_type}")

            # Select appropriate prompt file and response schema
            prompt_path = document_types[document_type]["prompt_path"]
            response_schema = document_types[document_type]["response_schema"]

            # Read prompt from the selected file
            with open(prompt_path, "r", encoding="utf-8") as file:
                prompt = file.read()

            if contents:
                # Extract entities from the text
                response = self.client.models.generate_content(
                            model=self.gemini_model_name, 
                            contents=[
                                types.Part.from_bytes(
                                    data=contents, # Text to extract entities from
                                    mime_type='application/pdf', # MIME type of the text
                                ),
                                prompt # prompt
                            ],
                            config={
                                    'response_mime_type': 'application/json',
                                    'response_schema': response_schema, # Force the response to be in the specified schema - Function calling
                                    },
                        )
            return response.text
        except Exception as e:
            logging.error(e)
            return dict()

    async def process_file(self, file: UploadFile) -> dict:
        """
        Upload a file and extract entities from it

        :param file: File to upload
        :return: Dictionary of entities extracted
        """
        try:
            # Read the PDF file in bytes
            self.contents = await file.read()

            # Extract entities from the PDF file
            key_values = await self.extract_entities(self.contents, self.document_type)

            print(json.loads(key_values))
            print(type(json.loads(key_values)))

            return json.loads(key_values)
            
        except Exception as e:
            print("Error: ", e)
            return dict()
        
    async def upload_file(self, file: UploadFile) -> dict:
        """
        Upload a file to the Gemini API. File can be accessed using the file.name attribute.

        :param file: File to upload
        :return: Dictionary of the file uploaded
        """
        try:
            # Upload the file to the Gemini API
            file = self.client.files.upload(file=file.file)
            print("Uploaded file: ", file.name)
            return file
        except Exception as e:
            logging.error(e)
            return dict()

    async def list_stored_files(self) -> dict:
        """
        List all the files stored in the Gemini API.

        :return: List of files stored in the Gemini API
        """
        try:
            # List all the files stored in the Gemini API
            files = self.client.files.list()
            print("Listing the files stored in the Gemini API:")
            for f in files:
                print(" - ", f.name)
            print("Number of files: ", len(files)) 
            return files
        except Exception as e:
            logging.error(e)
            return dict()
    
    async def delete_stored_files(self, file_name: str) -> dict:
        """
        Delete a file stored in the Gemini API. By default, the file is deleted from the Gemini API after 2 days.

        :param file_name: Name of the file to delete
        :return: Dictionary of the file deleted
        """
        try:
            # Delete the file stored in the Gemini API
            file = self.client.files.delete(name=file_name)
            print("Deleted file: ", file.name)
            return file
        except Exception as e:
            logging.error(e)
            return dict()

