# Plan de implementación: Landing Page de Nexova

**Funcionalidad:** 001-website-nexova
**Estado:** Plan propuesto; no acredita implementación ni validaciones ejecutadas.
**Alcance:** Solo la landing. El formulario se desarrollará con otra especificación.

## 1. Referencias y prioridad

| Documento                                            | Uso en el plan                                                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [spec.md](./spec.md)                                 | Alcance, RF-01 a RF-10, RNF-01 a RNF-07 y nueve criterios de aceptación. Referencia de todas las fases.                                                            |
| [AGENTS.md](../../AGENTS.md)                         | Instrucciones obligatorias, protección de archivos y hallazgos de la auditoría de la web.                                                                          |
| [BRIEFING.md](../../uis/website/BRIEFING.md)         | Contenido y orden de secciones, servicios, ventajas, contacto, redes y JSON-LD de la empresa.                                                                      |
| [DESIGN.md](../../uis/website/docs/DESIGN.md)        | Guía visual: principios, colores, tipografía, espaciado y responsive en secciones 2 a 5; landing en 6.1. La sección 8 es orientativa, no configuración comprobada. |
| [README.es.md](../../README.es.md)                   | Organización del monorepo y ubicación de los entregables.                                                                                                          |
| [uis/README.es.md](../../uis/README.es.md)           | Convenciones y documentación de las interfaces por aplicación.                                                                                                     |
| [projectbrief.md](../../memory-bank/projectbrief.md) | Contexto de Nexova, públicos y líneas de negocio.                                                                                                                  |
| [techContext.md](../../memory-bank/techContext.md)   | Restricciones técnicas y distinción entre arquitectura propuesta e implementada.                                                                                   |
| [progress.md](../../memory-bank/progress.md)         | Estado documentado y limitaciones; contrastar con los archivos reales antes de implementar.                                                                        |

El checklist aportado por el usuario en la conversación también es fuente de aceptación: Tailwind, mobile-first, ejecución mediante `npx`, auditoría pública y captura de resultados. No tiene un archivo independiente.

El briefing determina el contenido y el diseño orienta su presentación. Las omisiones del diseño no eliminan requisitos. Aplicar las correcciones de AGENTS y los criterios adicionales de la especificación. Estos documentos son referencias de solo lectura en esta implementación.

## 2. Punto de partida y decisiones

- La revisión previa encontró vacíos los archivos de landing, formulario y validación, sin configuración de compilación ni comandos de verificación propios del componente. Confirmar ese estado al iniciar cada fase.
- Usar HTML estático, Tailwind compilado y JavaScript mínimo para la navegación. No incorporar framework, backend, PostCSS ni un runner global sin necesidad demostrada.
- Mantener español como idioma base, 15 años de experiencia, fundación en 2011 y copyright 2026. Conservar el subtítulo literal del briefing con «más de 10 años», compatible con los 15 años.
- Mantener el destino relativo `application.html` para «Talento» y el CTA. El usuario ha decidido posponer la publicación final hasta que el formulario esté disponible; no crear una página provisional ni modificar el formulario como parte de este plan.
- No considerar validado el recorrido de registro mientras su destino esté vacío o incompleto.
- Usar los tamaños numéricos del diseño mediante utilidades Tailwind explícitas cuando las clases sugeridas no coincidan. Por ejemplo: H1 de 32px en móvil y 44px en escritorio, no 30px y 48px.
- Verificar los contrastes reales de textos, foco y controles. El borde claro del diseño puede ser decorativo, pero no debe ser la única señal de un control si no alcanza el contraste aplicable.
- No publicar direcciones postales exactas ni una insignia de garantía genérica. Conservar sin ampliar la referencia al mercado latinoamericano y registrar que sigue pendiente de aclaración; no inventar presencia regional ni sustituir el texto sin acuerdo.

## 3. Fase 1: Preparar la base ejecutable

**Cobertura:** RNF-01 y RNF-05. Sin dependencias de otras fases.

1. Revisar instrucciones, estado de Git y cambios existentes. Preservar los archivos del usuario y limitar el trabajo al componente web.
2. Configurar un paquete local con Tailwind CSS y su CLI compatibles, más un servidor estático. Fijar dependencias mediante el lockfile y comprobar sus requisitos de Node.
3. Crear una entrada mínima de Tailwind y compilar CSS minificado. No añadir reglas CSS manuales innecesarias ni copiar sin adaptar la configuración antigua de DESIGN.
4. Definir scripts `build` y `watch`. Inspeccionar las reglas de exclusión existentes antes de excluir dependencias y artefactos generados.
5. Documentar en el README del componente la instalación reproducible, compilación y ejecución local mediante `npx`.

Comandos propuestos, que solo se considerarán válidos tras configurarlos y comprobarlos desde `uis/website/`:

```bash
npm ci
npm run build
npx http-server . -a 0.0.0.0 -p 8080
```

Si el puerto está ocupado, elegir otro y comunicarlo. No añadir flags de CORS innecesarios ni servir la raíz del monorepo. Revisar qué archivos del directorio web quedarían expuestos antes de hacer público el puerto.

**Salida verificable:** instalación reproducible, compilación correcta y servidor accesible en Codespaces. Son comandos nuevos propuestos, no checks existentes del repositorio.

## 4. Fase 2: Construir contenido y presentación

**Cobertura:** RF-01 a RF-07, RF-09, RF-10, RNF-01 y RNF-02. Depende de la fase 1.

1. Crear la estructura HTML5 con `lang="es"`, enlace de salto al contenido, header, navegación, main, secciones y footer. Usar un H1 y una jerarquía coherente H2/H3.
2. Implementar los destinos de Inicio, Servicios y Contacto como anclas; conservar el destino acordado del registro.
3. Incorporar el titular, subtítulo y CTA exactos del briefing. Añadir fotografía corporativa relevante, con permiso de uso, optimizada y con dimensiones estables.
4. Presentar las tres líneas de servicio con sus descripciones completas. Limitar la garantía de reemplazo al servicio de headhunting.
5. Añadir los cuatro argumentos de «Por qué Nexova», contacto mediante `mailto:` y `tel:`, copyright y redes sociales del briefing. Mantener el contacto también en el footer.
6. Aplicar Tailwind mobile-first: servicios en una columna móvil y tres en escritorio; ventajas en una columna móvil y dos en escritorio. Adaptar tablet sin desbordamientos ni texto recortado.
7. Mantener la identidad visual y tipografía del diseño, resolviendo antes las discrepancias de tamaños y contraste. Optimizar fuentes e imágenes para evitar descargas innecesarias y saltos de contenido.
8. Si la adaptación móvil lo requiere, añadir un menú desplegable no modal con JavaScript de navegación separado de la validación del formulario. Usar botón con nombre accesible, `aria-expanded`, `aria-controls`, cierre con Escape y gestión coherente del foco. No añadir navegación inferior opcional sin necesidad.

**Salida verificable:** todas las secciones y textos presentes; enlaces de contacto y anclas operativos; revisión a 375px, 768px y 1440px. El enlace al formulario se comprueba como contrato de destino, no como recorrido completado.

## 5. Fase 3: Completar SEO y accesibilidad

**Cobertura:** RF-08, RNF-03, RNF-04 y RNF-07. Depende de la estructura de la fase 2; los metadatos pueden prepararse en paralelo con la presentación.

1. Incorporar título descriptivo, metadescripción y JSON-LD `Organization` con los datos del briefing. No sustituir la URL corporativa del marcado por la URL temporal de Codespaces ni asumir un despliegue real en el dominio corporativo.
2. Verificar la jerarquía de encabezados y los elementos semánticos. Usar ARIA solo cuando complete información que el HTML nativo no aporte.
3. Añadir alternativas descriptivas a las imágenes informativas y `alt=""` a las decorativas.
4. Revisar teclado, orden de foco, foco visible, menú, destinos de anclas y contraste WCAG 2.2 AA. Distinguir bordes decorativos de indicadores necesarios para identificar controles.
5. Comprobar zoom al 200% y redistribución del contenido equivalente a 320 CSS px, sin pérdida de funcionalidad ni solapamientos.
6. Verificar ausencia de formularios de captura, trackers, secretos y datos personales reales.

**Salida verificable:** JSON-LD parseable y coherente con el briefing, comprobación manual de teclado y revisión automática de accesibilidad. Una puntuación automática no certifica por sí sola el cumplimiento completo de WCAG.

## 6. Fase 4: Auditar y documentar la entrega

**Cobertura:** RNF-05, RNF-06 y criterios de aceptación. Depende de las fases 1 a 3.

1. Ejecutar la compilación final e iniciar el servidor documentado. Comprobar errores de consola, carga de recursos, enlaces internos, contacto y redes. Registrar por separado la dependencia conocida del formulario pendiente.
2. Exponer temporalmente el puerto de Codespaces como Public para la auditoría solicitada, revisando antes el contenido servido. No modificar infraestructura protegida ni incorporar secretos. La exposición de evaluación no se considera publicación final.
3. Ejecutar PageSpeed Insights sobre esa URL; si no puede acceder, utilizar Lighthouse desde Chrome DevTools o su extensión. Registrar la alternativa utilizada.
4. Obtener un rendimiento mínimo de 80, con objetivo superior a 90. Registrar herramienta, fecha, URL y modalidad; indicar si se ha medido móvil o escritorio y no extrapolar resultados entre modalidades.
5. Guardar una captura y un resumen de resultados con los problemas pendientes. No generar evidencias ficticias ni afirmar resultados antes de medirlos.
6. Si falla una verificación, corregir únicamente el problema relacionado y repetir el check enfocado. Respetar el máximo de dos intentos de reparación por fallo; no entrar en bucles de compilación o auditoría.
7. Revisar el diff completo, los archivos nuevos y `git diff --check`. No crear tests adicionales ni commits sin petición expresa.
8. Documentar instalación, ejecución, comandos realmente comprobados, resultados y dependencias pendientes en el README del componente.

**Salida verificable:** instrucciones reproducibles, captura de evaluación, matriz de aceptación y relación honesta de comprobaciones ejecutadas o no disponibles. Publicación final bloqueada hasta disponer del formulario y validar su enlace.

## 7. Archivos previstos

Las siguientes rutas son relativas a `uis/website/`. Esta lista describe trabajo futuro, no archivos ya implementados.

| Ruta                                 | Acción prevista                                                                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `index.html`                         | Implementar la landing existente.                                                                          |
| `package.json` y `package-lock.json` | Añadir dependencias y scripts locales reproducibles.                                                       |
| `styles.css`                         | Crear la entrada mínima de Tailwind.                                                                       |
| `assets/styles.css`                  | Generar el CSS compilado; documentar su regeneración.                                                      |
| `navigation.js`                      | Crear únicamente si se necesita interacción para la navegación móvil.                                      |
| `assets/`                            | Añadir fotografía optimizada y recursos locales necesarios, con procedencia y permiso de uso documentados. |
| `README.es.md`                       | Documentar propósito, instalación, compilación, ejecución y estado de integración.                         |
| `docs/`                              | Añadir resumen y captura de auditoría cuando existan resultados reales.                                    |

Inspeccionar las exclusiones de Git antes de decidir si hace falta un cambio mínimo. Mantener intactos `application.html`, `validation.js`, el briefing, el diseño, AGENTS y los documentos de contexto protegidos.

## 8. Matriz de validación

Registrar cada fila como pendiente, verificada o bloqueada, con evidencia. Inicialmente ninguna está verificada por este plan.

| Criterio de spec                | Verificación prevista                                                                                  | Fase  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| CA-01: contenido y correcciones | Comparar orden y textos con RF-01 a RF-09 y briefing; comprobar experiencia y copyright.               | 2 y 3 |
| CA-02: navegación y CTA         | Revisar anclas, contacto, redes y destino del CTA; registro pendiente hasta la entrega del formulario. | 2 y 4 |
| CA-03: semántica                | Inspeccionar DOM, H1 y jerarquía, alternativas de imágenes.                                            | 2 y 3 |
| CA-04: responsive               | Revisar móvil, tablet, escritorio, zoom y ausencia de desplazamiento horizontal no intencionado.       | 2 y 3 |
| CA-05: accesibilidad            | Recorrer con teclado y verificar foco, menú y contrastes; complementar con auditoría automática.       | 3     |
| CA-06: SEO y marcado            | Revisar metadatos, parsear JSON-LD y comparar datos con briefing.                                      | 3     |
| CA-07: ejecución y URL          | Ejecutar los comandos documentados y comprobar acceso público temporal para auditoría.                 | 1 y 4 |
| CA-08: rendimiento              | Adjuntar captura real con puntuación mínima de 80 y contexto de medición.                              | 4     |
| CA-09: límites                  | Revisar diff, dependencias y comportamiento; sin formulario ni captura de datos.                       | Todas |

Los identificadores CA-01 a CA-09 corresponden, en orden, a los nueve criterios numerados de la especificación. No cerrar CA-02 ni declarar lista la publicación mientras el formulario no permita completar su parte del recorrido.

## 9. Fuera de alcance

No implementar formulario, validación, recepción o almacenamiento de candidaturas, página provisional de registro, backend, email real, ATS, CRM, autenticación, backoffice, analítica o traducción completa. No cambiar fuentes de negocio ni infraestructura protegida. No iniciar el desarrollo del formulario para resolver una dependencia de esta landing.
