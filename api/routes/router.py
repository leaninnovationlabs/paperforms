from fastapi import APIRouter
from api.routes.health_check_routes import router as health_check_router
from api.routes.validator_routes import router as validator_router

router = APIRouter(prefix="/w9-validator/v1")

router.include_router(
    health_check_router,
    prefix="/ping",
    tags=["Health Check"],
)

router.include_router(
    validator_router,
    prefix="/validator",
    tags=["Validator"],
)