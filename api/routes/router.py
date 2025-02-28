from fastapi import APIRouter
from api.routes.health_check_routes import router as health_check_router
from api.routes.validator_routes import router as validator_router
from api.routes.ocr_routes import router as ocr_router
from api.routes.ner_extractor_routes import router as ner_extractor_router

router = APIRouter(prefix="/paperforms/v1")

router.include_router(
    health_check_router,
    prefix="/ping",
    tags=["Health Check"],
)

router.include_router(
    ocr_router,
    prefix="/ocr",
    tags=["OCR"],
)

router.include_router(
    validator_router,
    prefix="/validator",
    tags=["Validator"],
)

router.include_router(
    ner_extractor_router,
    prefix="/ner-extractor",
    tags=["NER Extractor"],
)