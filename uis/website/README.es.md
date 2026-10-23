# Web pública de Nexova

Landing corporativa estática, con HTML y Tailwind CSS compilado. La especificación y el plan están en [spec.md](../../specs/001-website-nexova/spec.md) y [plan.md](../../specs/001-website-nexova/plan.md).

## Estado

Las fases 1 a 3 están completadas: base ejecutable, contenido semántico, diseño responsive, navegación, metadatos, Schema.org y comprobaciones de accesibilidad y privacidad. El formulario y su validación pertenecen a otra entrega; no se han modificado.

El destino previsto del registro es `application.html`. La publicación final queda pendiente hasta que exista el formulario y se valide el recorrido completo. La evaluación de rendimiento y la auditoría pública de la fase 4 siguen pendientes.

## Requisitos

- Node.js 22 o superior y npm, disponibles en GitHub Codespaces.
- Ejecutar los comandos siguientes desde `uis/website/`.

## Instalación y compilación

```bash
npm ci
npm run build
```

Las versiones directas están fijadas y el lockfile permite reproducir las dependencias transitivas. `styles.css` importa Tailwind y declara `index.html` como fuente de clases. El comando genera `assets/styles.css` minificado, que no se versiona y debe regenerarse después de instalar.

Para recompilar automáticamente al cambiar HTML o estilos, ejecutar en otra terminal:

```bash
npm run watch
```

La compilación no modifica el HTML. La landing enlaza el CSS generado y utiliza sus clases utilitarias; no se utiliza Tailwind mediante CDN.

## Ejecución local

Después de compilar:

```bash
npx http-server . -a 0.0.0.0 -p 8080
```

El comando utiliza el servidor instalado localmente. Abrir `http://localhost:8080/`; si el puerto está ocupado, elegir otro, por ejemplo `-p 8081`. Detener el servidor con Ctrl+C.

En Codespaces, abrir la URL reenviada del puerto desde la pestaña Puertos. No servir la raíz del monorepo. No cambiar la visibilidad a Public en esta fase: la exposición temporal para PageSpeed Insights se realizará en la fase 4, tras revisar todos los archivos que se sirven y sin considerarla una publicación final.

## Comprobaciones de la base

- `npm ci`: comprobar instalación reproducible.
- `npm run build`: comprobar generación de CSS no vacío.
- `npm audit`: consultar vulnerabilidades conocidas de las dependencias instaladas.
- Con el servidor iniciado, comprobar HTTP 200 en `/` y `/assets/styles.css`. Esa respuesta confirma el transporte, no el cumplimiento de todos los requisitos de la landing.

Comprobado el 2026-10-22 en Codespaces con Node.js 22.23.4 y npm 10.9.9: `npm ci`, `npm run build` y el servidor `npx` en el puerto 8080 funcionaron. `npm audit` reportó cero vulnerabilidades conocidas. Ambas rutas devolvieron HTTP 200 y coincidieron con sus archivos locales: HTML de 0 bytes y CSS de 4.011 bytes. El modo `watch` está configurado, pero no se ha comprobado su recompilación automática.

## Recursos visuales y licencias

- Fotografía: [original de Unsplash](https://images.unsplash.com/photo-1521737711867-e3b97375f902), descargada el 2026-10-22 bajo la [licencia Unsplash](https://unsplash.com/license), que permite su uso y modificación, también comercial. Es una imagen ilustrativa de colaboración profesional, no una afirmación de que las personas retratadas pertenezcan a Nexova.
- Se ha recortado con encuadre central y convertido a WebP: `assets/team.webp`, 1440 × 960 y 63.266 bytes; `assets/team-small.webp`, 720 × 480 y 25.566 bytes. El navegador selecciona el recurso mediante `srcset` y `sizes`; no se descarga la fotografía desde un servicio externo durante la visita.
- Fuente Inter variable, subconjunto latino, distribuida por [Fontsource 5.2.8](https://www.npmjs.com/package/@fontsource-variable/inter/v/5.2.8). Se sirve localmente desde `assets/inter-latin-variable.woff2`, con `font-display: swap`. La licencia SIL Open Font License 1.1 se conserva en [inter-LICENSE.txt](./assets/inter-LICENSE.txt).
- Iconos de menú y cierre: [Lucide Static 0.468.0](https://www.npmjs.com/package/lucide-static/v/0.468.0), servidos localmente sin librería de ejecución. La licencia ISC se conserva en [lucide-LICENSE.txt](./assets/lucide-LICENSE.txt).

## Comprobación de diseño: fase 2, segunda tarea

El 2026-10-22 se comprobó la compilación y el diseño en Chromium mediante Playwright, con herramientas y bibliotecas temporales fuera del proyecto:

| Ancho  | Servicios  | Ventajas   | H1 / H2     |
| ------ | ---------- | ---------- | ----------- |
| 375px  | 1 columna  | 1 columna  | 32px / 26px |
| 768px  | 1 columna  | 1 columna  | 44px / 32px |
| 1440px | 3 columnas | 2 columnas | 44px / 32px |

Se comprobó la carga de Inter y la fotografía local, la ausencia de desbordamiento horizontal y el encuadre de la imagen mediante capturas. Las combinaciones de texto de la paleta comprobadas sobre sus fondos alcanzan al menos 4,56:1; el texto blanco sobre el fondo del CTA alcanza 4,86:1. Los bordes claros son divisores decorativos, no límites de controles.

## Comprobación de navegación y cierre de fase 2

El 2026-10-22 se comprobaron en Chromium los tamaños 375 × 812, 768 × 1024 y 1440 × 900. Se verificaron los textos, el orden de secciones, las rejillas, los recursos locales y la ausencia de desbordamiento horizontal o solapamientos entre los elementos revisados. Las capturas temporales se inspeccionaron para móvil y escritorio; no son resultados de PageSpeed Insights.

- Navegación: Inicio, Servicios y Contacto llevan a sus secciones, con los títulos visibles bajo el header fijo. Contacto y footer incluyen enlaces `mailto:` y `tel:`; las redes apuntan a las URLs del briefing. Se comprobaron sus destinos, no la disponibilidad de los perfiles externos ni la apertura de aplicaciones de correo o teléfono.
- Menú móvil: probado con teclado, apertura con Enter, recorrido con Tab, cierre con Escape y devolución del foco al botón. Se comprobaron el estado `aria-expanded`, el cierre al elegir un enlace y la gestión del foco al cambiar entre móvil y escritorio. Sin JavaScript, los enlaces quedan visibles.
- Compilación y sintaxis: `npm run build` y `node --check navigation.js` correctos; sin errores de ejecución JavaScript ni respuestas HTTP de error en los recursos de la página comprobados.
- Registro: «Talento» y el CTA enlazan a `application.html`. El destino responde HTTP 200, pero continúa vacío. El recorrido de registro y CA-02 no se consideran completados; la publicación final permanece bloqueada hasta la entrega independiente del formulario.

## Comprobaciones de fase 3: SEO, accesibilidad y privacidad

Comprobado el 2026-10-22 con Chromium 156 y herramientas temporales de validación, sin añadir dependencias ni archivos de pruebas al proyecto:

| Área                 | Resultado                                                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEO                  | Idioma español, título descriptivo y metadescripción de 152 caracteres presentes en el DOM.                                                                                                                               |
| Schema.org           | JSON-LD parseable de tipo `Organization`, comparado estructuralmente y coincidente con el JSON del briefing. Conserva `https://nexova.com`, fundación en 2011, ubicaciones y contacto sin direcciones inventadas.         |
| Semántica e imágenes | Un H1, jerarquía H2/H3 sin saltos, imagen informativa con alternativa descriptiva e iconos decorativos con `alt=""`. Sin índices de tabulación positivos.                                                                 |
| Salto al contenido   | Primer Tab muestra «Saltar al contenido» con foco visible; Enter mueve el foco al `main`.                                                                                                                                 |
| Teclado              | Recorrido completo con Tab de 12 controles en móvil y 15 en escritorio, con indicador de foco de al menos 2px y sin obstrucción. Menú comprobado con Tab, Escape y devolución del foco.                                   |
| Auditoría automática | axe-core 4.14.0, reglas WCAG A/AA hasta 2.2: cero infracciones y cero resultados incompletos en 375px con menú abierto y cerrado, y en escritorio a 1440px. La revisión incluyó contraste.                                |
| Zoom nativo al 200%  | Comprobado mediante la preferencia real de Chromium en un perfil temporal: ventana de 1440 × 900, área de 720 × 450 CSS px y DPR 2. Contenido, menú y anclas utilizables, sin solapamientos ni desplazamiento horizontal. |
| Redistribución       | A 320 × 800 CSS px, contenido y navegación utilizables, también con el menú abierto; sin desbordamiento horizontal ni solapamientos detectados. Se inspeccionaron capturas de ambos escenarios.                           |
| Privacidad           | Sin formularios ni campos de captura, cookies, localStorage, sessionStorage o service workers. En las visitas comprobadas solo hubo peticiones GET al servidor local, sin solicitudes automáticas a terceros.             |

Se revisaron las fuentes de la landing sin detectar patrones de credenciales; los emails y teléfonos son exclusivamente los del briefing. No se procesa información de candidatos y el formulario sigue intacto. Esta revisión está limitada a los archivos y comportamientos comprobados; no es una certificación de seguridad.

La comprobación de teclado y las capturas complementan axe-core, pero no certifican por sí solas la conformidad completa con WCAG. No se ha realizado una prueba de usuario con lector de pantalla ni una validación externa del marcado Schema.org. No hay una suite de pruebas de la landing configurada.

## Auditoría de fase 4: 2026-10-23

Se reconstruyó la hoja de estilos con `npm run build` y `node --check navigation.js` terminó correctamente. Para limitar la exposición pública, se preparó una copia temporal en `/tmp/nexova-public-audit/` con el HTML, navegación, CSS y recursos necesarios; no se sirvió la raíz del monorepo ni se expusieron `node_modules`, el lockfile o la documentación. La copia incluyó `application.html` vacío, que es el destino enlazado por «Talento» y el CTA. No se modificaron `application.html` ni `validation.js`.

La URL pública temporal `https://congenial-space-goldfish-r7qvg4jg6qx3x6rj-8080.app.github.dev/` devolvió HTTP 200 para la landing y los recursos locales revisados. `application.html` también devolvió HTTP 200, pero su contenido sigue en 0 bytes. Esta verificación de transporte no valida el recorrido del formulario ni sustituye la auditoría de rendimiento. La matriz por criterio está en [docs/acceptance.md](./docs/acceptance.md).

**Rendimiento: bloqueado, sin puntuación ni captura.** PageSpeed Insights respondió HTTP 429 indicando cuota diaria agotada para la API consultada. Se intentó Lighthouse 13.5.0 de forma temporal, sin añadir dependencias al proyecto; en dos intentos Chromium no arrancó y Lighthouse notificó `waiting for dynamic debugging port in chrome-err.log`. No se obtuvo informe utilizable. No se afirma ni se infiere una puntuación. La fase 4 permanece abierta hasta completar Lighthouse o PageSpeed Insights, guardar una captura real con herramienta, fecha, URL y modalidad, y lograr al menos 80 puntos.

La exposición fue solo para esta auditoría, no una publicación. **El servidor temporal de la auditoría ya se detuvo; restablecer el puerto de Codespaces a Private al terminar la revisión**. La publicación final continúa bloqueada hasta implementar el formulario en su entrega independiente y validar CA-02.
