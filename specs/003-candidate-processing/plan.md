# Plan de implementación: Utilidades de Procesamiento de Candidatos

**Funcionalidad:** `003-candidate-processing`
**Estado:** Propuesta; no acredita implementación ni validaciones ejecutadas.
**Alcance:** Implementar las utilidades TypeScript de `spec.md` en `packages/automatizaciones`. Sin IA, prompting, API, persistencia ni integraciones.

## 1. Referencias y convenciones

| Documento                                                                                                                                              | Uso en el plan                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [spec.md](./spec.md)                                                                                                                                   | Fuente principal de alcance: modelos, RF-01–RF-07, RNF-01–RNF-04, casos límite y criterios de aceptación. |
| [domain-models-requirements.md](../../docs/domain-models-requirements.md)                                                                              | Requisitos originales, ejemplos de candidatos/vacante y aclaraciones acordadas.                           |
| [README.es.md](../../packages/README.es.md)                                                                                                            | Convención de paquetes reutilizables y documentación de cada paquete.                                     |
| [index.ts](../../packages/shared/types/index.ts)                                                                                                       | Ejemplo local de tipos TypeScript y exports nombrados.                                                    |
| [package.json](../../packages/shared/package.json)                                                                                                     | Estado del paquete compartido y evidencia de que no declara scripts.                                      |
| [projectbrief.md](../../memory-bank/projectbrief.md), [techContext.md](../../memory-bank/techContext.md), [progress.md](../../memory-bank/progress.md) | Contexto de Nexova, stack confirmado y límites técnicos conocidos.                                        |

## 2. Estado inicial y decisiones

- `packages/automatizaciones/` aún no existe. Se creará como paquete reutilizable dentro de `packages/`.
- `packages/shared/` contiene un ejemplo de tipos exportados por nombre, pero su manifest no define scripts. No existe un runner de workspace, `tsconfig` ni runner de tests declarado en la raíz.
- La ubicación y responsabilidad de los módulos ya están fijadas por `spec.md`: modelos en `types/models.ts`; lógica en `utils/collections.ts`, `utils/search.ts`, `utils/transformations.ts` y `utils/validations.ts`.
- Se añadirá un `README.es.md` breve para documentar el paquete, de acuerdo con la convención de `packages/`. No tendrá nuevas funcionalidades.
- Se mantienen exports nombrados desde cada módulo. No se añadirán `package.json`, `index.ts` barrel, dependencias, runner ni archivos de tests.
- Se preservan las firmas tipadas del spec. Los validadores detectan campos inválidos; las demás funciones reciben registros válidos. No se promete aceptar objetos completos `null` ni elementos `null` en arrays.

## 3. Fase 1: Crear estructura y README

**Cobertura:** RNF-04 y criterios de aceptación sobre organización.

1. Crear `packages/automatizaciones/types/` y `packages/automatizaciones/utils/`.
2. Crear `packages/automatizaciones/README.es.md` con el propósito del paquete, el mapa de módulos y una nota de que no hay un comando de pruebas/typecheck configurado para este paquete.
3. No agregar configuración de publicación, scripts o dependencias.

**Salida prevista:** esqueleto documentado del paquete, sin contratos duplicados ni archivos funcionales todavía.

## 4. Fase 2: Definir modelos

**Cobertura:** RF-01, RNF-01 y primer criterio de aceptación. Bloquea las fases 3 y 4.

Crear `packages/automatizaciones/types/models.ts` con exports nombrados para:

- Interfaces `Candidate`, `Vacancy` y `SelectionProcess` con todos los campos y tipos indicados en RF-01.
- Tipos `EnglishLevel`, `SeniorityLevel`, `AvailabilityStatus`, `CandidateStatus`, `VacancyStatus` y `ProcessStage` con sus literales exactos.

**Salida prevista:** contrato común de tipos para todos los módulos de utilidades.

## 5. Fase 3: Implementar colecciones y búsquedas

Ambos módulos pueden desarrollarse en paralelo después de la fase 2.

### 5.1. Colecciones

Crear `packages/automatizaciones/utils/collections.ts` con exports nombrados para:

- `filterCandidatesBySkills`, `filterCandidatesBySeniority` y `filterCandidatesByAvailability`.
- `sortCandidatesBySalary` y `sortCandidatesByExperience`.

Respetar las firmas y los resultados de RF-02. El filtro por habilidades debe encontrar todas las requeridas, ignorar mayúsculas y espacios externos, y reconocer el alias acordado `Node.js`/`NodeJS` donde aplique. Las operaciones no deben mutar las entradas; en particular, ambos ordenamientos devolverán un array ordenado sin alterar el original.

### 5.2. Búsqueda

Crear `packages/automatizaciones/utils/search.ts` con exports nombrados para:

- `findCandidateById` y `findCandidateByEmail`, ambas mediante búsqueda lineal.
- `binarySearchCandidateBySalary`, suponiendo salarios esperados en orden ascendente.

Respetar los resultados `null` y `-1`, la comparación de email sin distinguir mayúsculas y la posibilidad de devolver cualquier índice coincidente ante salarios duplicados.

## 6. Fase 4: Implementar transformaciones y validaciones

Los dos módulos pueden desarrollarse en paralelo después de la fase 2.

### 6.1. Scoring, ranking y reportes

Crear `packages/automatizaciones/utils/transformations.ts` con exports nombrados para:

- `calculateCandidateScore`, `rankCandidatesForVacancy` y `groupCandidatesBySeniority`.
- `countCandidatesByStatus`, `calculateAverageSalary`, `findTopSkills` y `calculateVacancyFillRate`.

Aplicar las reglas de RF-04–RF-06: tope de 40 puntos para habilidades y máximos por categoría que suman 100; límites inclusivos de experiencia; niveles ordinales; reglas de salario; ranking descendente sin inventar desempates; agrupaciones y conteos; promedio y tasa redondeados a dos decimales; resultados para entradas vacías. Para `findTopSkills`, contar como máximo una vez cada habilidad por candidato, unificar `Node.js` y `NodeJS` con nombre canónico `Node.js`, desempatar alfabéticamente por nombre normalizado y devolver `[]` si `topN <= 0`.

### 6.2. Validaciones

Crear `packages/automatizaciones/utils/validations.ts` con exports nombrados para:

- `validateCandidate` con las reglas de experiencia, salarios, habilidades, email y teléfono del spec.
- `validateVacancy` con las reglas de habilidades requeridas, experiencia y rango salarial del spec.
- `isValidEmail` con la validación básica acordada, no de producción.

No añadir un validador para `SelectionProcess` ni mensajes de error literales no definidos por la fuente.

## 7. Fase 5: Revisión funcional

1. Verificar que todas las funciones públicas, parámetros, retornos y modelos coinciden con `spec.md`.
2. Recorrer manualmente los ejemplos de candidatos y vacante y los casos límite del spec: listas vacías; puntuaciones y topes; experiencia dentro, a 1–2 y a más de 2 años del rango; salario bajo/dentro/hasta 20 %/más de 20 % sobre el máximo; niveles exactos y adyacentes; habilidades duplicadas y alias; email válido e inválido; rangos inválidos.
3. Confirmar que filtros y ordenamientos no mutan las colecciones, y que las funciones no dependen de estado global.
4. Revisar la correspondencia entre validaciones y cada regla de RF-07 y la fuente de dominio.
5. Revisar `git diff --check` y el diff completo, preservando cambios preexistentes y sin incluir archivos fuera del alcance.

## 8. Validación disponible y límites

- El repositorio no declara runner de tests, `tsconfig` ni scripts de workspace para `packages/automatizaciones`. `packages/shared/package.json` contiene `scripts: {}`; sus scripts no validan este paquete.
- El plan no inventa `npm test`/build, no incorpora archivos de tests y no instala dependencias.
- La verificación prevista es una revisión manual de contratos, ejemplos y casos límite. Si durante la implementación el entorno dispone de un compilador TypeScript instalado y utilizable sin agregar configuración, se podrá comprobar el typecheck; si no, se declarará esa validación como no disponible. La inspección manual no se presentará como prueba ejecutada.

## 9. Archivos previstos

Rutas relativas a la raíz del repositorio. Esta lista describe trabajo futuro, no archivos ya creados.

| Archivo                                              | Acción prevista                                                            |
| ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `packages/automatizaciones/README.es.md`             | Documentar propósito, estructura y limitaciones de validación del paquete. |
| `packages/automatizaciones/types/models.ts`          | Definir interfaces y tipos enumerados del dominio.                         |
| `packages/automatizaciones/utils/collections.ts`     | Implementar filtros y ordenamientos.                                       |
| `packages/automatizaciones/utils/search.ts`          | Implementar búsquedas lineales y binaria.                                  |
| `packages/automatizaciones/utils/transformations.ts` | Implementar scoring, ranking, agrupaciones y reportes.                     |
| `packages/automatizaciones/utils/validations.ts`     | Implementar validaciones de candidatos, vacantes y email.                  |

## 10. Criterios de aceptación y trazabilidad

| Criterio de `spec.md`                                                  | Fase principal de cobertura |
| ---------------------------------------------------------------------- | --------------------------- |
| CA-01. Modelos y enums con campos, tipos y valores exactos.            | Fase 2                      |
| CA-02. Firmas y comportamientos funcionales de todas las utilidades.   | Fases 3 y 4                 |
| CA-03. Casos vacíos, inválidos y límites conforme a la especificación. | Fases 3, 4 y 5              |
| CA-04. Reglas de validación de candidato y vacante.                    | Fase 4.2 y revisión         |
| CA-05. Rutas y responsabilidad por módulo.                             | Fases 1–4                   |
| CA-06. Convenciones TypeScript y nombres públicos.                     | Fases 2–4                   |
| CA-07. Ordenamientos y filtros no mutantes.                            | Fase 3 y revisión           |
| CA-08. Funciones puras, sin estado global.                             | Fases 3–5                   |

## 11. Fuera de alcance

No se crearán una API, interfaz, persistencia, integraciones, IA/prompting, reglas de elegibilidad por estado, desempate del ranking, validador de procesos, alias adicionales, archivos de configuración de paquete, barrel exports, runner o suite de tests como parte de este plan.
