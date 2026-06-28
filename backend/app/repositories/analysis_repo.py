import json
from sqlalchemy.orm import Session

from app.models.analysis import Analysis


def create_analysis(
    db: Session,
    resume_id: int,
    career_score: int,
    skills_found: list[str],
    missing_skills: list[str],
    analysis_result: dict
):
    analysis = Analysis(
        resume_id=resume_id,
        career_score=career_score,
        skills_found=json.dumps(skills_found),
        missing_skills=json.dumps(missing_skills),
        analysis_result=json.dumps(analysis_result)
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis


def get_analysis_by_resume_id(db: Session, resume_id: int):
    return (
        db.query(Analysis)
        .filter(Analysis.resume_id == resume_id)
        .order_by(Analysis.created_at.desc())
        .first()
    )


def get_analysis_by_id(db: Session, analysis_id: int):
    return db.query(Analysis).filter(Analysis.id == analysis_id).first()


def get_analyses_for_user(db: Session, user_id: int):
    from app.models.resume import Resume

    return (
        db.query(Analysis)
        .join(Resume, Analysis.resume_id == Resume.id)
        .filter(Resume.user_id == user_id)
        .order_by(Analysis.created_at.desc())
        .all()
    )