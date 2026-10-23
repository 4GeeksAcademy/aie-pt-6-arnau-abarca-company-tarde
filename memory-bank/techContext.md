# Contexto técnico

**Actualizado:** 2026-10-23.

## Stack tecnológico

### Herramientas actuales de Nexova

- **HubSpot:** CRM utilizado por el equipo comercial, con adopción inconsistente.
- **Zendesk legacy:** helpdesk existente.
- **ATS interno:** sistema de seguimiento de candidatos construido a medida a principios de la década de 2010.
- **Google Workspace:** incluye herramientas como Drive, Forms, hojas de cálculo y correo, usadas para conectar procesos que hoy son mayormente manuales.

Estas herramientas forman el entorno actual de la empresa descrito en [CONTEXT.es.md](../CONTEXT.es.md); no son integraciones implementadas por el proyecto.

### Stack del proyecto

El monorepo contiene la landing estática y una página independiente de registro de talento, sin backend. La landing está definida en [spec.md](../specs/001-website-nexova/spec.md); el formulario y su validación local simulada en [spec.md de la entrega 002](../specs/002-talent-form-nexova/spec.md). Las tareas interactivas de aceptación del formulario 4.2–4.9 siguen pendientes; no hay despliegue de producción confirmado.

| Componente de la web  | Implementación y fuente                                                                                                                                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Documento público     | HTML5 semántico en español, metadatos y JSON-LD `Organization`: [index.html](../uis/website/index.html).                                                                                                                                                                                       |
| Estilos               | Tailwind CSS y CLI 4.3.0, sin framework de frontend; entrada con importación, fuente local y tokens en [styles.css](../uis/website/styles.css). Versiones y scripts en [package.json](../uis/website/package.json).                                                                            |
| Navegación            | JavaScript nativo con menú no modal, teclado, estado ARIA, cambios de breakpoint y alternativa sin JavaScript: [navigation.js](../uis/website/navigation.js) e [index.html](../uis/website/index.html).                                                                                        |
| Formulario de talento | HTML en `application.html` y validación/envío simulado en `validation.js`; no transmitir ni persistir datos. La evidencia y las pruebas pendientes están en [matriz del formulario](../uis/website/docs/talent-form-acceptance.md) y [tasks.md 002](../specs/002-talent-form-nexova/tasks.md). |
| Entorno local         | Node.js >=22, npm y `http-server` 14.1.1. Dependencias directas fijadas en [package.json](../uis/website/package.json) y resolución reproducible en [package-lock.json](../uis/website/package-lock.json).                                                                                     |
| Recursos              | Fotografías WebP responsive, Inter variable e iconos Lucide servidos localmente; procedencia y licencias en [README.es.md](../uis/website/README.es.md).                                                                                                                                       |

La entrada Tailwind genera `assets/styles.css` minificado, excluido de Git junto con las dependencias locales mediante [.gitignore del componente](../uis/website/.gitignore). El HTML sí enlaza ese CSS generado; debe compilarse después de instalar. Las decisiones del componente y sus archivos están descritos en [plan.md](../specs/001-website-nexova/plan.md).

**Incidencia operativa confirmada (2026-10-23):** el CSS generado puede no estar presente tras un checkout o una limpieza porque está ignorado por Git. La landing se visualiza sin sus estilos hasta ejecutar `npm run build`. Además, iniciar `http-server` desde la raíz del monorepo sirve el contenido equivocado: `/` puede mostrar un índice y las rutas relativas de la landing responden 404. Ejecutar y servir desde `uis/website/`; el diagnóstico debe comprobar el directorio, no inferir que el build o el servidor son correctos por una respuesta 200 en `/`.

Existe además metadata para el paquete privado `@repo/shared-types` en [package.json del paquete compartido](../packages/shared/package.json); no implica un runner de workspace en la raíz. La guía [README.es.md](../README.es.md) recomienda **FastAPI** para una API centralizada, pero esa API no está implementada. La elección de HTML estático solo confirma el frontend de la landing; no decide el stack de futuras interfaces, base de datos, modelos de IA, autenticación o despliegue.

### Ejecución y verificaciones de la web

Desde `uis/website/`, los comandos documentados y comprobados son:

```bash
npm ci
npm run build
npx http-server . -a 0.0.0.0 -p 8080
```

El script `watch` está configurado, pero no se ha comprobado su recompilación automática. Si el puerto está ocupado, usar otro; no servir la raíz del monorepo ni hacer público el puerto sin revisar el contenido expuesto. La ejecución local no constituye una publicación final. Instrucciones y resultados en [README.es.md](../uis/website/README.es.md).

Las comprobaciones se realizaron con Playwright/Chromium y axe-core 4.14.0 como herramientas temporales fuera del proyecto, no como dependencias ni suite de tests versionada. Incluyen responsive, teclado, contraste, JSON-LD comparado con el briefing, zoom nativo al 200%, redistribución a 320 CSS px y revisión de red y almacenamiento. Sus resultados y limitaciones están en [README.es.md](../uis/website/README.es.md); no equivalen a certificación WCAG o de seguridad. PageSpeed Insights/Lighthouse y las evidencias de rendimiento siguen pendientes en [tasks.md](../specs/001-website-nexova/tasks.md).

## Decisiones y pautas de arquitectura

- Mantener los entregables organizados en el monorepo por responsabilidad: `uis/` para interfaces, `services/` para APIs y workers, `data/` para datasets y pipelines, `agents/` para agentes, `skills/` y `mcps/` para capacidades e integraciones, `workflows/` para orquestación, y `packages/` o `shared/` para código reutilizable.
- Como punto de partida, preferir una API centralizada en FastAPI antes que dividir el backend en microservicios. Extraer workers separados solo cuando exista una necesidad concreta.
- Para datos, la estructura prevista es `raw` → `pipelines` → `process`; los resultados pueden ser consumidos por servicios, interfaces o agentes. `data/eval/` se reserva para conjuntos de evaluación y medición de calidad.
- Documentar cada aplicación, servicio, agente o pipeline en su propia subcarpeta, incluyendo su propósito, tecnología y forma de ejecución.
- Las herramientas actuales de Nexova deberán tratarse como sistemas existentes a integrar o sustituir según se definan los casos de uso; el método de integración todavía no está especificado.

Estas pautas generales describen la arquitectura recomendada por [README.es.md](../README.es.md), no servicios ya desplegados. Para la web, aplicar además el alcance de [spec.md](../specs/001-website-nexova/spec.md), las decisiones de [plan.md](../specs/001-website-nexova/plan.md) y las salvaguardas de [AGENTS.md](../AGENTS.md).

Antes de considerar correcto el servidor, validar al menos `/`, `/assets/styles.css` y `/navigation.js`, además de los recursos locales que carga la página. Confirmar que la respuesta raíz contiene el HTML de Nexova y que cada recurso devuelve 200 con contenido no vacío; una página de índice de directorio no es una validación correcta. En Codespaces, abrir el puerto reenviado de ese mismo servidor y considerar caché/consola si las comprobaciones HTTP locales pasan pero el navegador no muestra la landing.

## Restricciones técnicas y aspectos pendientes

- No asumir plataforma integrada, telemetría centralizada o despliegue automatizado. Las herramientas corporativas y el SLA de soporte de 24 horas pertenecen al entorno descrito en [CONTEXT.es.md](../CONTEXT.es.md), no a capacidades de la landing.
- La web no incorpora persistencia, autenticación, analítica ni integración con HubSpot, Zendesk, ATS o Google Workspace. Esos protocolos y APIs siguen por definir; véanse [spec.md](../specs/001-website-nexova/spec.md) y [CONTEXT.es.md](../CONTEXT.es.md).
- El formulario está implementado, pero las pruebas manuales 4.2–4.9 no están completadas. No inferir comportamiento del navegador a partir de inspección estática ni marcar tareas sin observar sus escenarios.
- La publicación final de la landing sigue condicionada por sus tareas de rendimiento de fase 4: [plan.md](../specs/001-website-nexova/plan.md) y [tasks.md](../specs/001-website-nexova/tasks.md); esta condición es independiente del formulario.
- Los datos de candidatos, empleados, clientes y tickets pueden ser sensibles. Antes de procesarlos hay que definir acceso, privacidad, retención y tratamiento; las comprobaciones de una landing sin captura no resuelven esas políticas. Salvaguardas en [AGENTS.md](../AGENTS.md).
- Siguen pendientes las decisiones generales de persistencia, colas, proveedor de IA, autenticación/autorización, observabilidad, CI/CD, despliegue y futuras interfaces. No extender el stack de la landing al resto del sistema sin una decisión documentada; alcance general en [projectbrief.md](./projectbrief.md).
