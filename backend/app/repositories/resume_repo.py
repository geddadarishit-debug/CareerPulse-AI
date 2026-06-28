from sqlalchemy.orm import Session
from app.models.resume import Resume


def create_resume(db: Session, user_id: int, filename: str, extracted_text: str):
    resume = Resume(
        user_id=user_id,
        filename=filename,
        extracted_text=extracted_text
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    return resume


def get_resumes_by_user(db: Session, user_id: int):
    return (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.created_at.desc())
        .all()
    )


def get_resume_by_id(db: Session, resume_id: int):
    return db.query(Resume).filter(Resume.id == resume_id).first()