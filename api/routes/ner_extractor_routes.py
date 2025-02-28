from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Literal

from api.services.ner_extractor_service import NERExtractorService
from api.util.logging import SetupLogging
from api.util.types import DocumentType

router = APIRouter()
logger = SetupLogging()

@router.post("")
async def get_form_responses(
    file: UploadFile = File(...),
    document_type: Literal["W2", "W9"] = Form(...),  # Accepts only "W2" or "W9"
):
    """
    Endpoint to extract entities from an uploaded document.

    :param file: The uploaded file (PDF format).
    :param document_type: The type of document to process ("W2" or "W9").
    :return: Extracted entity responses in JSON format.
    """
    try:
        # Validate document type
        if document_type not in ["W2", "W9"]:
            raise HTTPException(status_code=400, detail="Invalid document type. Supported types: 'W2', 'W9'.")

        ner_extractor_service = NERExtractorService()

        # Set document type dynamically
        ner_extractor_service.document_type = document_type

        # Process file and extract entities
        prompt_response = await ner_extractor_service.process_file(file)
        
        return JSONResponse(status_code=200, content={"response": prompt_response})
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in get_form_responses POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
        