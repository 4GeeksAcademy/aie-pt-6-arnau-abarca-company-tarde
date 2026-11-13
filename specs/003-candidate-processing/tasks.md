# Tareas: Utilidades de Procesamiento de Candidatos

**Funcionalidad:** [003-candidate-processing](./spec.md)
**Plan:** [plan.md](./plan.md)
**Estado inicial:** todas las tareas pendientes; marcar una casilla solo después de completar y verificar la tarea.

## Reglas de ejecución

- Seguir las fases y dependencias en orden. Las tareas paralelizables se indican expresamente.
- Antes de modificar archivos, revisar `git status`, `git diff` y `git diff --cached`; preservar los cambios preexistentes.
- Implementar únicamente los módulos y comportamientos del spec. No añadir `package.json`, `index.ts` barrel, dependencias, runner ni archivos de tests.
- No inventar comandos de prueba o compilación: el repositorio no declara runner ni configuración TypeScript para este paquete. Usar revisión manual enfocada y documentar las comprobaciones que no puedan ejecutarse.
- No marcar tareas de verificación sin evidencia. Ante un fallo, intentar corregirlo como máximo dos veces; después, registrar el bloqueo y esperar.

## Fase 1: estructura del paquete y documentación

**Referencias:** plan, §3. **Cobertura:** RNF-04 y CA-05.

- [ ] **1.1 — Crear la estructura de carpetas.** Crear `packages/automatizaciones/types/` y `packages/automatizaciones/utils/` sin añadir archivos de configuración de paquete.
- [ ] **1.2 — Documentar el paquete.** Crear `packages/automatizaciones/README.es.md` con su propósito, el mapa de módulos previsto y la ausencia de runner/typecheck configurado. No documentar funcionalidades que no estén en el spec.

## Fase 2: modelos y tipos del dominio

**Dependencia:** fase 1. **Referencias:** spec, RF-01; plan, §4. **Cobertura:** CA-01, CA-05 y CA-06.

- [ ] **2.1 — Definir tipos enumerados.** En `packages/automatizaciones/types/models.ts`, exportar `EnglishLevel`, `SeniorityLevel`, `AvailabilityStatus`, `CandidateStatus`, `VacancyStatus` y `ProcessStage` como tipos con exactamente los literales del spec.
- [ ] **2.2 — Definir `Candidate`.** Exportar la interfaz con todos los campos, tipos y obligatoriedad indicados en RF-01.
- [ ] **2.3 — Definir `Vacancy` y `SelectionProcess`.** Exportar ambas interfaces con todos los campos y tipos indicados en RF-01; conservar `Date` para las fechas del proceso y el tipo de etapa definido.
- [ ] **2.4 — Contrastar los modelos.** Revisar cada propiedad y literal de `models.ts` frente a RF-01 y corregir cualquier omisión o diferencia antes de continuar.

## Fase 3: operaciones de colecciones y búsqueda

**Dependencia:** fase 2. **Referencias:** spec, RF-02 y RF-03; plan, §5. Las tareas 3.1–3.3 y 3.4–3.5 pueden hacerse en paralelo.

- [ ] **3.1 — Filtrar por habilidades.** En `packages/automatizaciones/utils/collections.ts`, exportar `filterCandidatesBySkills`; exigir todas las habilidades requeridas y comparar ignorando mayúsculas y espacios externos. Contar duplicados una sola vez y reconocer `Node.js`/`NodeJS` como el mismo alias.
- [ ] **3.2 — Filtrar por seniority y disponibilidad.** Exportar `filterCandidatesBySeniority` y `filterCandidatesByAvailability` con las reglas de RF-02, sin modificar la lista de entrada.
- [ ] **3.3 — Ordenar sin mutar.** Exportar `sortCandidatesBySalary` y `sortCandidatesByExperience` para ambos órdenes (`asc` y `desc`). Confirmar que devuelven los candidatos ordenados y mantienen intacta la lista original.
- [ ] **3.4 — Buscar por ID y email.** En `packages/automatizaciones/utils/search.ts`, exportar `findCandidateById` y `findCandidateByEmail` mediante búsqueda lineal. La comparación de email debe ignorar mayúsculas; no encontrar coincidencia debe devolver `null`.
- [ ] **3.5 — Buscar por salario.** Exportar `binarySearchCandidateBySalary` con búsqueda binaria sobre salarios esperados ascendentes; devolver índice coincidente o `-1`, permitiendo cualquier índice válido si hay duplicados.

## Fase 4: scoring, ranking y agregaciones

**Dependencia:** fase 2. **Referencias:** spec, RF-04–RF-06; plan, §6.2. Las tareas 4.1–4.4 se completan en orden; 4.5 depende de ellas. Las tareas independientes de agrupación y agregación (4.6–4.9) pueden desarrollarse en paralelo con el scoring.

- [ ] **4.1 — Puntuar habilidades.** Implementar la categoría de habilidades de `calculateCandidateScore` en `packages/automatizaciones/utils/transformations.ts`: sumar los puntos aplicables por requeridas y preferidas, deduplicar habilidades por candidato, aplicar alias acordados y limitar la categoría a 40.
- [ ] **4.2 — Puntuar experiencia.** Aplicar 20 puntos dentro del rango inclusivo, 10 puntos a 1–2 años del límite más cercano y 0 a más de 2 años.
- [ ] **4.3 — Puntuar seniority e inglés.** Usar los órdenes declarados en el spec: seniority exacto 15, adyacente 7, otro 0; inglés requerido o superior 15, inferior 0.
- [ ] **4.4 — Puntuar salario y consolidar score.** Aplicar 10 puntos por expectativa bajo el mínimo o dentro del rango, 5 hasta 20 % sobre el máximo y 0 por encima de ese umbral. Sumar categorías y asegurar que la puntuación final se mantiene entre 0 y 100.
- [ ] **4.5 — Rankear candidatos.** Exportar `rankCandidatesForVacancy`; calcular el score de cada candidato y ordenar de mayor a menor, sin introducir reglas de desempate.
- [ ] **4.6 — Agrupar por seniority.** Exportar `groupCandidatesBySeniority` con las claves y grupos definidos en RF-05.
- [ ] **4.7 — Calcular conteos y promedio.** Exportar `countCandidatesByStatus` con conteos por estado y `calculateAverageSalary` con redondeo a dos decimales; el promedio de lista vacía debe ser 0.
- [ ] **4.8 — Encontrar habilidades frecuentes.** Exportar `findTopSkills`; contar cada habilidad una vez por candidato, consolidar `Node.js`/`NodeJS` bajo `Node.js`, desempatar alfabéticamente por nombre normalizado y devolver `[]` para lista vacía o `topN <= 0`.
- [ ] **4.9 — Calcular tasa de contratación.** Exportar `calculateVacancyFillRate` como porcentaje de procesos en `Hired` sobre todos los procesos, redondeado a dos decimales; devolver 0 para lista vacía.

## Fase 5: validaciones

**Dependencia:** fase 2. **Referencias:** spec, RF-07; plan, §6.2. Las tareas 5.1 y 5.2 pueden desarrollarse en paralelo.

- [ ] **5.1 — Validar candidatos.** En `packages/automatizaciones/utils/validations.ts`, exportar `validateCandidate` y comprobar experiencia entre 0 y 50, salarios positivos, al menos una habilidad, email válido y teléfono no vacío. Devolver `{ valid, errors }` sin inventar mensajes literales.
- [ ] **5.2 — Validar vacantes.** Exportar `validateVacancy` y comprobar al menos una habilidad requerida, experiencia mínima no negativa, experiencia máxima no menor que la mínima y rango salarial con valores positivos y máximo no menor que mínimo.
- [ ] **5.3 — Validar email básico.** Exportar `isValidEmail`; aceptar solo si hay texto antes de `@`, dominio después y un punto en el dominio con texto a ambos lados. Mantener el alcance básico, no de producción.

## Fase 6: revisión funcional y aceptación

**Dependencia:** fases 1–5. **Referencias:** plan, §7–§10. **Cobertura:** CA-01–CA-08.

- [ ] **6.1 — Recorrer ejemplos y resultados funcionales.** Usar los candidatos y la vacante del documento de requisitos para revisar filtros, búsquedas, puntuaciones, ranking, agrupaciones, agregaciones y validaciones contra el spec.
- [ ] **6.2 — Revisar límites de scoring.** Comprobar límites inclusivos de experiencia, diferencias de 1–2 y más de 2 años; salario bajo el mínimo, dentro del rango, hasta 20 % y más de 20 % sobre el máximo; niveles exactos, adyacentes e inferiores; tope por categoría y total.
- [ ] **6.3 — Revisar casos límite de colecciones y reportes.** Comprobar listas vacías, búsquedas sin coincidencia, habilidades repetidas y diferencias de mayúsculas/espacios, alias, empates de `findTopSkills`, `topN <= 0` y salarios duplicados en búsqueda binaria.
- [ ] **6.4 — Revisar validaciones y contratos.** Comparar reglas de candidatos y vacantes, resultados de email y firmas/retornos de todas las funciones con RF-01–RF-07. No ampliar las firmas para admitir registros completos `null` ni elementos `null`.
- [ ] **6.5 — Comprobar pureza y no mutación.** Verificar que filtros y ordenamientos no mutan las entradas y que las funciones no usan estado global.
- [ ] **6.6 — Revisar tipos y disponibilidad de validación automatizada.** Comprobar si el entorno ya dispone de compilador TypeScript utilizable sin agregar configuración. Si no está disponible, registrar el typecheck como no ejecutado; no añadir runner, `tsconfig` ni dependencias.
- [ ] **6.7 — Revisar alcance y cambios finales.** Ejecutar `git diff --check`, revisar los cambios del paquete y confirmar que solo se incorporaron los archivos acordados. Preservar todos los cambios preexistentes.

## Relación de tareas con criterios de aceptación

| Criterio                                  | Tareas principales                          |
| ----------------------------------------- | ------------------------------------------- |
| CA-01 — Modelos y enums                   | 2.1–2.4                                     |
| CA-02 — Comportamiento de funciones       | 3.1–3.5, 4.1–4.9, 5.1–5.3, 6.1              |
| CA-03 — Casos vacíos, inválidos y límites | 3.1–3.5, 4.1–4.9, 5.1–5.3, 6.2–6.4          |
| CA-04 — Reglas de validación              | 5.1–5.3, 6.4                                |
| CA-05 — Organización por módulo           | 1.1–1.2, 2.1–2.3, 3.1–3.5, 4.1–4.9, 5.1–5.3 |
| CA-06 — Nombres y convenciones TypeScript | 2.1–2.3, 3.1–3.5, 4.1–4.9, 5.1–5.3, 6.4–6.6 |
| CA-07 — No mutación                       | 3.2–3.3, 6.5                                |
| CA-08 — Funciones puras                   | 3.1–3.5, 4.1–4.9, 5.1–5.3, 6.5              |
