from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("")
async def ping():
    return JSONResponse(status_code=200, content={"message": "pong"})

@router.post("")
async def validate_1099(
    file: UploadFile = File(...)
):
    return JSONResponse(status_code=200, content={"file_size": file.size})