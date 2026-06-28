def generate_interview_plan(best_role: str, skills_found: list[str], missing_skills: list[str]) -> list[str]:
    role = best_role.lower()

    common_plan = [
        "Practice arrays, strings, hashing, and basic problem solving",
        "Prepare a 2-minute self introduction",
        "Prepare detailed explanation for each major project in your resume",
        "Revise DBMS, OOPs, OS, and Computer Networks basics"
    ]

    if "full stack" in role:
        common_plan.extend([
            "Revise JavaScript fundamentals, DOM, events, promises, async/await",
            "Prepare React basics and component lifecycle/state concepts",
            "Prepare backend API flow, authentication, and database integration"
        ])

    elif "backend" in role:
        common_plan.extend([
            "Revise APIs, HTTP methods, authentication, middleware, and SQLAlchemy",
            "Practice SQL joins, normalization, and schema design",
            "Understand FastAPI request-response flow and token auth"
        ])

    elif "ai engineer" in role:
        common_plan.extend([
            "Revise ML basics: supervised learning, overfitting, train/test split",
            "Prepare explanations for your ML/AI projects",
            "Understand prompt engineering, embeddings, and LLM use cases"
        ])

    elif "data analyst" in role:
        common_plan.extend([
            "Practice SQL queries, aggregations, joins, and case statements",
            "Revise Pandas data cleaning and visualization basics",
            "Prepare to explain dashboards, business insights, and metrics"
        ])

    if missing_skills:
        common_plan.append(f"Spend extra prep time on these missing skills: {', '.join(missing_skills[:3])}")

    return common_plan
