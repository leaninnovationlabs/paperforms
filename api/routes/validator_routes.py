from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse

from api.services.ocr_service import OcrService
from api.services.llm_service import LlmService
from api.util.logging import SetupLogging

from api.util.types import DocumentType

router = APIRouter()
logger = SetupLogging()

@router.get("")
async def ping():
    return JSONResponse(status_code=200, content={"message": "pong"})

@router.post("")
async def validate_w9(
    file: UploadFile = File(...)
):
    try:
        ocr_service = OcrService()
        key_values = await ocr_service.upload_and_process_file(file)

        llm_service = LlmService(doc_type=DocumentType.W9, key_values=key_values)
        prompt_response = llm_service.validate_with_llm()
        
        return JSONResponse(status_code=200, content={"response": prompt_response})
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in validate_w9 POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
        