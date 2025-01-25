from fastapi import FastAPI
from fastapi.responses import JSONResponse
from api.routes.router import router

def create_app():
    app = FastAPI(
        title="1099 Validator API",
        version="1.0",
        description="1099 Validator API"
    )
    
    app.include_router(router)
       
    return app