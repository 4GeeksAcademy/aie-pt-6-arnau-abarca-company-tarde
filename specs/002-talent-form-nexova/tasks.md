# Tareas: Formulario de Registro de Talento

**Funcionalidad:** [002-talent-form-nexova](./spec.md)  
**Plan:** [plan.md](./plan.md)  
**Estado inicial:** tareas pendientes; las casillas se marcan únicamente tras completar y verificar la tarea correspondiente.

## Reglas de ejecución

- Seguir las fases en orden; completar y verificar cada tarea antes de avanzar a la siguiente. Las tareas paralelas se señalan expresamente.
- Revisar `git status`, `git diff` y `git diff --cached` antes de modificar archivos; preservar los cambios preexistentes.
- Trabajar desde `uis/website/` para los comandos del componente y no servir la raíz del monorepo.
- No introducir frameworks, backend, transmisión, persistencia, analítica ni dependencias de terceros para capturar datos.
- No añadir una suite de tests sin petición. Usar las comprobaciones documentadas y verificaciones manuales enfocadas.
- Ante cada fallo, hacer como máximo dos intentos de corrección y luego documentar el bloqueo y esperar.

## Fase 1: estructura HTML y recorrido

**Referencias:** plan, §3. **Cobertura:** RF-01–RF-04, RF-08, RF-10–RF-12 y RNF-01–RNF-03.

- [x] **1.1 — Preparar la página y sus recursos.** En `uis/website/application.html`, crear documento HTML5 en español con metadatos básicos, título descriptivo, enlace al CSS compilado y carga diferida de `validation.js` usando `defer`. Mantener nombres de recursos y rutas relativos válidos desde la página.
- [x] **1.2 — Definir audiencia y navegación.** Añadir encabezado que identifique el registro profesional, una explicación de su propósito, enlace visible de vuelta a `index.html` y aviso exacto para empresas: «¿Eres una empresa buscando talento? Escríbenos a contacto@nexova.com», con enlace `mailto:contacto@nexova.com`.
- [x] **1.3 — Maquetar los campos obligatorios.** Implementar en `application.html` los 11 campos de RF-04 con sus tipos, `name` e identificadores estables; asociar cada control con su etiqueta y señalizar los obligatorios. Incluir exactamente las opciones permitidas para país, sector, nivel de inglés y disponibilidad. Usar la etiqueta «Email».
- [x] **1.4 — Preparar accesibilidad y mensajes.** Agrupar disponibilidad en `fieldset`/`legend`; crear una ubicación identificable para el error de cada control o grupo, enlazable mediante `aria-describedby`; añadir los atributos iniciales necesarios para que `validation.js` pueda gestionar `aria-invalid`. No mostrar errores como activos al cargar la página.
- [x] **1.5 — Preparar contador y confirmación.** Añadir junto a comentarios un contador visible y un contenedor con identificador estable para el mensaje de validación. Añadir el estado de éxito con el título y los dos párrafos completos de RF-10 y el enlace a `https://linkedin.com/company/nexova`; mantenerlo oculto hasta un envío válido.
- [x] **1.6 — Resolver el modo sin JavaScript.** Incluir un mensaje `<noscript>` en español que explique que se necesita JavaScript. Dejar inicialmente deshabilitado «Enviar registro» para impedir envío nativo y definir que solo `validation.js`, tras inicializar correctamente, lo habilite. Verificar que no haya texto de éxito visible sin JavaScript.
- [x] **1.7 — Aplicar estructura responsive y acciones.** Añadir el botón «Enviar registro» como única acción de formulario; no crear botón «Limpiar formulario». Usar estructura mobile-first, en una columna en móvil y con agrupaciones en columnas en pantallas amplias; incluir estados de foco visibles y controles cómodos para teclado y tacto.
- [x] **1.8 — Revisar el contenido frente a la especificación.** Comparar los 11 campos, obligatoriedad, opciones, etiquetas y textos con RF-03, RF-04 y RF-10 de `specs/002-talent-form-nexova/spec.md`; eliminar todo campo, enlace o texto legal/comercial no autorizado.

## Fase 2: validación accesible y envío simulado

**Dependencia:** completar la fase 1. **Referencias:** plan, §4. **Cobertura:** RF-05–RF-09, RNF-04 y RNF-05.

- [x] **2.1 — Inicializar el controlador de formulario.** En `uis/website/validation.js`, localizar el formulario y los controles por sus identificadores estables; comprobar que los elementos requeridos existen antes de registrar eventos y habilitar «Enviar registro» solo tras inicialización exitosa.
- [x] **2.2 — Implementar validadores por campo.** Implementar reglas puras o funciones enfocadas para los 11 campos: nombre con al menos dos palabras no vacías; email con formato y dominio válidos; teléfono con `+`, código de país de 1–3 dígitos y número de 6–14 dígitos, ignorando espacios/guiones al contar; experiencia entera de 0 a 50; opciones permitidas en selects; radio obligatorio; URL opcional HTTP(S) válida sin restringir dominio; comentarios hasta 500; checkbox obligatorio.
- [x] **2.3 — Mostrar errores literales y estado accesible.** Usar exactamente los mensajes de RF-04, incluyendo el de teléfono, política de datos y comentarios. Mostrar el error junto al control/grupo, enlazarlo con `aria-describedby`, alternar `aria-invalid` y no depender solo de color para comunicar el error.
- [x] **2.4 — Configurar la validación interactiva.** Validar cada control en `blur`; después de que un campo haya mostrado error, revalidarlo al cambiar su valor; al intentar enviar, validar todos los campos. No vaciar ni reemplazar los valores ingresados por validaciones fallidas y permitir corregir los errores con teclado.
- [x] **2.5 — Actualizar el contador de comentarios.** Actualizar en cada edición los caracteres usados y restantes hasta 500; cuando se exceda el límite, mostrar el exceso, mantener el texto intacto y presentar el mensaje con «quedan 0» (sin valores negativos). Bloquear envío con 501 o más y aceptar exactamente 500.
- [x] **2.6 — Controlar el formulario válido.** En el evento `submit`, prevenir el envío HTML/red. Si hay errores, mostrarlos y mover el foco de forma útil al primer error o a un resumen accesible si se implementa. Si todos los campos son válidos, ocultar el formulario o cambiarlo al estado de éxito sin mostrar valores personales.
- [x] **2.7 — Completar el estado de éxito.** Al validar correctamente, presentar el título y ambos párrafos exactos de RF-10, con el enlace correcto de LinkedIn. No enviar email, ejecutar `fetch`, navegar a un endpoint ni conservar los valores en memoria persistente, almacenamiento del navegador o backend.
- [x] **2.8 — Revisar anuncio de errores y éxito.** Añadir o ajustar regiones vivas y atributos semánticos para que lector de pantalla anuncie los cambios pertinentes sin repetir mensajes en cada pulsación ni producir anuncios intrusivos.
- [x] **2.9 — Revisar nombres y mensajes con `spec.md`.** Comprobar cada mensaje literal y las condiciones límites de RF-04 y §6 de la especificación; corregir discrepancias antes de pasar a la siguiente fase.

## Fase 3: Tailwind e integración visual

**Dependencia:** las clases de `application.html` y `validation.js` deben estar definidas. **Referencias:** plan, §5. **Cobertura:** RNF-01, RNF-02 y RNF-06.

- [x] **3.1 — Registrar los archivos fuente Tailwind.** En `uis/website/styles.css`, conservar la fuente `index.html` y añadir fuentes para `application.html` y `validation.js`, siguiendo la sintaxis Tailwind CSS 4 que ya utiliza el proyecto.
- [x] **3.2 — Hacer descubribles las clases dinámicas.** En `validation.js`, declarar completas y literalmente todas las clases Tailwind que se añadan o retiren durante validación y éxito. Evitar construir clases mediante concatenación; si fuera imprescindible una clase no detectable, registrar explícitamente solo el conjunto finito necesario.
- [x] **3.3 — Aplicar el sistema visual de Nexova.** Ajustar clases de `application.html` a la guía de `uis/website/docs/DESIGN.md` y a RNF-01/RNF-02: tipografía legible, color y contraste adecuados, espacios coherentes, campos cómodos, foco visible, una columna móvil y agrupación apropiada en escritorio. Priorizar legibilidad y funcionamiento frente a detalles decorativos.
- [x] **3.4 — Compilar y revisar el CSS generado.** Desde `uis/website/`, ejecutar `npm run build`. Confirmar que `assets/styles.css` existe, no está vacío e incluye utilidades representativas que solo aparecen en la página y en los estados dinámicos del script. Mantener el artefacto ignorado por Git.

## Fase 4: comprobación, aceptación y documentación

**Dependencia:** fases 1–3. **Referencias:** plan, §6. **Cobertura:** CA-01–CA-12.

- [x] **4.1 — Comprobar sintaxis y compilación.** Desde `uis/website/`, `node --check validation.js` y `node --check navigation.js` finalizaron correctamente; `npm run build` generó el CSS con Tailwind CSS v4.3.0 (2026-10-23). No fue necesario instalar dependencias.
- [ ] **4.2 — Verificar campos, opciones y mensajes.** En navegador, comprobar los 11 controles, tipos, obligatoriedad, todas las opciones y mensajes. Probar entradas válidas e inválidas: nombre de una/dos palabras; email incompleto; teléfonos sin prefijo, código de más de 3 dígitos y número de 5/6/14/15 dígitos; experiencia vacía, negativa, decimal, 0, 50 y 51; selects iniciales; radio sin selección; URL vacía, HTTP(S) y esquema inválido; checkbox sin marcar.
- [ ] **4.3 — Verificar interacción y conservación de valores.** Comprobar errores en `blur`, revalidación al editar tras error, validación global al enviar, retirada del error al corregir y conservación de todos los campos ante errores. Confirmar asociación programática e indicador de inválido.
- [ ] **4.4 — Verificar el límite de comentarios.** Probar cero caracteres, 500 y 501 o más. Confirmar contador actualizado, texto excedente no truncado, mensaje con «quedan 0» sin negativos y bloqueo del envío al exceder.
- [ ] **4.5 — Verificar el envío simulado y privacidad.** Con datos ficticios válidos, comprobar título, texto completo y URL de LinkedIn. En las herramientas de red del navegador, confirmar que el envío no genera solicitudes; inspeccionar que no se escriben valores en `localStorage`, `sessionStorage`, cookies ni backend y que la confirmación no expone valores ingresados.
- [ ] **4.6 — Verificar el caso sin JavaScript.** Deshabilitar JavaScript en el navegador y recargar. Confirmar aviso `<noscript>` visible, acción deshabilitada/no enviable y ausencia de confirmación de éxito.
- [ ] **4.7 — Verificar navegación de entrada y retorno.** Abrir la landing y seguir los enlaces «Talento» y CTA hacia `application.html`; volver mediante el enlace de la página. Confirmar que no se modificó el texto ni destino de los enlaces existentes sin necesidad.
- [ ] **4.8 — Verificar teclado y lector de pantalla.** Completar el flujo solo con teclado; revisar orden de tabulación, foco visible, controles, radios, mensajes y estado de éxito con lector de pantalla. Registrar limitaciones si no se dispone de lector o entorno compatible; no declarar comprobaciones no realizadas.
- [ ] **4.9 — Verificar responsive y zoom.** Inspeccionar la página en móvil, escritorio y ancho estrecho; comprobar zoom al 200%, ausencia de desbordamiento horizontal y solapamientos, legibilidad, acceso a mensajes y operabilidad de controles.
- [x] **4.10 — Servir y comprobar recursos locales.** El servidor local ya activo en `uis/website/` respondió HTTP 200 con contenido no vacío para `/application.html` (15.715 bytes), `/assets/styles.css` (18.830 bytes), `/validation.js` (8.317 bytes), `/assets/inter-latin-variable.woff2` (48.256 bytes) y `/index.html` (12.444 bytes), el 2026-10-23. El puerto 8080 estaba ocupado, por lo que se reutilizó el servidor existente; no se inició otro proceso ni se expuso el puerto. El chequeo HTTP no se considera aceptación visual o funcional.
- [x] **4.11 — Actualizar documentación del componente.** Actualizado `uis/website/README.es.md` para describir la página de talento, fuentes Tailwind, compilación/ejecución y resultados realmente observados. Creada `uis/website/docs/talent-form-acceptance.md`, separada de la matriz de landing, con estado y evidencia o limitaciones para CA-01–CA-12 (2026-10-23).
- [x] **4.12 — Revisar alcance y diff.** Revisados el estado Git y los diffs de la entrega, incluidos `git diff --check` (sin errores), los dos documentos de planificación preexistentes y la nueva matriz de aceptación. Los cambios se limitan al formulario, CSS, validación y documentación; no se encontraron datos personales reales ni secretos. `AGENTS.md`, `memory-bank/`, contexto empresarial e infraestructura no están modificados (2026-10-23). Las pruebas manuales de aceptación siguen pendientes según 4.2–4.9.

## Relación de tareas con criterios de aceptación

| Criterio | Tareas principales          |
| -------- | --------------------------- |
| CA-01    | 1.3, 2.2, 4.2               |
| CA-02    | 2.2, 2.9, 4.2               |
| CA-03    | 1.4, 2.3–2.4, 4.3, 4.8      |
| CA-04    | 2.5, 4.4                    |
| CA-05    | 1.2, 4.7                    |
| CA-06    | 1.5, 2.6–2.7, 4.5           |
| CA-07    | 1.6, 2.1, 4.6               |
| CA-08    | 1.7, 1.8                    |
| CA-09    | 1.2, 4.7                    |
| CA-10    | 1.4, 1.7, 2.3, 2.8, 4.8–4.9 |
| CA-11    | 3.1–3.2, 3.4                |
| CA-12    | 2.6–2.7, 4.5                |
