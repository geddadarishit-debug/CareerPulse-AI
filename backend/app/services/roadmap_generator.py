def generate_learning_roadmap(
    missing_skills: list[str],
    best_role: str
) -> list[str]:
    roadmap = [
        f"🎯 Strategic Goal: Become job-ready for {best_role}",
        f"📚 Phase 1: Close skill gaps in {', '.join(missing_skills[:3])}",
        "🛠️ Phase 2: Build 2-3 portfolio projects",
        "🚀 Phase 3: Deploy projects and update resume",
        "🎯 Phase 4: Prepare for interviews and start applying"
    ]
    return roadmap


def generate_weekly_learning_plan(best_role: str, missing_skills: list[str]) -> dict:
    skills = missing_skills[:4]

    week_1 = []
    week_2 = []
    week_3 = []
    week_4 = []

    if len(skills) >= 1:
        week_1.append(f"Complete {skills[0]} tutorial/course")
        week_1.append(f"Solve 5-10 practice problems with {skills[0]}")
    else:
        week_1.append("Deepen existing skills with advanced exercises")
        week_1.append("Add 1 new feature to an existing project")

    if len(skills) >= 2:
        week_2.append(f"Learn {skills[1]} basics")
        week_2.append(f"Build 2 small practice components/features with {skills[1]}")
    else:
        week_2.append("Learn REST API design patterns")
        week_2.append("Practice database normalization and SQL joins")

    week_3.append("Start building a portfolio project")
    week_3.append(f"Plan project architecture for {best_role}")

    week_4.append("Finish and test the portfolio project")
    week_4.append("Deploy project to Vercel/Railway/Heroku")
    week_4.append("Update resume with project details and metrics")

    return {
        "week_1": week_1,
        "week_2": week_2,
        "week_3": week_3,
        "week_4": week_4
    }

