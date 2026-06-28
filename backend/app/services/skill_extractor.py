import re

KNOWN_SKILLS = [
    "python", "java", "c", "c++", "javascript", "typescript",
    "html", "css", "react", "next.js", "node.js", "express",
    "fastapi", "django", "flask", "sql", "postgresql", "mysql",
    "mongodb", "firebase", "git", "github", "docker", "kubernetes",
    "machine learning", "deep learning", "tensorflow", "pytorch",
    "scikit-learn", "pandas", "numpy", "power bi", "excel",
    "data analysis", "nlp", "llm", "prompt engineering", "api",
    "rest api", "oop", "dbms", "os", "computer networks",
    "jquery", "php", "jsp", "manual testing", "vector databases"
]


def extract_skills_from_text(text: str) -> list[str]:
    text_lower = text.lower()
    found = []

    for skill in KNOWN_SKILLS:
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"
        if re.search(pattern, text_lower):
            found.append(skill.title())

    return sorted(list(set(found)))