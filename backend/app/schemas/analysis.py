from datetime import datetime
from pydantic import BaseModel


class RoleFitItem(BaseModel):
    role: str
    score: int


class CareerTimeMachine(BaseModel):
    current_stage: str
    after_6_months: str
    after_1_year: str
    risk_factors: list[str]
    priority_next_steps: list[str]


class JobRecommendationItem(BaseModel):
    role: str
    match_score: int
    why: list[str]
    priority_skills: list[str]


class ProjectRecommendationItem(BaseModel):
    title: str
    why: str
    skills_covered: list[str]
    difficulty: str
    duration_weeks: int


class CareerScoreBreakdown(BaseModel):
    resume_strength: int
    market_alignment: int
    project_depth: int
    interview_readiness: int
    overall_score: int


class AnalysisHistoryItem(BaseModel):
    id: int
    resume_id: int
    resume_name: str
    career_score: int
    created_at: datetime
    role_matches: list[dict] = []
    skills_found: list[str] = []
    missing_skills: list[str] = []


class AnalysisRunResponse(BaseModel):
    id: int | None = None
    resume_id: int
    career_score: int | None = None
    role_matches: list[dict] = []
    career_score_breakdown: CareerScoreBreakdown
    skills_found: list[str]
    missing_skills: list[str]
    dead_skills: list[str]
    rising_skills: list[str]
    role_fit: list[RoleFitItem]
    career_summary: str
    roadmap: list[str]
    career_time_machine: CareerTimeMachine
    job_recommendations: list[JobRecommendationItem]
    project_recommendations: list[ProjectRecommendationItem]
    weekly_learning_plan: dict[str, list[str]]
    interview_plan: list[str]
    created_at: datetime | None = None

