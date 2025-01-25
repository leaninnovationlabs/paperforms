from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("")
async def ping():
    return JSONResponse(status_code=200, content={"message": "pong"})