# Progreso del proyecto

**Actualizado:** 2026-10-23.

## Estado actual del desarrollo

- El primer caso de uso implementado es la landing pública de Nexova. Su alcance, usuarios y criterios de aceptación están en [spec.md](../specs/001-website-nexova/spec.md); el trabajo se organiza en [plan.md](../specs/001-website-nexova/plan.md) y [tasks.md](../specs/001-website-nexova/tasks.md).
- Las fases 1 a 3 están completadas: base ejecutable, contenido y diseño responsive, navegación, SEO, Schema.org y comprobaciones de accesibilidad y privacidad. La fase 4 sigue pendiente según [tasks.md](../specs/001-website-nexova/tasks.md).
- La landing está en [index.html](../uis/website/index.html), con Tailwind compilado desde [styles.css](../uis/website/styles.css) y navegación móvil en [navigation.js](../uis/website/navigation.js). La instalación y ejecución local están documentadas en [README.es.md de la web](../uis/website/README.es.md).
- Incidencia de visualización reproducida y resuelta en Codespaces el 2026-10-23: el artefacto `uis/website/assets/styles.css` no existía inicialmente y fue regenerado con `npm run build`. También se reprodujo que servir desde la raíz del monorepo muestra un índice de directorio y devuelve 404 para los recursos de la landing. Sirviendo desde `uis/website/`, `/`, CSS, JavaScript, fotografía y fuente devolvieron HTTP 200. El servidor de comprobación se detuvo al terminar la prueba.
- El contenido y el marcado `Organization` siguen [BRIEFING.md](../uis/website/BRIEFING.md), con el diseño de [DESIGN.md](../uis/website/docs/DESIGN.md) y las correcciones de auditoría de [AGENTS.md](../AGENTS.md): fundación en 2011, 15 años de experiencia y copyright 2026.
- El formulario es una entrega independiente: [application.html](../uis/website/application.html) y [validation.js](../uis/website/validation.js) siguen vacíos. El CTA prepara su destino, pero el recorrido de registro y CA-02 no se consideran completados. La publicación final está aplazada, como recoge [plan.md](../specs/001-website-nexova/plan.md).
- El contexto general se mantiene en [projectbrief.md](./projectbrief.md) y [techContext.md](./techContext.md). FastAPI sigue siendo una propuesta, no una API implementada; la organización general del monorepo se describe en [README.es.md](../README.es.md).

## Validaciones realizadas

Los resultados y sus límites están documentados en [README.es.md de la web](../uis/website/README.es.md):

- Instalación mediante `npm ci`, compilación y servidor `npx` comprobados. La auditoría de dependencias reportó cero vulnerabilidades conocidas en la comprobación documentada del 2026-10-22; no es una garantía permanente. El modo `watch` está configurado, pero su recompilación automática no se ha verificado.
- Tras la incidencia del 2026-10-23, `npm run build` regeneró `assets/styles.css` (12.982 bytes); `node --check navigation.js` terminó correctamente. Con el servidor iniciado en `uis/website/`, `/` (12.444 bytes), `/assets/styles.css`, `/assets/team.webp`, `/assets/team-small.webp`, `/assets/inter-latin-variable.woff2` y `/navigation.js` respondieron HTTP 200. Se verificó que `/` entrega el título Nexova y enlaza el CSS y JavaScript esperados. Estas comprobaciones no prueban la visualización en el navegador del usuario ni sustituyen la auditoría de rendimiento.
- Contenido y navegación revisados a 375px, 768px y 1440px; teclado, foco, menú y alternativa sin JavaScript comprobados. El JSON-LD se comparó estructuralmente con el briefing.
- Axe-core 4.14.0 sin infracciones detectadas en los estados revisados de móvil y escritorio, complementado con recorrido de teclado. Zoom nativo al 200% y redistribución a 320 CSS px comprobados sin desbordamientos ni solapamientos detectados.
- Las visitas revisadas no capturaron datos ni generaron peticiones automáticas a terceros o almacenamiento del navegador. Esto no certifica seguridad ni conformidad completa con WCAG; no se ha probado con un lector de pantalla real ni con un validador externo de Schema.org.

## Limitaciones actuales

- Pendientes la URL pública temporal de Codespaces, PageSpeed Insights o Lighthouse, la captura con rendimiento mínimo de 80 y el cierre de la matriz de aceptación: [fase 4 de tasks.md](../specs/001-website-nexova/tasks.md). No hay todavía una puntuación de rendimiento verificada.
- En el intento documentado del 2026-10-23, PageSpeed Insights respondió HTTP 429 por cuota agotada. Lighthouse 13.5.0 no obtuvo un informe: Chromium no arrancó; la inspección del entorno identificó la dependencia de sistema `libglib-2.0.so.0` ausente. No se instaló software del sistema y no existe puntuación ni captura de rendimiento válida. Consultar [README.es.md de la web](../uis/website/README.es.md) y [matriz de aceptación](../uis/website/docs/acceptance.md).
- La integración del formulario permanece bloqueada por su entrega independiente. La referencia al mercado latinoamericano sigue pendiente de aclaración; no se deben inventar sedes ni publicar direcciones exactas sin confirmar, según [AGENTS.md](../AGENTS.md).
- El stack confirmado se limita a la web estática. Persistencia, IA, autenticación, observabilidad, CI/CD y despliegue de producción siguen por definir; véase [techContext.md](./techContext.md).
- HubSpot, Zendesk legacy, ATS interno y Google Workspace son sistemas existentes, no integraciones implementadas por este proyecto. Tampoco hay una plataforma integrada de evaluación o métricas de producto confirmada; contexto en [CONTEXT.es.md](../CONTEXT.es.md).
- Antes de procesar datos de candidatos, empleados, clientes o tickets se deben definir acceso, privacidad, retención y tratamiento. La landing actual no resuelve esas políticas: [restricciones de techContext.md](./techContext.md).
- El contexto de soporte describe 48 horas de resolución media frente a un SLA de 24 horas; esa necesidad operativa sigue fuera del alcance de la landing: [CONTEXT.es.md](../CONTEXT.es.md).

## Próximos pasos sugeridos

1. Completar únicamente cuando se solicite la fase 4 de [tasks.md](../specs/001-website-nexova/tasks.md), documentando resultados reales y requisitos pendientes sin confundir auditoría temporal con publicación final.
2. Preparar una especificación independiente para el formulario y su envío simulado conforme a [BRIEFING.md](../uis/website/BRIEFING.md); no añadir persistencia ni envío real como parte de esa entrega.
3. Validar el recorrido landing-formulario antes de cerrar CA-02 y publicar, de acuerdo con [spec.md](../specs/001-website-nexova/spec.md) y [plan.md](../specs/001-website-nexova/plan.md).
4. Para futuros servicios y automatizaciones, acordar arquitectura y reglas de datos antes de integrar sistemas, manteniendo las decisiones pendientes de [techContext.md](./techContext.md).
