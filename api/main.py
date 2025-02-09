from fastapi import FastAPI
from fastapi.responses import JSONResponse
from api.routes.router import router
from fastapi.middleware.cors import CORSMiddleware

def create_app():

    app = FastAPI(
        title="W9 Validator API",
        version="1.0",
        description="W9 Validator API"
    )

    origins = [
        "*"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(router)

    return app