from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse

from api.services.ocr_service import OcrService
from api.util.logging import SetupLogging

router = APIRouter()
logger = SetupLogging()

@router.get("")
async def ping():
    return JSONResponse(status_code=200, content={"message": "pong"})

@router.post("")
async def validate_1099(
    file: UploadFile = File(...)
):
    try:
        ocr_service = OcrService()
        await ocr_service.upload_and_process_file(file)
        return JSONResponse(status_code=200, content={"file_size": file.size})
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in validate_1099 POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
        