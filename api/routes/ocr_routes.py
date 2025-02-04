from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from fastapi.responses import JSONResponse

from api.services.ocr_service import OcrService
from api.services.cleanup_service import CleanupService
from api.util.logging import SetupLogging

from api.util.types import DocumentType

router = APIRouter()
logger = SetupLogging()

@router.post("")
async def get_form_responses(
    file: UploadFile = File(...),
    fields: str = Form(...)
):
    try:
        ocr_service = OcrService()
        key_values = await ocr_service.upload_and_process_file(file)

        for key, value in key_values.items():
            print("- " + key + ": " + value)

        cleanup_service = CleanupService(doc_type=DocumentType.W9, key_values=key_values, fields=fields)
        prompt_response = cleanup_service.clean_fields()
        
        return JSONResponse(status_code=200, content={"response": prompt_response})
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in get_key_values POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
        