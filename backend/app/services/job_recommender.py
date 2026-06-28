def recommend_jobs(role_details: dict) -> list[dict]:
    recommendations = []

    for role, details in role_details.items():
        matched = details["matched"]
        missing = details["missing"]
        match_score = details["score"]

        why = []
        if matched:
            why.append(f"You already have {len(matched)} relevant skills for {role}")
        if missing:
            why.append(f"To improve fit, focus on: {', '.join(missing[:3])}")

        recommendations.append({
            "role": role,
            "match_score": match_score,
            "why": why,
            "priority_skills": missing[:3]
        })

    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    return recommendations

