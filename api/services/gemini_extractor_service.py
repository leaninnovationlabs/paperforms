import os, logging, json, re
from google import genai
from google.genai import types
from fastapi import UploadFile, HTTPException
from pydantic import BaseModel, create_model, Field
from botocore.exceptions import ClientError
from api.util.types import W2ExtractionResult, W9ExtractionResult

class EntityExtractionResult(BaseModel):
    entities: dict

def create_dynamic_schema(fields_str):
    """
    Create a dynamic Pydantic model based on user-provided fields.
    
    :param fields_str: String containing the fields to extract
    :return: A dynamically created Pydantic model
    """
    fields_dict = {}
    
    # Parse the fields string to extract field names
    field_lines = [line.strip() for line in fields_str.split('\n') if line.strip()]
    for line in field_lines:
        # Extract field name (handle bullet points, etc.)
        if ':' in line:
            field_name = line.split(':')[0].strip()
        elif '-' in line and not line.startswith('-'):
            # Handle cases like "Field Name - Description"
            field_name = line.split('-')[0].strip()
        elif '-' in line:
            # Handle bullet points like "- Field Name"
            field_name = line.split('-', 1)[1].strip()
        else:
            field_name = line.strip()
            
        # Clean up field name and convert to valid Python identifier
        field_name = re.sub(r'[^\w\s]', '', field_name)  # Remove special characters
        field_name = field_name.lower().replace(' ', '_')
        
        if field_name:
            # Add field to the dictionary with string type and optional
            fields_dict[field_name] = (str, Field(None, description=field_name))
    
    # Create and return a dynamic model
    return create_model('DynamicExtractionResult', **fields_dict)

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
        self.form_type = None # Default document type to process

    async def extract_entities(self, contents, form_type: str, fields: str = None) -> dict:
        """
        Extract entities from a given document type using the Gemini API.

        :param contents: PDF file contents in bytes
        :param form_type: Type of document to process (either "w2", "w9", or "custom")
        :param fields: Comma-separated list of fields to extract (optional)
        :return: Dictionary of extracted entities
        """
        try:
            # Define valid document types
            form_types = {
                "w2": {
                    "prompt_path": "api/prompts/w2_prompt.txt",
                    "response_schema": W2ExtractionResult,
                },
                "w9": {
                    "prompt_path": "api/prompts/w9_prompt.txt",
                    "response_schema": W9ExtractionResult,
                },
                "custom": {
                    "prompt_path": "api/prompts/custom_prompt.txt",
                    "response_schema": None,  # No predefined schema for Custom
                },
            }

            # Validate document type
            if form_type not in form_types:
                raise ValueError(f"Unsupported document type: {form_type}")

            # Select appropriate prompt file and response schema
            prompt_path = form_types[form_type]["prompt_path"]
            response_schema = form_types[form_type]["response_schema"]

            # Read prompt from the selected file
            with open(prompt_path, "r", encoding="utf-8") as file:
                prompt = file.read()
            
            # If fields are specified, modify the prompt to only extract those fields
            if fields:
                if form_type == "custom":
                    # For Custom type, replace the placeholder with the fields
                    prompt = prompt.replace("[FIELDS_PLACEHOLDER]", fields)
                else:
                    # For w2 and w9, modify the prompt to only extract the specified fields
                    prompt_parts = prompt.split("Extract the following key entities")
                    if len(prompt_parts) > 1:
                        intro = prompt_parts[0]
                        # Create a new prompt with only the specified fields
                        prompt = f"{intro}Extract only the following key entities and return them in a JSON format:\n\n{fields}\n\nEnsure that:\n- The JSON response contains proper keys with extracted values.\n- If any field is missing, return an empty string for that key.\n- If you are unsure of any value for a given field, return an empty string for that key.\n- Return the extracted entities as a **valid JSON object**."
            elif form_type == "custom":
                # For Custom type, fields are required
                raise ValueError("Fields parameter is required for custom document type")

            # Create a dynamic schema if fields are specified
            if fields:
                # Create a dynamic schema based on the fields
                dynamic_schema = create_dynamic_schema(fields)
            else:
                # Use the default schema for the document type
                dynamic_schema = response_schema

            if contents:
                # Extract entities from the text using the appropriate schema
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
                                    'response_schema': dynamic_schema, # Use dynamic schema for validation
                                    },
                        )
            print("Response: ", response.text)
            return response.text
        except Exception as e:
            logging.error(e)
            return dict()

    async def process_file(self, file: UploadFile, fields: str = None) -> dict:
        """
        Upload a file and extract entities from it

        :param file: File to upload
        :param fields: Comma-separated list of fields to extract (optional)
        :return: Dictionary of entities extracted
        """
        try:
            # Read the PDF file in bytes
            self.contents = await file.read()

            # Extract entities from the PDF file
            key_values = await self.extract_entities(self.contents, self.form_type, fields)

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
