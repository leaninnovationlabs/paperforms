from fastapi import APIRouter
from api.routes.health_check_routes import router as health_check_router

router = APIRouter(prefix="/1099-validator/v1")

router.include_router(
    health_check_router,
    prefix="/ping",
    tags=["Health Check"],
)