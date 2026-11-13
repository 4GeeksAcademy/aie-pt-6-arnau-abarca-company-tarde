# Automatizaciones

Utilidades TypeScript para modelar y procesar candidatos, vacantes y procesos de selección de Nexova, conforme a la especificación `003-candidate-processing`.

## Estructura

- `types/models.ts`: interfaces y tipos enumerados del dominio.
- `utils/collections.ts`: filtros y ordenamientos de candidatos.
- `utils/search.ts`: búsquedas lineales y búsqueda binaria por salario.
- `utils/transformations.ts`: scoring, ranking, agrupaciones y agregaciones.
- `utils/validations.ts`: validaciones de candidatos, vacantes y email.

Los módulos exportan sus modelos y funciones por nombre. Este paquete no tiene `package.json`, scripts, `tsconfig` ni runner de pruebas configurados; por eso todavía no hay un comando propio de build, typecheck o tests.
