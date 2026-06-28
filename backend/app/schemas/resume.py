from datetime import datetime
from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    id: int
    filename: str
    extracted_characters: int
    extracted_text_preview: str
    created_at: datetime

    class Config:
        from_attributes = True


class ResumeResponse(BaseModel):
    id: int
    filename: str
    created_at: datetime

    class Config:
        from_attributes = True