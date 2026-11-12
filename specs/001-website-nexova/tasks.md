# Tareas: Landing Page de Nexova

**Referencias:** [spec.md](./spec.md) y [plan.md](./plan.md), incluidos sus documentos de contexto.
**Alcance:** Solo la landing. Los checkboxes indican las tareas completadas; las demás siguen pendientes.

Marcar cada fase cuando sus tareas y comprobaciones estén completas. Ejecutarlas en orden; los metadatos de la fase 3 pueden prepararse durante la fase 2. Preservar los cambios existentes y las fuentes de referencia.

- [x] **Fase 1: Preparar la base ejecutable** (RNF-01, RNF-05).
  - [x] Revisar instrucciones y estado de Git; configurar en `uis/website/` Tailwind compilado y servidor estático con dependencias fijadas, lockfile y exclusiones mínimas necesarias.
  - [x] Crear la entrada Tailwind, scripts `build` y `watch`, y documentar instalación y ejecución mediante `npx` en el README del componente.
  - [x] Comprobar `npm ci`, `npm run build` y `npx http-server . -a 0.0.0.0 -p 8080` desde el componente; usar otro puerto si está ocupado y verificar la carga del HTML y CSS.

- [x] **Fase 2: Construir contenido y presentación** (RF-01 a RF-07, RF-09, RF-10; RNF-01, RNF-02).
  - [x] Implementar `index.html` semántico en español: header, hero, servicios, ventajas, contacto y footer; conservar textos del briefing, 15 años de experiencia, copyright 2026 y garantía limitada a headhunting.
  - [x] Aplicar Tailwind mobile-first y fotografía optimizada con permiso de uso; resolver tamaños tipográficos y contrastes del diseño. Usar tres columnas para servicios y dos para ventajas en escritorio, una en móvil; no publicar direcciones sin confirmar ni garantía genérica, ni ampliar la referencia pendiente al mercado latinoamericano.
  - [x] Añadir anclas, enlaces de contacto y redes; dirigir «Talento» y CTA a `application.html`. Implementar menú móvil accesible solo si es necesario, sin tocar el formulario ni `validation.js`.
  - [x] Comprobar contenido y navegación a 375px, 768px y 1440px, sin solapamientos ni desbordamientos; registrar el recorrido de registro como pendiente hasta disponer del formulario.

- [x] **Fase 3: Completar SEO y accesibilidad** (RF-08; RNF-03, RNF-04, RNF-07).
  - [x] Añadir título, metadescripción y JSON-LD `Organization` con los datos del briefing; comprobar su sintaxis y coherencia sin sustituir el dominio corporativo por Codespaces.
  - [x] Revisar encabezados, alternativas de imágenes, enlace de salto, teclado, foco, menú, ARIA y contrastes WCAG 2.2 AA; complementar la revisión manual con auditoría automática.
  - [x] Comprobar zoom al 200%, redistribución a 320 CSS px y ausencia de captura de datos, trackers, secretos y datos personales reales.

- [ ] **Fase 4: Auditar y documentar la entrega** (RNF-05, RNF-06; CA-01 a CA-09 del plan).
  - [x] Compilar y servir una copia temporal limitada de la landing; revisar HTTP y recursos locales. No se sirvió la raíz del monorepo. La auditoría de consola de navegador sigue pendiente.
  - [ ] Obtener rendimiento mínimo de 80, objetivo superior a 90, con PageSpeed Insights o Lighthouse si Codespaces no es accesible; guardar captura, herramienta, fecha, URL, modalidad y resultados reales. PageSpeed Insights devolvió HTTP 429; Lighthouse no pudo iniciar Chromium porque falta `libglib-2.0.so.0`. No hay puntuación ni captura. Repetir cuando la cuota o el entorno estén disponibles.
  - [x] Documentar resultados y límites reales en [README.es.md](../../uis/website/README.es.md) y [la matriz CA-01–CA-09](../../uis/website/docs/acceptance.md); revisar el diff y ejecutar `git diff --check`. La fase sigue abierta solo por la puntuación de rendimiento y su captura, y por la revisión de consola pendiente.

**Dependencia de publicación:** mantener pendiente CA-02 y posponer la publicación final hasta que el formulario se entregue por separado y se valide el recorrido. Una exposición temporal para auditoría no es un lanzamiento.

**Fuera de alcance:** formulario, página provisional, validaciones de candidatos, backend, persistencia, integraciones, analítica y segundo idioma.
