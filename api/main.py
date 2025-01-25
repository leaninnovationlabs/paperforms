from fastapi import FastAPI
from fastapi.responses import JSONResponse
from api.routes.router import router
import dotenv

dotenv.load_dotenv()

def create_app():
    app = FastAPI(
        title="W9 Validator API",
        version="1.0",
        description="W9 Validator API"
    )

    app.include_router(router)

    return app