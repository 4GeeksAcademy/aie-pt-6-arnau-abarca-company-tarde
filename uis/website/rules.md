# Reglas de la landing de Nexova

Complementan [AGENTS.md](../../AGENTS.md). Fuentes: [spec.md](../../specs/001-website-nexova/spec.md), [plan.md](../../specs/001-website-nexova/plan.md), [BRIEFING.md](./BRIEFING.md) y [DESIGN.md](./docs/DESIGN.md).

- **Alcance:** solo la landing; formulario, backend, persistencia y analítica quedan fuera. No modificar `application.html` ni `validation.js` en esta entrega.
- **Trabajo:** completar y validar cada tarea antes de iniciar la siguiente; marcarla en [tasks.md](../../specs/001-website-nexova/tasks.md). Preservar cambios existentes y no crear commits sin petición.
- **Contenido:** el briefing prevalece sobre las omisiones del diseño. Mantener español, orden de secciones y textos requeridos; fundación en 2011, 15 años de experiencia y copyright 2026.
- **Datos confirmados:** no publicar direcciones exactas sin aprobación ni extender la garantía de headhunting a otros servicios. No ampliar ni sustituir la referencia al mercado latinoamericano sin acuerdo.
- **Tecnología:** HTML semántico, Tailwind compilado y JavaScript mínimo. Sin framework, CDN de estilos ni CSS personalizado innecesario.
- **Responsive:** mobile-first; servicios en tres columnas y ventajas en dos en escritorio, una en móvil. Resolver discrepancias tipográficas y evitar desbordamientos.
- **Accesibilidad:** objetivo WCAG 2.2 AA; H1 único, encabezados jerárquicos, alternativas de imágenes, salto al contenido, teclado, foco visible y contraste comprobado. ARIA solo cuando aporte valor.
- **SEO:** idioma, título, metadescripción y JSON-LD `Organization` con los datos del briefing; conservar la URL corporativa, no sustituirla por Codespaces.
- **Recursos:** imágenes optimizadas, dimensiones estables, fuentes e iconos locales; documentar procedencia y licencias en [README.es.md](./README.es.md).
- **Privacidad:** no capturar datos, introducir secretos ni modificar contexto protegido o infraestructura sin autorización.
- **Validación:** usar los comandos del README y comprobaciones enfocadas; no añadir tests sin petición. Máximo dos intentos de corrección por fallo; después, informar y esperar.
- **Entrega:** documentar resultados reales. La fase 4 exige auditoría pública temporal, rendimiento mínimo de 80 y captura; no darla por realizada sin evidencia. Posponer la publicación final hasta integrar el formulario y validar CA-02.
