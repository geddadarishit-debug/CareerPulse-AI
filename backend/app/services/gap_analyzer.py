ROLE_SKILLS = {
    "Full Stack Developer Intern": [
        "HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Git"
    ],
    "Backend Developer Intern": [
        "Python", "FastAPI", "SQL", "APIs", "Git", "Database"
    ],
    "AI Engineer Intern": [
        "Python", "Machine Learning", "Pandas", "NumPy", "LLM", "Prompt Engineering"
    ],
    "Data Analyst Intern": [
        "SQL", "Python", "Excel", "Pandas", "Power BI", "Statistics"
    ]
}


def find_best_role_and_missing_skills(skills_found: list[str]):
    best_role = None
    best_match_score = -1
    best_missing_skills = []
    role_fit = []
    role_details = {}  # Store details for each role to share with job recommender

    found_set = set([s.lower() for s in skills_found])

    for role, required_skills in ROLE_SKILLS.items():
        required_lower = [s.lower() for s in required_skills]
        matched = [skill for skill in required_skills if skill.lower() in found_set]
        missing = [skill for skill in required_skills if skill.lower() not in found_set]
        score = int((len(matched) / len(required_skills)) * 100)

        role_fit.append({
            "role": role,
            "score": score
        })
        role_details[role] = {
            "matched": matched,
            "missing": missing,
            "score": score
        }

        if score > best_match_score:
            best_match_score = score
            best_role = role
            best_missing_skills = missing

    role_fit.sort(key=lambda x: x["score"], reverse=True)

    if not best_role:
        best_role = "General Software Intern"
        best_missing_skills = []

    return best_role, best_missing_skills, role_fit, role_details