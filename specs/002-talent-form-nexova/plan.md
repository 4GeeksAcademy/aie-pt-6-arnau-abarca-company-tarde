# Plan de implementación: Formulario de Registro de Talento

**Funcionalidad:** `002-talent-form-nexova`  
**Estado:** Propuesta; no acredita implementación ni validaciones ejecutadas.  
**Alcance:** Completar el formulario estático de talento y su validación local simulada. Sin backend, transmisión ni almacenamiento de datos.

## 1. Referencias clave

| Documento                                                                                                                                               | Uso en el plan                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [spec.md](./spec.md)                                                                                                                                    | Fuente principal de alcance y comportamiento: RF-01–RF-12, RNF-01–RNF-06, casos límite y 12 criterios de aceptación.                                                              |
| [AGENTS.md](../../AGENTS.md)                                                                                                                            | Salvaguardas del monorepo y reglas específicas de Nexova, incluidos los límites de privacidad y la separación entre landing y formulario.                                         |
| [BRIEFING.md](../../uis/website/BRIEFING.md)                                                                                                            | Contenido original y requisitos del formulario.                                                                                                                                   |
| [DESIGN.md](../../uis/website/docs/DESIGN.md)                                                                                                           | Guía visual. Si discrepa con el briefing o esta especificación, prevalecen estos últimos.                                                                                         |
| [rules.md](../../uis/website/rules.md)                                                                                                                  | Convenciones operativas y límites de la entrega de la landing. Las restricciones de no modificar el formulario se refieren a esa entrega, no a esta especificación independiente. |
| [README.es.md](../../uis/website/README.es.md)                                                                                                          | Instalación, compilación, ejecución y comprobaciones disponibles.                                                                                                                 |
| [styles.css](../../uis/website/styles.css) y [package.json](../../uis/website/package.json)                                                             | Tailwind CSS 4, fuentes escaneadas, scripts y dependencias actuales.                                                                                                              |
| [index.html](../../uis/website/index.html)                                                                                                              | Enlaces existentes de «Talento» y del CTA al formulario.                                                                                                                          |
| [docs/acceptance.md](../../uis/website/docs/acceptance.md)                                                                                              | Estado de aceptación de la landing y del recorrido de talento, que actualmente consta como pendiente.                                                                             |
| [progress.md](../../memory-bank/progress.md), [projectbrief.md](../../memory-bank/projectbrief.md) y [techContext.md](../../memory-bank/techContext.md) | Estado, contexto de Nexova y restricciones técnicas confirmadas.                                                                                                                  |

## 2. Estado inicial observado y decisiones

- `uis/website/application.html` y `uis/website/validation.js` existen, pero están vacíos.
- La navegación «Talento» y el CTA de la landing ya enlazan a `application.html`. Se conservará ese destino y se añadirá desde el formulario un enlace visible de regreso a `index.html`.
- `styles.css` desactiva el descubrimiento automático de fuentes y actualmente registra solo `index.html`. La compilación deberá incluir también `application.html` y `validation.js`, de modo que el CSS generado contenga las clases del formulario y las aplicadas dinámicamente.
- El CSS compilado está ignorado por Git. Regenerarlo localmente con el script existente; no tratar `assets/styles.css` como archivo fuente que haya que versionar.
- La especificación funcional prevalece sobre diferencias de `DESIGN.md`: once campos y reglas definidos, etiqueta «Email», sin acción «Limpiar formulario» y sin política o enlace legal inventado.
- El envío se limita a validación local y cambio de estado de la página. No añadir red, almacenamiento, analítica, dependencias de terceros ni backend.
- El stack del componente confirmado es HTML estático, Tailwind CSS compilado y JavaScript nativo. No introducir frameworks o servicios sin una necesidad aprobada.

## 3. Fase 1: Estructura HTML y recorrido

**Cobertura:** RF-01–RF-04, RF-08, RF-10–RF-12 y RNF-01–RNF-03.

1. Implementar `application.html` en español con HTML semántico, título descriptivo, recursos locales y enlace de regreso a la landing.
2. Presentar explícitamente el registro como destinado a profesionales y mostrar el aviso para empresas con `mailto:contacto@nexova.com`.
3. Crear los once campos de RF-04 con tipos, opciones, etiquetas asociadas, obligatoriedad indicada y estructura para errores.
4. Agrupar la disponibilidad con `fieldset` y `legend`. Definir objetivos o contenedores para mensajes de error, contador y estado de éxito.
5. Incluir el texto completo de confirmación y el enlace de LinkedIn especificados en RF-10.
6. Añadir `<noscript>` y asegurar que sin JavaScript el formulario no pueda presentarse como enviado. Propuesta: mantener la acción deshabilitada por defecto y habilitarla solo después de inicializar correctamente el controlador de validación.
7. Aplicar diseño mobile-first con Tailwind, controles cómodos, foco visible y disposición en una columna en móvil y columnas relacionadas en pantallas amplias.

**Salida prevista:** HTML con todos los elementos y contenidos requeridos, preparado para la validación. Esta salida por sí sola no verifica el comportamiento.

## 4. Fase 2: Validación accesible y envío simulado

**Cobertura:** RF-05–RF-09, RNF-04 y RNF-05. Depende de los identificadores y estructura HTML de la fase 1.

1. Implementar en `validation.js` las reglas y mensajes literales de RF-04, incluidos nombre con dos palabras, email con dominio válido, teléfono internacional flexible, experiencia entera entre 0 y 50 y URL opcional HTTP(S).
2. Validar al perder el foco, revalidar al editar un campo que ya haya mostrado un error y validar todos los campos al intentar enviar.
3. Asociar cada error al campo correspondiente, establecer `aria-invalid` y `aria-describedby`, y comunicar errores y éxito a tecnologías de asistencia sin anuncios repetitivos o intrusivos.
4. Actualizar el contador de comentarios al escribir. Aceptar 500 caracteres; conservar 501 o más, indicar el exceso, impedir el envío y mantener «quedan 0» en el mensaje sin truncar el texto.
5. En un envío válido, prevenir el envío real y actualizar la página con la confirmación definida. No mostrar los valores introducidos ni persistirlos.
6. Si JavaScript no puede inicializarse, mantener deshabilitada la acción de envío y no presentar una confirmación.

**Salida prevista:** validación local completa y estado de éxito sin solicitudes de red ni almacenamiento.

## 5. Fase 3: Tailwind e integración de estilos

**Cobertura:** RNF-01, RNF-02 y RNF-06. Puede desarrollarse junto con las fases 1 y 2; la verificación requiere que las clases estén definidas.

1. Actualizar `styles.css` para que Tailwind escanee `application.html` y `validation.js`, conservando el escaneo de `index.html`.
2. En JavaScript, usar clases Tailwind completas y literales para los estados dinámicos; no construir utilidades concatenando fragmentos. Si una clase no puede detectarse así, declarar explícitamente solo el conjunto finito requerido.
3. Ejecutar la compilación y comprobar que el CSS generado contiene clases representativas de los estados de error, éxito, foco y diseño del formulario.
4. Evitar framework, CDN o CSS personalizado innecesario. Mantener el CSS generado como artefacto local ignorado por Git.

## 6. Fase 4: Validación y documentación

**Cobertura:** los 12 criterios de aceptación.

1. Verificar campos, mensajes, opciones, errores, conservación de valores y límites de entrada según RF-04 y los casos límite.
2. Comprobar comentarios en 500 y 501 caracteres, confirmación completa y comportamiento con JavaScript deshabilitado.
3. Verificar por teclado la navegación, grupos de radios, foco y corrección de errores; revisar con lector de pantalla los anuncios relevantes.
4. Revisar móvil, escritorio, zoom y anchos estrechos, sin desbordamientos ni solapamientos.
5. Confirmar que un envío válido no produce solicitudes de red ni escrituras en almacenamiento local. Usar datos ficticios, no datos personales reales.
6. Ejecutar `npm run build` y revisar sintaxis con `node --check validation.js`. Si faltan dependencias, seguir el README y ejecutar `npm ci` desde `uis/website/`.
7. Servir únicamente `uis/website/`, nunca la raíz del monorepo. Comprobar la página, el CSS y los recursos relevantes por HTTP, verificando contenido además del código de respuesta.
8. Actualizar el README de la web para reflejar la inclusión del formulario y cómo ejecutarlo y comprobarlo. Registrar la aceptación del formulario en una matriz separada, por ejemplo `uis/website/docs/talent-form-acceptance.md`, para mantener diferenciada la matriz existente de la landing.
9. No añadir una suite de tests ni hacer público un puerto: no lo requiere esta especificación y las reglas del proyecto indican no añadir pruebas sin petición.
10. Preservar cambios preexistentes; revisar el diff y ejecutar `git diff --check`. No crear commits sin petición explícita.

**Límite de reparación:** ante fallos, hacer como máximo dos intentos de corrección por problema; después, documentar el resultado y esperar, según las instrucciones del proyecto.

## 7. Archivos previstos

Rutas relativas al repositorio. Esta lista describe trabajo futuro, no archivos ya implementados.

| Archivo                                      | Acción propuesta                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `uis/website/application.html`               | Implementar estructura, contenido y once campos.                                                                              |
| `uis/website/validation.js`                  | Implementar validación accesible, contador y éxito simulado.                                                                  |
| `uis/website/styles.css`                     | Incorporar las fuentes Tailwind del formulario y del JavaScript.                                                              |
| `uis/website/README.es.md`                   | Documentar el formulario, ejecución y comprobaciones reales.                                                                  |
| `uis/website/docs/talent-form-acceptance.md` | Registrar estado y evidencia de los 12 criterios del formulario.                                                              |
| `uis/website/index.html`                     | Verificar que los enlaces existentes siguen apuntando al formulario; modificar solo si se detecta una discrepancia necesaria. |
| `uis/website/package.json`                   | Usar los scripts actuales; modificar solo si una necesidad concreta lo justifica.                                             |
| `uis/website/assets/styles.css`              | Regenerar localmente como artefacto ignorado; no añadirlo al control de versiones.                                            |

## 8. Relación con los criterios de aceptación

| Criterios de `spec.md` | Verificación prevista                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| CA-01–CA-04            | Campos, reglas, mensajes, asociación accesible y contador, incluidos límites y conservación del texto. |
| CA-05                  | Aviso comercial y enlace `mailto:`; distinción entre candidatos y empresas.                            |
| CA-06                  | Éxito con ambos párrafos y enlace correcto; ausencia de solicitudes de red y persistencia.             |
| CA-07–CA-08            | Sin JavaScript no hay envío ni éxito; ausencia de botón de limpiar y de política inventada.            |
| CA-09–CA-10            | Navegación desde la landing y de regreso; español, teclado, lector de pantalla y responsive.           |
| CA-11                  | CSS compilado incluye las clases del HTML y las utilizadas dinámicamente.                              |
| CA-12                  | No se transmite ni almacena información personal.                                                      |

El plan queda como propuesta. No se han ejecutado compilaciones, pruebas ni verificaciones del formulario como resultado de su elaboración.
