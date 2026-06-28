from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis

from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router
from app.api.routes.resume import router as resume_router
from app.api.routes.analysis import router as analysis_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareerPulse AI Production Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(resume_router)
api_router.include_router(analysis_router)

app.include_router(api_router)


@app.get("/")
def home():
    return {"message": "CareerPulse AI Production Backend Running"}