from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.repositories.resume_repo import create_resume, get_resumes_by_user
from app.schemas.resume import ResumeResponse, ResumeUploadResponse
from app.services.pdf_parser import extract_text_from_pdf

router = APIRouter(prefix="/resumes", tags=["Resume"])


@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF resumes are allowed"
        )

    pdf_bytes = await file.read()
    extracted_text = extract_text_from_pdf(pdf_bytes)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract text from this PDF"
        )

    resume = create_resume(
        db=db,
        user_id=current_user.id,
        filename=file.filename,
        extracted_text=extracted_text
    )

    return ResumeUploadResponse(
        id=resume.id,
        filename=resume.filename,
        extracted_characters=len(extracted_text),
        extracted_text_preview=extracted_text[:500],
        created_at=resume.created_at
    )


@router.get("/my-resumes", response_model=list[ResumeResponse])
def my_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_resumes_by_user(db, current_user.id)