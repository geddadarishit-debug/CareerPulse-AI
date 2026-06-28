from datetime import datetime, timezone

from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship

from app.core.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False)
    career_score = Column(Integer, nullable=False)
    skills_found = Column(Text, nullable=False)       # JSON string
    missing_skills = Column(Text, nullable=False)     # JSON string
    analysis_result = Column(Text, nullable=False)    # JSON string
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # relationships
    resume = relationship("Resume", back_populates="analyses")