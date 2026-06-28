def recommend_projects(best_role: str, missing_skills: list[str], skills_found: list[str]) -> list[dict]:
    role = best_role.lower()
    projects = []

    if "full stack" in role:
        projects = [
            {
                "title": "Build a full-stack job tracker app",
                "why": "Perfect for demonstrating full-stack skills and role fit",
                "skills_covered": ["React", "FastAPI", "SQL", "Git"] + missing_skills[:3],
                "difficulty": "Intermediate",
                "duration_weeks": 4
            },
            {
                "title": "Build a hostel/room booking platform",
                "why": "Great for showing real-world application of authentication and database integration",
                "skills_covered": ["React", "Node.js", "MongoDB", "Authentication"],
                "difficulty": "Intermediate",
                "duration_weeks": 5
            },
            {
                "title": "Build a resume analyzer dashboard",
                "why": "Meta project that aligns perfectly with CareerPulse AI's purpose",
                "skills_covered": ["React", "FastAPI", "File Upload", "API Integration"],
                "difficulty": "Advanced",
                "duration_weeks": 6
            }
        ]
    elif "backend" in role:
        projects = [
            {
                "title": "Build a REST API for a task manager",
                "why": "Excellent for demonstrating REST API design and database skills",
                "skills_covered": ["FastAPI", "SQLAlchemy", "SQL", "APIs"] + missing_skills[:2],
                "difficulty": "Beginner",
                "duration_weeks": 2
            },
            {
                "title": "Build an authentication system",
                "why": "Critical skill for backend development",
                "skills_covered": ["JWT", "Role-Based Access", "FastAPI", "Security"],
                "difficulty": "Intermediate",
                "duration_weeks": 3
            },
            {
                "title": "Build a file upload + analysis backend",
                "why": "Shows async processing and real-world data handling",
                "skills_covered": ["FastAPI", "Async Processing", "File Handling", "APIs"],
                "difficulty": "Advanced",
                "duration_weeks": 4
            }
        ]
    elif "ai engineer" in role:
        projects = [
            {
                "title": "Build an AI resume analyzer",
                "why": "Directly relevant to your career interest",
                "skills_covered": ["Python", "Machine Learning", "Pandas", "NumPy"] + missing_skills[:2],
                "difficulty": "Intermediate",
                "duration_weeks": 5
            },
            {
                "title": "Build a chatbot with LLM integration",
                "why": "Demonstrates modern AI skills and API integration",
                "skills_covered": ["Prompt Engineering", "LLM", "Python", "APIs"],
                "difficulty": "Intermediate",
                "duration_weeks": 4
            },
            {
                "title": "Build a job-role recommendation engine",
                "why": "Uses your existing skills and adds a data science component",
                "skills_covered": ["Python", "Pandas", "Recommendation Systems", "SQL"],
                "difficulty": "Advanced",
                "duration_weeks": 6
            }
        ]
    elif "data analyst" in role:
        projects = [
            {
                "title": "Build a sales dashboard",
                "why": "Perfect for demonstrating data analysis and visualization skills",
                "skills_covered": ["Excel", "Power BI", "Python", "Pandas"] + missing_skills[:2],
                "difficulty": "Beginner",
                "duration_weeks": 3
            },
            {
                "title": "Analyze resume/job datasets and create insights",
                "why": "Directly relevant to CareerPulse AI's domain",
                "skills_covered": ["SQL", "Pandas", "Data Analysis", "Visualization"],
                "difficulty": "Intermediate",
                "duration_weeks": 4
            },
            {
                "title": "Build a candidate scoring analytics dashboard",
                "why": "Shows end-to-end data pipeline skills",
                "skills_covered": ["Python", "Power BI", "SQL", "Statistics"],
                "difficulty": "Advanced",
                "duration_weeks": 5
            }
        ]
    else:
        projects = [
            {
                "title": "Build a project solving a real student problem",
                "why": "Shows initiative and problem-solving skills",
                "skills_covered": skills_found[:3] + missing_skills[:2],
                "difficulty": "Beginner",
                "duration_weeks": 3
            },
            {
                "title": "Build a project using your missing skills",
                "why": "Directly addresses your skill gaps",
                "skills_covered": missing_skills[:3],
                "difficulty": "Intermediate",
                "duration_weeks": 4
            },
            {
                "title": "Deploy a project publicly and document it",
                "why": "Shows deployment and communication skills",
                "skills_covered": ["Git", "GitHub", "Deployment", "Documentation"],
                "difficulty": "Intermediate",
                "duration_weeks": 2
            }
        ]

    return projects

