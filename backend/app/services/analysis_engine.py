from app.services.skill_extractor import extract_skills_from_text
from app.services.gap_analyzer import find_best_role_and_missing_skills
from app.services.dead_skill_detector import detect_dead_and_rising_skills
from app.services.roadmap_generator import generate_learning_roadmap
from app.services.time_machine import generate_career_time_machine
from app.services.career_score import calculate_career_score

from app.services.job_recommender import recommend_jobs
from app.services.project_recommender import recommend_projects
from app.services.roadmap_generator import generate_weekly_learning_plan
from app.services.interview_planner import generate_interview_plan


def run_full_analysis(resume_id: int, resume_text: str) -> dict:
    # 1. Extract skills
    skills_found = extract_skills_from_text(resume_text)

    # 2. Match roles and get missing skills
    best_role, missing_skills, role_fit, role_details = find_best_role_and_missing_skills(skills_found)

    # 3. Calculate career score breakdown
    career_score_breakdown = {
        "resume_strength": min(70 + len(skills_found) * 2, 100),
        "market_alignment": role_fit[0]["score"] if role_fit else 50,
        "project_depth": 60 if "project" in resume_text.lower() else 40,
        "interview_readiness": 55 if missing_skills else 75,
        "overall_score": calculate_career_score(skills_found, missing_skills, resume_text)
    }

    # 4. Dead/rising skills
    dead_skills, rising_skills = detect_dead_and_rising_skills(skills_found)

    # 5. Basic roadmap (strategic)
    roadmap = generate_learning_roadmap(
        missing_skills=missing_skills,
        best_role=best_role
    )

    # 6. Career time machine
    career_time_machine = generate_career_time_machine(
        career_score=career_score_breakdown["overall_score"],
        best_role=best_role,
        missing_skills=missing_skills
    )

    # 7. Job recommendations (using consistent role details)
    job_recommendations = recommend_jobs(role_details)

    # 8. Project recommendations (upgraded structure)
    project_recommendations = recommend_projects(
        best_role=best_role,
        missing_skills=missing_skills,
        skills_found=skills_found
    )

    # 9. Weekly learning plan (tactical)
    weekly_learning_plan = generate_weekly_learning_plan(
        best_role=best_role,
        missing_skills=missing_skills
    )

    # 10. Interview plan
    interview_plan = generate_interview_plan(
        best_role=best_role,
        skills_found=skills_found,
        missing_skills=missing_skills
    )

    # 11. Career summary
    career_summary = f"You're a strong candidate for {best_role}! Your career score is {career_score_breakdown['overall_score']} out of 100. Focus on learning {', '.join(missing_skills[:3])} to improve your fit."

    return {
        "resume_id": resume_id,
        "career_score_breakdown": career_score_breakdown,
        "skills_found": skills_found,
        "missing_skills": missing_skills,
        "dead_skills": dead_skills,
        "rising_skills": rising_skills,
        "role_fit": role_fit,
        "career_summary": career_summary,
        "roadmap": roadmap,
        "career_time_machine": career_time_machine,
        "job_recommendations": job_recommendations,
        "project_recommendations": project_recommendations,
        "weekly_learning_plan": weekly_learning_plan,
        "interview_plan": interview_plan
    }

