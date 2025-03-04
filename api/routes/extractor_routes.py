from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Literal

from api.services.gemini_extractor_service import NERExtractorService
from api.util.logging import SetupLogging
from api.util.types import DocumentType

from api.services.textract_ocr_service import OcrService
from api.services.cleanup_service import CleanupService

import os, dotenv
dotenv.load_dotenv()
selected_model = os.getenv("SELECTED_MODEL",'textract')

router = APIRouter()
logger = SetupLogging()

@router.post("")
async def get_form_responses(
    file: UploadFile = File(...),
    form_type: Literal["w2", "w9", "custom"] = Form(...),  # Accepts only "w2" or "w9" or "custom"
    fields: str = Form(...)
):
    """
    Endpoint to extract entities from an uploaded document.

    :param file: The uploaded file (PDF format).
    :param form_type: The type of document to process ("w2" or "w9" or "custom").
    :return: Extracted entity responses in JSON format.
    """
    try:
        # Validate document type
        if form_type not in ["w2", "w9", "custom"]:
            raise HTTPException(status_code=400, detail="Invalid document type. Supported types: 'w2', 'w9', 'custom'")
        
        if selected_model == "gemini":
            ner_extractor_service = NERExtractorService()

            # Set document type dynamically
            ner_extractor_service.form_type = form_type

            # Process file and extract entities
            key_values = await ner_extractor_service.process_file(file, fields)
            
        elif selected_model == "textract":
            ocr_service = OcrService()
            key_values = await ocr_service.upload_and_process_file(file)

        for key, value in key_values.items():
            print("- " + key + ": " + value)

        cleanup_service = CleanupService(doc_type=form_type, key_values=key_values, fields=fields)
        prompt_response = cleanup_service.clean_fields()
            
        return JSONResponse(status_code=200, content={"response": prompt_response})

    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in get_form_responses POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
