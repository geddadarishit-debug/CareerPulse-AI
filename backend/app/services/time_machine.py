def generate_career_time_machine(
    career_score: int,
    best_role: str,
    missing_skills: list[str]
):
    if career_score >= 80:
        current_stage = "Strong internship-ready candidate"
        after_6 = f"Competitive for {best_role} roles if projects/interview prep continue."
        after_1 = f"Well-positioned for full-time entry-level {best_role} opportunities."
    elif career_score >= 60:
        current_stage = "Promising but skill-gap still present"
        after_6 = f"Can become internship-ready for {best_role} with focused upskilling."
        after_1 = f"Could be a solid candidate for {best_role} if missing skills are closed."
    else:
        current_stage = "Early-stage candidate"
        after_6 = f"Needs structured learning and projects before becoming ready for {best_role} roles."
        after_1 = f"Can reach entry-level readiness with disciplined project-building and skill improvement."

    return {
        "current_stage": current_stage,
        "after_6_months": after_6,
        "after_1_year": after_1,
        "risk_factors": [
            "Missing market-relevant skills",
            "Insufficient project depth" if career_score < 80 else "Needs stronger interview preparation"
        ],
        "priority_next_steps": [
            f"Close these skill gaps: {', '.join(missing_skills[:4])}" if missing_skills else "Deepen real-world projects",
            "Build 2 strong portfolio projects",
            "Practice interview/DSA consistently"
        ]
    }