import type { Candidate, Vacancy } from "../types/models.ts";

function hasBasicEmailFormat(email: unknown): boolean {
  return typeof email === "string"
    && /^[^\s@]+@(?:[^\s@.]+\.)+[^\s@.]+$/.test(email);
}

export function isValidEmail(email: string): boolean {
  return hasBasicEmailFormat(email);
}

export function validateCandidate(candidate: Candidate): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (
    !Number.isFinite(candidate.yearsOfExperience)
    || candidate.yearsOfExperience < 0
    || candidate.yearsOfExperience > 50
  ) {
    errors.push("Los años de experiencia deben estar entre 0 y 50.");
  }

  if (!Number.isFinite(candidate.currentSalary) || candidate.currentSalary <= 0) {
    errors.push("El salario actual debe ser mayor que 0.");
  }

  if (!Number.isFinite(candidate.expectedSalary) || candidate.expectedSalary <= 0) {
    errors.push("El salario esperado debe ser mayor que 0.");
  }

  if (
    !Array.isArray(candidate.skills)
    || !candidate.skills.some((skill) => typeof skill === "string" && skill.trim().length > 0)
  ) {
    errors.push("El candidato debe tener al menos una habilidad.");
  }

  if (!isValidEmail(candidate.email)) {
    errors.push("El email no tiene un formato básico válido.");
  }

  if (typeof candidate.phone !== "string" || candidate.phone.trim().length === 0) {
    errors.push("El teléfono no debe estar vacío.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateVacancy(vacancy: Vacancy): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (
    !Array.isArray(vacancy.requiredSkills)
    || !vacancy.requiredSkills.some((skill) => typeof skill === "string" && skill.trim().length > 0)
  ) {
    errors.push("La vacante debe tener al menos una habilidad requerida.");
  }

  if (!Number.isFinite(vacancy.minYearsExperience) || vacancy.minYearsExperience < 0) {
    errors.push("La experiencia mínima no puede ser menor que 0.");
  }

  if (
    !Number.isFinite(vacancy.maxYearsExperience)
    || vacancy.maxYearsExperience < vacancy.minYearsExperience
  ) {
    errors.push("La experiencia máxima no puede ser menor que la mínima.");
  }

  if (!Number.isFinite(vacancy.salaryRangeMin) || vacancy.salaryRangeMin <= 0) {
    errors.push("El salario mínimo debe ser mayor que 0.");
  }

  if (
    !Number.isFinite(vacancy.salaryRangeMax)
    || vacancy.salaryRangeMax <= 0
    || vacancy.salaryRangeMax < vacancy.salaryRangeMin
  ) {
    errors.push("El salario máximo debe ser positivo y no menor que el mínimo.");
  }

  return { valid: errors.length === 0, errors };
}
