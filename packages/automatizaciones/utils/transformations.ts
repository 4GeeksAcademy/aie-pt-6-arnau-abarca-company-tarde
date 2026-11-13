import type {
  Candidate,
  CandidateStatus,
  SelectionProcess,
  SeniorityLevel,
  Vacancy,
} from "../types/models.ts";

function normalizeSkill(skill: string): string {
  const normalizedSkill = skill.trim().toLowerCase();
  return normalizedSkill === "nodejs" ? "node.js" : normalizedSkill;
}

function calculateSkillCategoryScore(candidate: Candidate, vacancy: Vacancy): number {
  const requiredSkills = new Set(vacancy.requiredSkills.map(normalizeSkill));
  const candidateSkills = new Set(candidate.skills.map(normalizeSkill));
  const matchedRequiredSkills = [...requiredSkills].filter((skill) => candidateSkills.has(skill));

  let score = 0;
  if (matchedRequiredSkills.length === requiredSkills.size) {
    score += 40;
  }
  if (matchedRequiredSkills.length / requiredSkills.size >= 0.5) {
    score += 20;
  }

  const preferredSkillMatches = new Set(
    vacancy.preferredSkills
      .map(normalizeSkill)
      .filter((skill) => candidateSkills.has(skill)),
  );
  score += Math.min(preferredSkillMatches.size * 10, 20);

  return Math.min(score, 40);
}

function calculateExperienceScore(candidate: Candidate, vacancy: Vacancy): number {
  if (
    candidate.yearsOfExperience >= vacancy.minYearsExperience
    && candidate.yearsOfExperience <= vacancy.maxYearsExperience
  ) {
    return 20;
  }

  const yearsOutsideRange = candidate.yearsOfExperience < vacancy.minYearsExperience
    ? vacancy.minYearsExperience - candidate.yearsOfExperience
    : candidate.yearsOfExperience - vacancy.maxYearsExperience;

  return yearsOutsideRange <= 2 ? 10 : 0;
}

function calculateSeniorityScore(candidate: Candidate, vacancy: Vacancy): number {
  const seniorityLevels = ["Junior", "Semi-Senior", "Senior", "Lead", "Executive"];
  const candidateLevel = seniorityLevels.indexOf(candidate.seniority);
  const requiredLevel = seniorityLevels.indexOf(vacancy.requiredSeniority);
  const levelDifference = Math.abs(candidateLevel - requiredLevel);

  if (levelDifference === 0) {
    return 15;
  }

  return levelDifference === 1 ? 7 : 0;
}

function calculateEnglishScore(candidate: Candidate, vacancy: Vacancy): number {
  const englishLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];
  const candidateLevel = englishLevels.indexOf(candidate.englishLevel);
  const requiredLevel = englishLevels.indexOf(vacancy.requiredEnglishLevel);

  return candidateLevel >= requiredLevel ? 15 : 0;
}

function calculateSalaryScore(candidate: Candidate, vacancy: Vacancy): number {
  if (candidate.expectedSalary <= vacancy.salaryRangeMax) {
    return 10;
  }

  if (candidate.expectedSalary <= vacancy.salaryRangeMax * 1.2) {
    return 5;
  }

  return 0;
}

export function calculateCandidateScore(candidate: Candidate, vacancy: Vacancy): number {
  const score = calculateSkillCategoryScore(candidate, vacancy)
    + calculateExperienceScore(candidate, vacancy)
    + calculateSeniorityScore(candidate, vacancy)
    + calculateEnglishScore(candidate, vacancy)
    + calculateSalaryScore(candidate, vacancy);

  return Math.min(score, 100);
}

export function rankCandidatesForVacancy(
  candidates: Candidate[],
  vacancy: Vacancy,
): Array<{ candidate: Candidate; score: number }> {
  return candidates
    .map((candidate) => ({ candidate, score: calculateCandidateScore(candidate, vacancy) }))
    .sort((first, second) => second.score - first.score);
}

export function groupCandidatesBySeniority(
  candidates: Candidate[],
): Record<SeniorityLevel, Candidate[]> {
  const groupedCandidates: Record<SeniorityLevel, Candidate[]> = {
    Junior: [],
    "Semi-Senior": [],
    Senior: [],
    Lead: [],
    Executive: [],
  };

  for (const candidate of candidates) {
    groupedCandidates[candidate.seniority].push(candidate);
  }

  return groupedCandidates;
}

export function countCandidatesByStatus(
  candidates: Candidate[],
): Record<CandidateStatus, number> {
  const counts: Record<CandidateStatus, number> = {
    Active: 0,
    "In process": 0,
    Hired: 0,
    Inactive: 0,
  };

  for (const candidate of candidates) {
    counts[candidate.status] += 1;
  }

  return counts;
}

export function calculateAverageSalary(candidates: Candidate[]): number {
  if (candidates.length === 0) {
    return 0;
  }

  const totalExpectedSalary = candidates.reduce(
    (total, candidate) => total + candidate.expectedSalary,
    0,
  );
  return Math.round((totalExpectedSalary / candidates.length) * 100) / 100;
}

export function findTopSkills(
  candidates: Candidate[],
  topN: number,
): Array<{ skill: string; count: number }> {
  if (topN <= 0 || candidates.length === 0) {
    return [];
  }

  const skillCounts = new Map<string, { skill: string; count: number }>();

  for (const candidate of candidates) {
    const candidateSkills = new Map<string, string>();
    for (const skill of candidate.skills) {
      const normalizedSkill = normalizeSkill(skill);
      if (!candidateSkills.has(normalizedSkill)) {
        candidateSkills.set(
          normalizedSkill,
          normalizedSkill === "node.js" ? "Node.js" : skill.trim(),
        );
      }
    }

    for (const [normalizedSkill, displaySkill] of candidateSkills) {
      const entry = skillCounts.get(normalizedSkill);
      if (entry) {
        entry.count += 1;
      } else {
        skillCounts.set(normalizedSkill, { skill: displaySkill, count: 1 });
      }
    }
  }

  return [...skillCounts.entries()]
    .sort(([firstSkill, first], [secondSkill, second]) => {
      if (first.count !== second.count) {
        return second.count - first.count;
      }
      return firstSkill < secondSkill ? -1 : firstSkill > secondSkill ? 1 : 0;
    })
    .slice(0, topN)
    .map(([, entry]) => entry);
}

export function calculateVacancyFillRate(processes: SelectionProcess[]): number {
  if (processes.length === 0) {
    return 0;
  }

  const hiredProcesses = processes.filter((process) => process.stage === "Hired").length;
  return Math.round((hiredProcesses / processes.length) * 100 * 100) / 100;
}
