import type { AvailabilityStatus, Candidate, SeniorityLevel } from "../types/models.ts";

function normalizeSkill(skill: string): string {
  const normalizedSkill = skill.trim().toLowerCase();
  return normalizedSkill === "nodejs" ? "node.js" : normalizedSkill;
}

export function filterCandidatesBySkills(
  candidates: Candidate[],
  requiredSkills: string[],
): Candidate[] {
  const normalizedRequiredSkills = requiredSkills.map(normalizeSkill);

  return candidates.filter((candidate) => {
    const candidateSkills = new Set(candidate.skills.map(normalizeSkill));
    return normalizedRequiredSkills.every((skill) => candidateSkills.has(skill));
  });
}

export function filterCandidatesBySeniority(
  candidates: Candidate[],
  seniority: SeniorityLevel,
): Candidate[] {
  return candidates.filter((candidate) => candidate.seniority === seniority);
}

export function filterCandidatesByAvailability(
  candidates: Candidate[],
  availability: AvailabilityStatus[],
): Candidate[] {
  return candidates.filter((candidate) => availability.includes(candidate.availability));
}

export function sortCandidatesBySalary(
  candidates: Candidate[],
  order: "asc" | "desc",
): Candidate[] {
  const sortedCandidates = [...candidates];
  const direction = order === "asc" ? 1 : -1;

  return sortedCandidates.sort(
    (first, second) => (first.expectedSalary - second.expectedSalary) * direction,
  );
}

export function sortCandidatesByExperience(
  candidates: Candidate[],
  order: "asc" | "desc",
): Candidate[] {
  const sortedCandidates = [...candidates];
  const direction = order === "asc" ? 1 : -1;

  return sortedCandidates.sort(
    (first, second) => (first.yearsOfExperience - second.yearsOfExperience) * direction,
  );
}
