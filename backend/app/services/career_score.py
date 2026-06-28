def calculate_career_score(
    skills_found: list[str],
    missing_skills: list[str],
    resume_text: str
) -> int:
    score = 40

    # Skill count boost
    score += min(len(skills_found) * 4, 30)

    # Missing skills penalty
    score -= min(len(missing_skills) * 3, 20)

    # Resume length quality heuristic
    word_count = len(resume_text.split())
    if word_count > 250:
        score += 10
    elif word_count > 120:
        score += 5

    # Bonus if project-related keywords exist
    bonus_keywords = ["project", "internship", "experience", "github", "certification"]
    bonus = sum(1 for kw in bonus_keywords if kw.lower() in resume_text.lower())
    score += min(bonus * 2, 10)

    return max(0, min(score, 100))