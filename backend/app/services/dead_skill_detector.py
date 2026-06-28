DECLINING_SKILLS = {
    "Jquery": "Modern frontend stacks have largely moved to React / Next.js ecosystems.",
    "Php": "Still used, but demand is weaker for many student-facing product roles compared to modern backend stacks.",
    "Jsp": "Rare in modern startup and product engineering stacks.",
    "Manual Testing": "Many teams now expect at least some automation/testing tool familiarity."
}

RISING_SKILLS = {
    "Fastapi": "Strong demand in Python backend + AI tooling projects.",
    "Docker": "Important for deployment and backend engineering.",
    "Pandas": "Very useful for analytics, ML, and AI data pipelines.",
    "Prompt Engineering": "Increasingly relevant for AI product roles.",
    "LLM": "Growing importance in AI application development.",
    "Vector Databases": "Relevant for retrieval and AI assistant products."
}


def detect_dead_and_rising_skills(skills_found: list[str]):
    dead_skills = []
    rising_skills = []

    for skill in skills_found:
        if skill in DECLINING_SKILLS:
            dead_skills.append(skill)

    # Suggest rising skills not already present
    for skill in RISING_SKILLS.keys():
        if skill not in skills_found:
            rising_skills.append(skill)

    return dead_skills, rising_skills[:5]