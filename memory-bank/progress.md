# Progreso del proyecto

## Estado actual del desarrollo

- El repositorio está en fase de preparación: contiene la estructura base del monorepo, guías y documentación de contexto para Nexova.
- Se han documentado el brief del proyecto y el contexto técnico en `memory-bank/`.
- No hay aplicaciones o servicios ejecutables del proyecto implementados todavía. Existe metadata para el paquete TypeScript `@repo/shared-types`, pero no un runner de workspace en la raíz.
- La arquitectura propuesta por la guía incluye una API centralizada en FastAPI y una organización por responsabilidades; aún no está confirmada mediante una implementación.

## Limitaciones actuales

- No se ha seleccionado ni implementado un stack completo para frontend, persistencia, IA, autenticación, observabilidad, CI/CD o despliegue.
- Las herramientas actuales de Nexova (HubSpot, Zendesk legacy, ATS interno y Google Workspace) no tienen integraciones documentadas para este proyecto.
- No están definidas las políticas de acceso, privacidad, retención y tratamiento de los datos personales que pueden aparecer en candidatos, empleados, clientes y tickets.
- No existen todavía datos de evaluación ni métricas de producto que permitan medir la calidad de agentes, automatizaciones o pipelines.
- El soporte al cliente tiene un SLA comprometido de 24 horas, mientras que el tiempo medio de resolución indicado en el contexto es de 48 horas.

## Próximos pasos sugeridos

1. Elegir un caso de uso inicial y sus usuarios, alcance y criterios de aceptación. Conviene priorizar un proceso con impacto operativo claro, como reducir el tiempo de resolución de soporte o agilizar el cribado de candidatos.
2. Acordar las decisiones técnicas mínimas para ese caso: API, interfaz, almacenamiento, integraciones, autenticación y despliegue, documentando las decisiones en `docs/`.
3. Definir el origen, los permisos y las reglas de tratamiento de los datos necesarios; preparar datos de prueba que no expongan información personal real.
4. Implementar un primer flujo vertical en las carpetas correspondientes del monorepo, siguiendo la guía de arquitectura y documentando cómo ejecutarlo.
5. Crear evaluaciones y métricas para validar el resultado con usuarios; añadir observabilidad antes de ampliar el alcance o automatizar decisiones sensibles.
