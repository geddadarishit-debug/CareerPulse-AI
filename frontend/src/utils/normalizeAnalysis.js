const DIFFICULTY_MAP = {
  beginner: 'easy',
  intermediate: 'medium',
  advanced: 'hard',
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

function normalizeDifficulty(difficulty) {
  if (!difficulty) return 'medium';
  return DIFFICULTY_MAP[String(difficulty).toLowerCase()] || 'medium';
}

function parseSkillList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value.trim() ? [value] : [];
    }
  }
  return [];
}

function normalizeSkills(data) {
  return {
    skills_found: parseSkillList(data.skills_found),
    missing_skills: parseSkillList(data.missing_skills),
    rising_skills: parseSkillList(data.rising_skills),
    dead_skills: parseSkillList(data.dead_skills),
  };
}
function normalizeRoleMatches(data) {
  if (data.role_matches?.length) return data.role_matches;

  return (data.role_fit || []).map((role) => ({
    role: role.role,
    match_percentage: role.match_percentage ?? role.score ?? 0,
    description: role.description || 'Strong fit based on your current skills.',
  }));
}

function normalizeProjects(data) {
  if (data.recommended_projects?.length) return data.recommended_projects;

  return (data.project_recommendations || []).map((project) => ({
    title: project.title,
    description: project.description ?? project.why ?? '',
    difficulty: normalizeDifficulty(project.difficulty),
    tech_stack: project.tech_stack ?? project.skills_covered ?? [],
    estimated_time:
      project.estimated_time ??
      (project.duration_weeks ? `${project.duration_weeks} weeks` : 'N/A'),
  }));
}

function normalizeJobs(data) {
  const jobs = data.job_recommendations || [];
  if (!jobs.length) return [];

  if (jobs[0]?.title) return jobs;

  return jobs.map((job) => ({
    title: job.title ?? job.role ?? 'Recommended Role',
    company: job.company ?? 'Career Match',
    match_percentage: job.match_percentage ?? job.match_score ?? 0,
    reason:
      job.reason ??
      (Array.isArray(job.why) ? job.why.join(' ') : job.why ?? ''),
    skills_required: job.skills_required ?? job.priority_skills ?? [],
    priority:
      job.priority ??
      (job.match_score >= 70 ? 'high' : job.match_score >= 50 ? 'medium' : 'low'),
  }));
}

export function normalizeAnalysis(data) {
  if (!data) return null;

  const skills = normalizeSkills(data);

  return {
    ...data,
    id: data.id,
    career_score:
      data.career_score ?? data.career_score_breakdown?.overall_score ?? 0,
    role_matches: normalizeRoleMatches(data),
    recommended_projects: normalizeProjects(data),
    job_recommendations: normalizeJobs(data),
    ai_summary: data.ai_summary ?? data.career_summary ?? '',
    ...skills,
  };
}
