import {
  filterCandidatesByAvailability,
  filterCandidatesBySeniority,
  filterCandidatesBySkills,
  sortCandidatesByExperience,
  sortCandidatesBySalary,
} from "./utils/collections.ts";
import {
  binarySearchCandidateBySalary,
  findCandidateByEmail,
  findCandidateById,
} from "./utils/search.ts";
import {
  calculateAverageSalary,
  calculateCandidateScore,
  calculateVacancyFillRate,
  countCandidatesByStatus,
  findTopSkills,
  groupCandidatesBySeniority,
  rankCandidatesForVacancy,
} from "./utils/transformations.ts";
import { isValidEmail, validateCandidate, validateVacancy } from "./utils/validations.ts";
import type { Candidate, SelectionProcess, Vacancy } from "./types/models.ts";

const candidateA: Candidate = {
  id: "C-DEMO-001",
  fullName: "Alex Example",
  email: "alex@example.test",
  phone: "+10000000001",
  yearsOfExperience: 8,
  skills: ["TypeScript", "React", "NodeJS", "PostgreSQL", "Docker"],
  englishLevel: "C1",
  seniority: "Senior",
  currentSalary: 6000,
  expectedSalary: 7000,
  availability: "Immediate",
  location: "Remote",
  remoteOnly: true,
  status: "Active",
};

const candidateB: Candidate = {
  id: "C-DEMO-002",
  fullName: "Sam Example",
  email: "sam@example.test",
  phone: "+10000000002",
  yearsOfExperience: 4,
  skills: ["typescript", "React", "Node.js", "PostgreSQL"],
  englishLevel: "B2",
  seniority: "Semi-Senior",
  currentSalary: 5200,
  expectedSalary: 6500,
  availability: "2 weeks",
  location: "Remote",
  remoteOnly: false,
  status: "In process",
};

const candidateC: Candidate = {
  id: "C-DEMO-003",
  fullName: "Taylor Example",
  email: "taylor@example.test",
  phone: "+10000000003",
  yearsOfExperience: 2,
  skills: ["JavaScript", "React", "CSS"],
  englishLevel: "B1",
  seniority: "Junior",
  currentSalary: 2800,
  expectedSalary: 3500,
  availability: "1 month",
  location: "Remote",
  remoteOnly: true,
  status: "Active",
};

const sampleCandidates = [candidateA, candidateB, candidateC];

const sampleVacancy: Vacancy = {
  id: "V-DEMO-001",
  title: "Senior Full-Stack Developer",
  companyName: "Example Tech",
  requiredSkills: ["TypeScript", "React", "Node.js"],
  preferredSkills: ["PostgreSQL", "Docker"],
  minYearsExperience: 4,
  maxYearsExperience: 8,
  requiredEnglishLevel: "B2",
  requiredSeniority: "Senior",
  salaryRangeMin: 5000,
  salaryRangeMax: 7000,
  isRemote: true,
  location: "Remote",
  status: "Open",
};

const sampleProcesses: SelectionProcess[] = [
  {
    id: "SP-DEMO-001",
    candidateId: candidateA.id,
    vacancyId: sampleVacancy.id,
    stage: "Hired",
    score: 100,
    notes: "",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-02T00:00:00Z"),
  },
  {
    id: "SP-DEMO-002",
    candidateId: candidateB.id,
    vacancyId: sampleVacancy.id,
    stage: "Interview",
    score: 92,
    notes: "",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-02T00:00:00Z"),
  },
  {
    id: "SP-DEMO-003",
    candidateId: candidateC.id,
    vacancyId: sampleVacancy.id,
    stage: "Rejected",
    score: 20,
    notes: "",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    updatedAt: new Date("2026-01-02T00:00:00Z"),
  },
];

console.log("Colecciones");
console.log("Habilidades requeridas:", filterCandidatesBySkills(sampleCandidates, sampleVacancy.requiredSkills).map(({ id }) => id));
console.log("Seniority Senior:", filterCandidatesBySeniority(sampleCandidates, "Senior").map(({ id }) => id));
console.log("Disponibles en 2 semanas:", filterCandidatesByAvailability(sampleCandidates, ["2 weeks"]).map(({ id }) => id));
console.log("Salario ascendente:", sortCandidatesBySalary(sampleCandidates, "asc").map(({ expectedSalary }) => expectedSalary));
console.log("Experiencia descendente:", sortCandidatesByExperience(sampleCandidates, "desc").map(({ yearsOfExperience }) => yearsOfExperience));

console.log("\nBúsquedas");
console.log("Por ID:", findCandidateById(sampleCandidates, candidateB.id)?.fullName ?? null);
console.log("Por email (case-insensitive):", findCandidateByEmail(sampleCandidates, "SAM@EXAMPLE.TEST")?.id ?? null);
const salarySortedCandidates = sortCandidatesBySalary(sampleCandidates, "asc");
console.log("Índice de salario 6500:", binarySearchCandidateBySalary(salarySortedCandidates, 6500));

console.log("\nScoring y reportes");
console.log("Score de Alex:", calculateCandidateScore(candidateA, sampleVacancy));
console.log("Ranking:", rankCandidatesForVacancy(sampleCandidates, sampleVacancy).map(({ candidate, score }) => ({ id: candidate.id, score })));
console.log("Grupos por seniority:", Object.fromEntries(Object.entries(groupCandidatesBySeniority(sampleCandidates)).map(([level, candidates]) => [level, candidates.map(({ id }) => id)])));
console.log("Conteos por estado:", countCandidatesByStatus(sampleCandidates));
console.log("Salario esperado promedio:", calculateAverageSalary(sampleCandidates));
console.log("Top habilidades:", findTopSkills(sampleCandidates, 5));
console.log("Tasa de contratación:", calculateVacancyFillRate(sampleProcesses));

console.log("\nValidaciones");
console.log("Candidato válido:", validateCandidate(candidateA));
console.log("Vacante válida:", validateVacancy(sampleVacancy));
console.log("Email válido:", isValidEmail(candidateA.email));
