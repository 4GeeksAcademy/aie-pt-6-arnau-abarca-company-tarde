# Contexto técnico

## Stack tecnológico

### Herramientas actuales de Nexova

- **HubSpot:** CRM utilizado por el equipo comercial, con adopción inconsistente.
- **Zendesk legacy:** helpdesk existente.
- **ATS interno:** sistema de seguimiento de candidatos construido a medida a principios de la década de 2010.
- **Google Workspace:** incluye herramientas como Drive, Forms, hojas de cálculo y correo, usadas para conectar procesos que hoy son mayormente manuales.

Estas herramientas forman el entorno actual de la empresa; no consta que estén integradas de manera adecuada.

### Stack del proyecto

El repositorio aún es una plantilla de carpetas y documentación, sin aplicaciones ejecutables ni un stack de producción establecido. Hay metadata para el paquete privado `@repo/shared-types`, que expone tipos TypeScript; no hay un runner de workspace configurado en la raíz.

La guía del repositorio recomienda **FastAPI** para una API centralizada, pero no hay una API implementada que confirme esa elección. El framework de frontend, la base de datos, el proveedor de modelos de IA, la infraestructura de despliegue y los mecanismos de autenticación están por decidir.

## Decisiones y pautas de arquitectura

- Mantener los entregables organizados en el monorepo por responsabilidad: `uis/` para interfaces, `services/` para APIs y workers, `data/` para datasets y pipelines, `agents/` para agentes, `skills/` y `mcps/` para capacidades e integraciones, `workflows/` para orquestación, y `packages/` o `shared/` para código reutilizable.
- Como punto de partida, preferir una API centralizada en FastAPI antes que dividir el backend en microservicios. Extraer workers separados solo cuando exista una necesidad concreta.
- Para datos, la estructura prevista es `raw` → `pipelines` → `process`; los resultados pueden ser consumidos por servicios, interfaces o agentes. `data/eval/` se reserva para conjuntos de evaluación y medición de calidad.
- Documentar cada aplicación, servicio, agente o pipeline en su propia subcarpeta, incluyendo su propósito, tecnología y forma de ejecución.
- Las herramientas actuales de Nexova deberán tratarse como sistemas existentes a integrar o sustituir según se definan los casos de uso; el método de integración todavía no está especificado.

Estas pautas describen la arquitectura recomendada por la plantilla, no componentes ya desplegados.

## Restricciones técnicas y aspectos pendientes

- No asumir que existe una plataforma integrada, telemetría centralizada o despliegue automatizado: el contexto de Nexova indica que hoy no dispone de ellos.
- El soporte externalizado tiene un SLA comprometido de 24 horas; las soluciones de soporte deben diseñarse teniendo en cuenta ese objetivo operativo.
- Los datos de candidatos, empleados, clientes y tickets pueden contener información personal o sensible. Antes de procesarlos, deben definirse y documentarse las reglas de acceso, privacidad, retención y tratamiento de datos; la plantilla no fija todavía esas políticas.
- No están especificados los protocolos ni las APIs de integración de HubSpot, Zendesk, el ATS o Google Workspace.
- Siguen pendientes las decisiones sobre frontend, persistencia, colas, proveedor de IA, autenticación/autorización, observabilidad, CI/CD y despliegue.
