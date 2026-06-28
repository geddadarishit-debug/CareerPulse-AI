import json

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.repositories.resume_repo import get_resume_by_id
from app.repositories.analysis_repo import (
    create_analysis,
    get_analysis_by_id,
    get_analyses_for_user,
)
from app.schemas.analysis import AnalysisHistoryItem, AnalysisRunResponse
from app.services.analysis_engine import run_full_analysis

router = APIRouter(prefix="/analysis", tags=["Analysis"])


def _role_fit_to_matches(role_fit: list[dict]) -> list[dict]:
    return [
        {
            "role": item.get("role", ""),
            "match_percentage": item.get("score", item.get("match_percentage", 0)),
        }
        for item in role_fit
    ]


def _parse_skill_list(value) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, list) else []
        except json.JSONDecodeError:
            return [value] if value.strip() else []
    return []


def _build_analysis_response(analysis) -> dict:
    result = json.loads(analysis.analysis_result)
    result["id"] = analysis.id
    result["career_score"] = analysis.career_score
    result["created_at"] = analysis.created_at
    result["role_matches"] = _role_fit_to_matches(result.get("role_fit", []))
    result["skills_found"] = _parse_skill_list(
        result.get("skills_found") or analysis.skills_found
    )
    result["missing_skills"] = _parse_skill_list(
        result.get("missing_skills") or analysis.missing_skills
    )
    return result


@router.post("/run/{resume_id}", response_model=AnalysisRunResponse)
def run_analysis(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    resume = get_resume_by_id(db, resume_id)

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    if resume.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to analyze this resume"
        )

    resume_text = resume.extracted_text or ""
    if not resume_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume has no extracted text"
        )

    analysis_result = run_full_analysis(
        resume_id=resume.id,
        resume_text=resume_text
    )

    saved = create_analysis(
        db=db,
        resume_id=resume.id,
        career_score=analysis_result["career_score_breakdown"]["overall_score"],
        skills_found=analysis_result["skills_found"],
        missing_skills=analysis_result["missing_skills"],
        analysis_result=analysis_result
    )

    analysis_result["id"] = saved.id
    analysis_result["career_score"] = saved.career_score
    analysis_result["created_at"] = saved.created_at
    analysis_result["role_matches"] = _role_fit_to_matches(
        analysis_result.get("role_fit", [])
    )
    return analysis_result


@router.get("/history", response_model=list[AnalysisHistoryItem])
def get_analysis_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analyses = get_analyses_for_user(db, current_user.id)

    history = []
    for analysis in analyses:
        result = json.loads(analysis.analysis_result)
        history.append(
            AnalysisHistoryItem(
                id=analysis.id,
                resume_id=analysis.resume_id,
                resume_name=analysis.resume.filename if analysis.resume else "Resume",
                career_score=analysis.career_score,
                created_at=analysis.created_at,
                role_matches=_role_fit_to_matches(result.get("role_fit", [])),
                skills_found=_parse_skill_list(
                    result.get("skills_found") or analysis.skills_found
                ),
                missing_skills=_parse_skill_list(
                    result.get("missing_skills") or analysis.missing_skills
                ),
            )
        )

    return history


@router.get("/{analysis_id}", response_model=AnalysisRunResponse)
def get_analysis(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    analysis = get_analysis_by_id(db, analysis_id)

    if not analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )

    resume = get_resume_by_id(db, analysis.resume_id)
    if not resume or resume.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to view this analysis"
        )

    return _build_analysis_response(analysis)
