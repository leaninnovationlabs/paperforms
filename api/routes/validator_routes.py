from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import JSONResponse
from typing import Literal

from api.services.validation_service import ValidationService
from api.util.logging import SetupLogging

from api.util.types import DocumentType

router = APIRouter()
logger = SetupLogging()

@router.post("")
async def validate_form(
    form_responses: str = Form(...),
    rules: str = Form(...),
    form_type: Literal["W2", "W9", "Custom"] = Form(...)
):
    try:
        validation_service = ValidationService(doc_type=form_type, form_responses=form_responses, rules=rules)
        prompt_response = validation_service.validate_with_llm()
        
        return JSONResponse(status_code=200, content={"response": prompt_response})
    except HTTPException as http_ex:
        raise http_ex
    except Exception as ex:
        logger.error(f"Unexpected error in in validate_form POST request: {str(ex)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")
        