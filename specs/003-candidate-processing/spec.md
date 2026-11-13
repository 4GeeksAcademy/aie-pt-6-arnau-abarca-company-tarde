# Especificación: Utilidades de Procesamiento de Candidatos de Nexova

**Identificador:** 003-candidate-processing
**Estado:** Propuesta funcional, sin implementación
**Alcance:** Modelos y utilidades TypeScript para filtrar, buscar, puntuar, resumir y validar candidatos, vacantes y procesos de selección. No incluye IA ni prompting.

## 1. Qué debe hacer

Definir contratos funcionales para utilidades TypeScript puras que procesen datos de selección de Nexova. La fuente de los requisitos y ejemplos es [domain-models-requirements.md](../../docs/domain-models-requirements.md). Esta especificación conserva su alcance e incorpora las aclaraciones acordadas en esa fuente. Las aclaraciones concretan los casos que estaban abiertos; no añaden nuevas funcionalidades.

La ubicación de los módulos de implementación queda definida así: los modelos y tipos en `packages/automatizaciones/types/models.ts`, y las operaciones en `packages/automatizaciones/utils/`. Esta organización no presupone otros archivos de paquete.

## 2. Quién usa esto

- **Consultores de selección:** necesitan encontrar, filtrar y comparar candidatos con los requisitos de una vacante.
- **Consumidores de las utilidades:** necesitan obtener candidatos ordenados, agrupaciones y métricas de los datos de selección.

Esta especificación no presupone una interfaz, API, persistencia ni integración con sistemas existentes.

## 3. Historias de usuario

- Como consultor de selección, quiero filtrar y buscar candidatos por sus datos para identificar perfiles relevantes.
- Como consultor de selección, quiero puntuar y ordenar candidatos para compararlos con una vacante.
- Como usuario de los datos de selección, quiero agrupar candidatos y consultar métricas para resumir la información disponible.
- Como consumidor de las utilidades, quiero validar los datos de candidatos y vacantes antes de procesarlos.

## 4. Requisitos funcionales

- **RF-01. Modelos de dominio:** definir en `packages/automatizaciones/types/models.ts` las interfaces `Candidate`, `Vacancy` y `SelectionProcess`, y los tipos enumerados relacionados, preservando estos campos y valores:

  | Entidad            | Campos                                                                                                                                                                                                                                                                                                                                                                     |
  | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `Candidate`        | `id: string`, `fullName: string`, `email: string`, `phone: string`, `yearsOfExperience: number`, `skills: string[]`, `englishLevel: EnglishLevel`, `seniority: SeniorityLevel`, `currentSalary: number`, `expectedSalary: number`, `availability: AvailabilityStatus`, `location: string`, `remoteOnly: boolean`, `status: CandidateStatus`                                |
  | `Vacancy`          | `id: string`, `title: string`, `companyName: string`, `requiredSkills: string[]`, `preferredSkills: string[]`, `minYearsExperience: number`, `maxYearsExperience: number`, `requiredEnglishLevel: EnglishLevel`, `requiredSeniority: SeniorityLevel`, `salaryRangeMin: number`, `salaryRangeMax: number`, `isRemote: boolean`, `location: string`, `status: VacancyStatus` |
  | `SelectionProcess` | `id: string`, `candidateId: string`, `vacancyId: string`, `stage: ProcessStage`, `score: number`, `notes: string`, `createdAt: Date`, `updatedAt: Date`                                                                                                                                                                                                                    |

  Los valores de los tipos enumerados son:

  | Tipo                 | Valores                                                                                     |
  | -------------------- | ------------------------------------------------------------------------------------------- |
  | `EnglishLevel`       | `A1`, `A2`, `B1`, `B2`, `C1`, `C2`, `Native`                                                |
  | `SeniorityLevel`     | `Junior`, `Semi-Senior`, `Senior`, `Lead`, `Executive`                                      |
  | `AvailabilityStatus` | `Immediate`, `2 weeks`, `1 month`, `Not available`                                          |
  | `CandidateStatus`    | `Active`, `In process`, `Hired`, `Inactive`                                                 |
  | `VacancyStatus`      | `Open`, `In progress`, `Closed`, `On hold`                                                  |
  | `ProcessStage`       | `Screening`, `Interview`, `Technical test`, `Final interview`, `Offer`, `Rejected`, `Hired` |

- **RF-02. Operaciones de colecciones:** definir en `packages/automatizaciones/utils/collections.ts` estas funciones y sus comportamientos:
  - `filterCandidatesBySkills(candidates: Candidate[], requiredSkills: string[]): Candidate[]`: devuelve candidatos que tienen todas las habilidades requeridas; compara sin distinguir mayúsculas.
  - `filterCandidatesBySeniority(candidates: Candidate[], seniority: SeniorityLevel): Candidate[]`: devuelve candidatos con el seniority indicado.
  - `filterCandidatesByAvailability(candidates: Candidate[], availability: AvailabilityStatus[]): Candidate[]`: devuelve candidatos cuya disponibilidad coincide con cualquiera de las indicadas.
  - `sortCandidatesBySalary(candidates: Candidate[], order: "asc" | "desc"): Candidate[]`: ordena por salario esperado según el orden indicado, sin mutar el array original.
  - `sortCandidatesByExperience(candidates: Candidate[], order: "asc" | "desc"): Candidate[]`: ordena por años de experiencia según el orden indicado, sin mutar el array original.

- **RF-03. Operaciones de búsqueda:** definir en `packages/automatizaciones/utils/search.ts`:
  - `findCandidateById(candidates: Candidate[], id: string): Candidate | null`: búsqueda lineal por ID; devuelve `null` si no hay coincidencia.
  - `findCandidateByEmail(candidates: Candidate[], email: string): Candidate | null`: búsqueda lineal por email con comparación sin distinguir mayúsculas; devuelve `null` si no hay coincidencia.
  - `binarySearchCandidateBySalary(sortedCandidates: Candidate[], targetSalary: number): number`: búsqueda binaria por salario esperado en una lista ordenada ascendentemente; devuelve el índice encontrado o `-1`. Si hay salarios repetidos, puede devolver cualquier índice coincidente.

- **RF-04. Scoring de candidato:** definir `calculateCandidateScore(candidate: Candidate, vacancy: Vacancy): number` en `packages/automatizaciones/utils/transformations.ts`. El resultado debe estar entre 0 y 100 y calcularse por categorías:

  | Categoría               | Regla y puntos                                                                                                                                                                                                                                                                                |
  | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Habilidades (máximo 40) | `+40` si tiene todas las habilidades requeridas; `+20` si tiene al menos el 50 % de las requeridas; `+10` por habilidad preferida que tenga, hasta `+20`. Se suman los puntos aplicables y el resultado de la categoría se limita a 40. Las reglas de habilidades requeridas son acumulables. |
  | Experiencia (máximo 20) | `+20` si está dentro del rango inclusivo; `+10` si queda fuera por 1 o 2 años respecto al límite más cercano; `0` si queda fuera por más de 2 años.                                                                                                                                           |
  | Seniority (máximo 15)   | `+15` por coincidencia exacta; `+7` si el candidato está un nivel por encima o por debajo; `0` en otro caso. Se usa el orden `Junior < Semi-Senior < Senior < Lead < Executive`.                                                                                                              |
  | Inglés (máximo 15)      | `+15` si el nivel del candidato cumple o supera el requerido según `A1 < A2 < B1 < B2 < C1 < C2 < Native`; `0` en otro caso.                                                                                                                                                                  |
  | Salario (máximo 10)     | `+10` si la expectativa está por debajo del mínimo o dentro del rango ofrecido; `+5` si está hasta un 20 % por encima del máximo; `0` si lo supera en más de un 20 %.                                                                                                                         |

  El total máximo resulta de sumar los máximos por categoría: 100 puntos.

- **RF-05. Ranking y agrupación:** definir en `packages/automatizaciones/utils/transformations.ts`:
  - `rankCandidatesForVacancy(candidates: Candidate[], vacancy: Vacancy): Array<{ candidate: Candidate; score: number }>`: calcula el score de cada candidato y devuelve los resultados ordenados de mayor a menor puntuación.
  - `groupCandidatesBySeniority(candidates: Candidate[]): Record<SeniorityLevel, Candidate[]>`: agrupa candidatos por nivel de seniority.

- **RF-06. Agregaciones y reportes:** definir en `packages/automatizaciones/utils/transformations.ts`:
  - `countCandidatesByStatus(candidates: Candidate[]): Record<CandidateStatus, number>`: devuelve el conteo para cada estado de candidato.
  - `calculateAverageSalary(candidates: Candidate[]): number`: calcula el promedio de salario esperado y lo redondea a dos decimales.
  - `findTopSkills(candidates: Candidate[], topN: number): Array<{ skill: string; count: number }>`: devuelve las `topN` habilidades más comunes, ordenadas por frecuencia descendente. Cada habilidad se cuenta como máximo una vez por candidato; los empates se ordenan alfabéticamente por nombre normalizado. `Node.js` y `NodeJS` se consolidan bajo la etiqueta canónica `Node.js`. Si `topN <= 0`, devuelve `[]`.
  - `calculateVacancyFillRate(processes: SelectionProcess[]): number`: calcula el porcentaje de procesos cuya etapa es `Hired` sobre el total de procesos y redondea a dos decimales.

- **RF-07. Validaciones:** definir en `packages/automatizaciones/utils/validations.ts`:
  - `validateCandidate(candidate: Candidate): { valid: boolean; errors: string[] }`: valida las reglas del modelo `Candidate` y devuelve `valid: true` solo cuando no haya errores.
  - `validateVacancy(vacancy: Vacancy): { valid: boolean; errors: string[] }`: valida las reglas del modelo `Vacancy` y devuelve `valid: true` solo cuando no haya errores.
  - `isValidEmail(email: string): boolean`: devuelve `true` si hay texto antes de `@`, un dominio después y un punto en el dominio con texto a ambos lados; es una validación básica, no de producción.

## 5. Requisitos no funcionales

- **RNF-01. Tipado:** conservar las entidades, tipos, parámetros y retornos definidos en RF-01 a RF-07.
- **RNF-02. Funciones puras:** las funciones deben operar sobre sus parámetros y no depender de variables globales.
- **RNF-03. No mutación:** las operaciones de ordenamiento no deben modificar el array de entrada. Los filtros tampoco deben modificar la colección recibida.
- **RNF-04. Organización:** mantener modelos en `packages/automatizaciones/types/models.ts` y las operaciones en los módulos indicados de `packages/automatizaciones/utils/`.

## 6. Casos límite

- Las operaciones reciben arrays vacíos sin producir errores. `calculateAverageSalary` y `calculateVacancyFillRate` devuelven `0` cuando la lista está vacía; `findTopSkills` devuelve `[]` cuando no hay candidatos o `topN <= 0`.
- Los datos de candidato y vacante se validan antes de usarse en las demás operaciones. Las firmas permanecen tipadas: no se requiere aceptar un candidato o vacante completo `null` ni elementos `null` dentro de arrays.
- La experiencia en los extremos mínimo y máximo de la vacante se considera dentro del rango; fuera de este, la distancia se mide desde el límite más cercano.
- Una expectativa salarial debajo del mínimo obtiene 10 puntos; para expectativas por encima del máximo se aplican los umbrales de 20 % de RF-04.
- La comparación de habilidades ignora mayúsculas y espacios externos; duplicados del mismo candidato no aumentan puntuaciones ni conteos. El alias acordado `NodeJS` se presenta como `Node.js` en `findTopSkills`.
- Para salarios duplicados, la búsqueda binaria devuelve cualquier índice coincidente. La especificación no establece desempate para candidatos con el mismo score en el ranking.
- El email se considera válido para esta regla básica si contiene texto antes de `@`, un dominio después y un punto en el dominio con texto a ambos lados. No es una validación de producción.

## 7. Fuera de alcance

- IA, prompting o decisiones automatizadas adicionales a las funciones de scoring deterministas descritas.
- Interfaz de usuario, API, backend, persistencia, base de datos o integraciones con ATS, CRM u otros sistemas.
- Reglas de elegibilidad por estado de candidato o vacante, filtros no enumerados, desempates del ranking, validación de `SelectionProcess` o alias de habilidades no acordados.
- Archivos de empaquetado, exportación pública, runner de pruebas o módulos adicionales no especificados en los requisitos funcionales.

## 8. Criterios de aceptación

1. `Candidate`, `Vacancy`, `SelectionProcess` y sus tipos enumerados conservan los campos, tipos y valores de RF-01.
2. Las funciones de colecciones, búsqueda, scoring, ranking, agrupación, agregaciones y validación cumplen firmas y comportamientos de RF-02 a RF-07.
3. Los casos de arrays vacíos, datos inválidos y límites descritos en la sección 6 producen los resultados especificados; las entradas conservan los contratos de tipos acordados.
4. Las reglas de validación de candidatos y vacantes se aplican según la fuente: experiencia de candidato entre 0 y 50; ambos salarios de candidato mayores que 0; al menos una habilidad; email básico válido; teléfono no vacío; al menos una habilidad requerida en vacante; experiencia mínima no negativa; máxima no menor que mínima; ambos salarios positivos y máximo no menor que mínimo.
5. El scoring usa las cinco categorías, sus pesos y topes; el score total no supera 100. Se aplican las aclaraciones de habilidades, rangos inclusivos, seniority, inglés y salario.
6. Los módulos están ubicados en `packages/automatizaciones/types/models.ts` y `packages/automatizaciones/utils/{collections,search,transformations,validations}.ts`, según responsabilidad.
7. Los nombres respetan las convenciones TypeScript y los nombres públicos definidos en la fuente.
8. Las funciones de ordenamiento y filtrado no mutan los arrays de entrada.
9. Las funciones dependen únicamente de sus parámetros y no introducen estado global.

Los candidatos y la vacante de ejemplo de [domain-models-requirements.md](../../docs/domain-models-requirements.md) sirven como datos de referencia para comprobar los comportamientos anteriores.
