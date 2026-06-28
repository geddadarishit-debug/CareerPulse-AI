import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  FiTrendingUp,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiCompass,
  FiBookOpen,
  FiAlertTriangle,
  FiCheckSquare,
  FiShield,
  FiCalendar,
  FiArrowRight,
  FiInfo,
} from 'react-icons/fi';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CareerScore from '../components/CareerScore';
import SkillChip from '../components/SkillChip';
import RoleCard from '../components/RoleCard';
import ProjectCard from '../components/ProjectCard';
import JobCard from '../components/JobCard';
import SummaryCard from '../components/SummaryCard';
import { analysisAPI } from '../api';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

const COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B'];

const Analysis = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePlanTab, setActivePlanTab] = useState('week_1');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await analysisAPI.getById(id);
          setAnalysis(data);
        } else {
          const history = await analysisAPI.getHistory();
          if (history.length > 0) {
            const data = await analysisAPI.getById(history[0].id);
            setAnalysis(data);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.detail || 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader fullScreen />;

  if (!analysis) {
    return (
      <EmptyState
        icon={FiTarget}
        title="No Analysis Found"
        description="Upload a resume and run an analysis to see your results."
        action={
          <Link
            to="/upload"
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium text-white"
          >
            Upload Resume
          </Link>
        }
      />
    );
  }

  const chartData = (analysis.role_matches || []).slice(0, 5).map((role, i) => ({
    name: role.role,
    value: role.match_percentage,
  }));

  const skillsFound = analysis.skills_found || [];
  const missingSkills = analysis.missing_skills || [];
  const risingSkills = analysis.rising_skills || [];
  const deadSkills = analysis.dead_skills || [];

  // Declining technology descriptions from backend logic representation
  const DECLINING_SKILLS_MAP = {
    "jquery": "Modern frontend stacks have largely moved to React / Next.js ecosystems.",
    "php": "Still used, but demand is weaker for many product roles compared to modern backend stacks.",
    "jsp": "Rare in modern startup and product engineering stacks.",
    "manual testing": "Many teams now expect at least some automation/testing tool familiarity."
  };

  return (
    <div className="space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Career Analysis</h1>
        <p className="text-muted-text">Your personalized AI-powered career insights.</p>
      </motion.div>

      {/* Career Score and Role distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 flex flex-col items-center justify-center"
        >
          <CareerScore score={analysis.career_score || 0} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-6">Role Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#F8FAFC'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Skills found and missing skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FiCheckCircle className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Skills Found</h3>
              <p className="text-sm text-muted-text">{skillsFound.length} detected in your resume</p>
            </div>
          </div>
          {skillsFound.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skillsFound.map((skill, i) => (
                <SkillChip key={i} skill={skill} type="found" />
              ))}
            </div>
          ) : (
            <p className="text-muted-text text-sm">
              No known skills were detected. Try adding technologies like Python, React, or SQL to your resume.
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-danger/20 flex items-center justify-center">
              <FiAlertCircle className="text-danger text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Missing Skills</h3>
              <p className="text-sm text-muted-text">{missingSkills.length} gaps for your top role match</p>
            </div>
          </div>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {missingSkills.map((skill, i) => (
                <SkillChip key={i} skill={skill} type="missing" />
              ))}
            </div>
          ) : (
            <p className="text-muted-text text-sm">
              Great news — no major skill gaps found for your best-matching role!
            </p>
          )}
        </motion.div>
      </div>

      {/* Dead/Declining Skills and Rising Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {risingSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <FiTrendingUp className="text-accent text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Trending Skills to Learn</h3>
                <p className="text-sm text-muted-text">High-demand skills you should prioritize</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {risingSkills.map((skill, i) => (
                <SkillChip key={i} skill={skill} type="trending" />
              ))}
            </div>
          </motion.div>
        )}

        {deadSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6 border border-warning/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <FiAlertTriangle className="text-warning text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Declining Skills Found</h3>
                <p className="text-sm text-muted-text">Technologies with decreasing market demand</p>
              </div>
            </div>
            <div className="space-y-3">
              {deadSkills.map((skill, i) => (
                <div key={i} className="p-3 bg-background/50 rounded-xl flex items-start gap-2.5">
                  <span className="px-2 py-0.5 bg-warning/20 text-warning text-xs font-semibold rounded mt-0.5">
                    {skill}
                  </span>
                  <p className="text-sm text-muted-text">
                    {DECLINING_SKILLS_MAP[skill.toLowerCase()] || "Industry standards are shifting towards modern frameworks."}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Career Time Machine */}
      {analysis.career_time_machine && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FiClock className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Career Time Machine</h3>
              <p className="text-sm text-muted-text">Estimated projections based on current score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-background rounded-2xl border border-border relative">
              <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded">Current</div>
              <span className="text-xs text-muted-text font-medium uppercase tracking-wider block mb-1">Current Stage</span>
              <p className="font-semibold text-text">{analysis.career_time_machine.current_stage}</p>
            </div>

            <div className="p-5 bg-background rounded-2xl border border-border relative">
              <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 bg-secondary/10 text-secondary rounded">+6 Months</div>
              <span className="text-xs text-muted-text font-medium uppercase tracking-wider block mb-1">6-Month Projection</span>
              <p className="font-semibold text-text">{analysis.career_time_machine.after_6_months || analysis.career_time_machine.after_6}</p>
            </div>

            <div className="p-5 bg-background rounded-2xl border border-border relative">
              <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 bg-accent/10 text-accent rounded">+1 Year</div>
              <span className="text-xs text-muted-text font-medium uppercase tracking-wider block mb-1">1-Year Projection</span>
              <p className="font-semibold text-text">{analysis.career_time_machine.after_1_year || analysis.career_time_machine.after_1}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-background rounded-2xl border border-border">
              <h4 className="font-bold flex items-center gap-2 mb-4 text-warning">
                <FiShield /> Risk Factors
              </h4>
              <ul className="space-y-2.5">
                {(analysis.career_time_machine.risk_factors || []).map((risk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-background rounded-2xl border border-border">
              <h4 className="font-bold flex items-center gap-2 mb-4 text-success">
                <FiCheckSquare /> Priority Next Steps
              </h4>
              <ul className="space-y-2.5">
                {(analysis.career_time_machine.priority_next_steps || []).map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-text">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Roadmap & Weekly learning plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Smart Roadmap */}
        {analysis.roadmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="glass rounded-2xl p-6 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <FiCompass className="text-secondary text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Smart Roadmap</h3>
                <p className="text-sm text-muted-text">Strategic phases to employment</p>
              </div>
            </div>

            <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {analysis.roadmap.map((phase, i) => (
                <div key={i} className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div className="p-3 bg-background rounded-xl border border-border flex-1">
                    <p className="text-sm font-medium text-text">{phase}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Weekly Tactical Plan */}
        {analysis.weekly_learning_plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <FiBookOpen className="text-accent text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Weekly Learning Plan</h3>
                  <p className="text-sm text-muted-text">Tactical schedule for upskilling</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1.5 bg-background p-1 rounded-xl border border-border">
                {Object.keys(analysis.weekly_learning_plan).map((week) => (
                  <button
                    key={week}
                    onClick={() => setActivePlanTab(week)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activePlanTab === week
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'text-muted-text hover:text-text'
                    }`}
                  >
                    {week.replace('_', ' ').replace('w', 'W')}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-background rounded-2xl border border-border min-h-[180px]">
              <h4 className="font-bold text-lg mb-4 capitalize flex items-center gap-2">
                <FiCalendar className="text-primary" />
                {activePlanTab.replace('_', ' ')}
              </h4>
              <div className="space-y-3">
                {(analysis.weekly_learning_plan[activePlanTab] || []).map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface/50 rounded-xl border border-border/50">
                    <input
                      type="checkbox"
                      id={`task-${activePlanTab}-${i}`}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary bg-background"
                    />
                    <label
                      htmlFor={`task-${activePlanTab}-${i}`}
                      className="text-sm font-medium text-text cursor-pointer select-none flex-1"
                    >
                      {task}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interview Prep Plan */}
      {analysis.interview_plan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <FiCheckSquare className="text-success text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Interview Preparation Plan</h3>
              <p className="text-sm text-muted-text">Topics and tasks to prepare for technical screenings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.interview_plan.map((prepItem, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background rounded-xl border border-border">
                <input
                  type="checkbox"
                  id={`prep-${i}`}
                  className="w-5 h-5 rounded border-border text-success focus:ring-success bg-background mt-0.5 shrink-0"
                />
                <label
                  htmlFor={`prep-${i}`}
                  className="text-sm font-medium text-muted-text hover:text-text cursor-pointer select-none"
                >
                  {prepItem}
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Role Matches */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FiTarget className="text-primary" /> Top Role Matches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(analysis.role_matches || []).slice(0, 4).map((role, i) => (
            <RoleCard
              key={i}
              role={role.role}
              match={role.match_percentage}
              description={role.description || 'Great fit for your skills!'}
            />
          ))}
        </div>
      </motion.div>

      {/* Recommended Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FiCompass className="text-accent" /> Recommended Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(analysis.recommended_projects || []).map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              description={project.description}
              difficulty={project.difficulty}
              techStack={project.tech_stack}
              estimatedTime={project.estimated_time}
            />
          ))}
        </div>
      </motion.div>

      {/* Job Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FiTrendingUp className="text-success" /> Job Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(analysis.job_recommendations || []).map((job, i) => (
            <JobCard
              key={i}
              title={job.title}
              company={job.company}
              match={job.match_percentage}
              reason={job.reason}
              skills={job.skills_required}
              priority={job.priority}
            />
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <SummaryCard
          summary={
            analysis.ai_summary ||
            'Your resume shows strong technical skills in modern web development. With a few targeted projects and skill enhancements, you\'ll be well-positioned for senior roles.'
          }
        />
      </motion.div>
    </div>
  );
};

export default Analysis;
