# Especificación: Formulario de Registro de Talento de Nexova

**Identificador:** 002-talent-form-nexova
**Estado:** Propuesta funcional, sin implementación
**Alcance:** Formulario público de registro de profesionales interesados en oportunidades laborales. No incluye el recorrido comercial de empresas que quieran contratar servicios de Nexova.

## 1. Qué debe hacer

Ofrecer a profesionales una forma clara, accesible y responsive de introducir sus datos de contacto y preferencias laborales, validarlos en el navegador y mostrar una confirmación al completar el formulario. El envío será simulado: los datos no se transmitirán ni almacenarán.

Fuentes: [BRIEFING.md](../../uis/website/BRIEFING.md) define los requisitos funcionales y el contenido; [DESIGN.md](../../uis/website/docs/DESIGN.md) orienta el diseño y la interacción. Si ambos documentos discrepan, prevalece el briefing, junto con las decisiones funcionales recogidas en esta especificación. La [especificación de la landing](../001-website-nexova/spec.md) define el recorrido de entrada desde el sitio corporativo.

## 2. Quién usa esto

- **Profesionales:** personas en búsqueda activa o pasiva de oportunidades laborales que desean presentar su perfil a Nexova.
- **Empresas interesadas en servicios:** visitantes que llegan al formulario por error y necesitan un enlace visible al contacto comercial, no un campo ni flujo de solicitud B2B.
- **Nexova:** equipo de selección que, en una futura integración fuera de este alcance, podría revisar candidaturas recibidas.

## 3. Historias de usuario

- Como profesional, quiero registrar mis datos de contacto, experiencia y preferencias para que Nexova pueda considerar mi perfil para oportunidades actuales o futuras.
- Como candidato, quiero recibir mensajes de validación claros junto a los campos para corregir los errores sin perder lo que ya he escrito.
- Como usuario de teclado o lector de pantalla, quiero completar el formulario, entender los errores y conocer el resultado sin depender solo del color o de interacciones con ratón.
- Como persona interesada en contratar servicios de Nexova, quiero identificar que este formulario es para candidatos y encontrar el correo comercial.
- Como usuario, quiero recibir una confirmación inequívoca de que la validación terminó, sin que se afirme que mis datos fueron transmitidos o almacenados.

## 4. Requisitos funcionales

- **RF-01. Propósito y audiencia:** presentar el formulario como registro de profesionales para oportunidades laborales. No ofrecer campos para empresas ni inducir a pensar que el formulario solicita servicios comerciales.
- **RF-02. Integración con la landing:** permitir llegar al formulario desde la navegación y los CTA de talento de la landing. Incluir un enlace para regresar a la landing.
- **RF-03. Aviso para empresas:** mostrar de forma visible el texto «¿Eres una empresa buscando talento? Escríbenos a contacto@nexova.com», con `contacto@nexova.com` como enlace `mailto:`. No inventar otras vías de contacto.
- **RF-04. Campos y validación:** mostrar estos 11 campos en español. Los campos obligatorios deben identificarse como tales y asociarse programáticamente con sus etiquetas y mensajes de error:

  | Campo                     | Tipo       | Requisito y validación                                                                                                                                                                    | Obligatorio | Mensaje de error                                                     |
  | ------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
  | Nombre completo           | `text`     | Debe contener al menos dos palabras no vacías, correspondientes a nombre y apellido.                                                                                                      | Sí          | «El nombre debe contener al menos nombre y apellido»                 |
  | Email                     | `email`    | Debe tener formato de email válido, con `@` y un dominio válido.                                                                                                                          | Sí          | «Ingresa un email válido (ejemplo: nombre@empresa.com)»              |
  | Teléfono                  | `tel`      | Formato internacional flexible: `+`, código de país de 1 a 3 dígitos y número de 6 a 14 dígitos. Se permiten espacios o guiones entre grupos; no se requiere una longitud fija de grupos. | Sí          | «El teléfono debe incluir código de país (ejemplo: +34 612 345 678)» |
  | País de residencia        | `select`   | Opciones: España, Estados Unidos y Otro. Debe seleccionarse una opción distinta del marcador inicial.                                                                                     | Sí          | «Selecciona tu país de residencia»                                   |
  | Años de experiencia       | `number`   | Número entero entre 0 y 50, inclusive.                                                                                                                                                    | Sí          | «Los años de experiencia deben estar entre 0 y 50»                   |
  | Sector de interés         | `select`   | Opciones: Tecnología, Retail, Servicios Financieros, Consultoría y Otro. Debe seleccionarse una opción distinta del marcador inicial.                                                     | Sí          | «Selecciona el sector de tu interés»                                 |
  | Nivel de inglés           | `select`   | Opciones: Básico, Intermedio, Avanzado y Nativo. Debe seleccionarse una opción distinta del marcador inicial.                                                                             | Sí          | «Indica tu nivel de inglés»                                          |
  | Disponibilidad            | `radio`    | Una opción obligatoria: Inmediata, 1 mes, 2-3 meses o Solo explorando.                                                                                                                    | Sí          | «Selecciona tu disponibilidad»                                       |
  | LinkedIn (URL del perfil) | `url`      | Campo opcional. Si se rellena, debe ser una URL válida que comience por `http://` o `https://`. No limitar el dominio a LinkedIn.                                                         | No          | «Si incluyes LinkedIn, debe ser una URL válida»                      |
  | Comentarios adicionales   | `textarea` | Campo opcional con máximo de 500 caracteres y contador visible.                                                                                                                           | No          | «Los comentarios no pueden exceder 500 caracteres (quedan X)»        |
  | Acepto política de datos  | `checkbox` | Debe marcarse para continuar. No añadir un enlace ni redactar una política no proporcionada.                                                                                              | Sí          | «Debes aceptar la política de tratamiento de datos para continuar»   |

- **RF-05. Validación interactiva:** validar los campos al perder el foco y al modificarlos una vez que se haya mostrado un error, y validar todos los campos al intentar enviar. Mostrar el error correspondiente junto al campo; eliminarlo cuando el valor sea válido. No borrar ni sustituir los valores introducidos durante la validación.
- **RF-06. Comentarios y contador:** actualizar el contador al escribir. Para hasta 500 caracteres, indicar caracteres usados y restantes. Si se superan 500, conservar el texto, indicar el exceso en el contador y bloquear el envío; el mensaje de error debe usar `quedan 0` (nunca un número negativo) y la variable `X` representa los caracteres restantes hasta el límite, limitada a cero. No truncar silenciosamente el contenido.
- **RF-07. Política de datos:** presentar el checkbox requerido sin enlace, texto legal adicional ni política inventada. Si no está marcado al validar, mostrar exactamente el mensaje especificado en RF-04.
- **RF-08. Acciones:** ofrecer «Enviar registro» como acción principal. No incluir un botón «Limpiar formulario».
- **RF-09. Envío simulado:** si todos los campos son válidos, impedir una transmisión real y cambiar a un estado de éxito en la página. No realizar solicitudes de red, enviar emails, guardar datos en local ni conservarlos en un backend.
- **RF-10. Confirmación de éxito:** mostrar el título «¡Gracias por tu interés en Nexova!» y el texto completo: «Hemos recibido tu información. Nuestro equipo de selección la revisará y te contactaremos en caso de que tu perfil encaje con alguna de nuestras oportunidades actuales o futuras.» Añadir también: «Mientras tanto, síguenos en LinkedIn para estar al día de nuestras vacantes y contenido sobre desarrollo profesional.», con «LinkedIn» como enlace a `https://linkedin.com/company/nexova`.
- **RF-11. JavaScript no disponible:** si JavaScript está deshabilitado, mostrar un aviso `<noscript>` que explique que el formulario necesita JavaScript y no permitir su envío. No afirmar que el registro se ha completado.
- **RF-12. Idioma:** toda la experiencia y sus mensajes deben estar en español. No se requiere selector ni traducción a otro idioma.

## 5. Requisitos no funcionales

- **RNF-01. Diseño:** utilizar Tailwind CSS y seguir el sistema visual de Nexova descrito en [DESIGN.md](../../uis/website/docs/DESIGN.md), sin sacrificar legibilidad ni funcionamiento para reproducir detalles decorativos.
- **RNF-02. Responsive:** diseñar mobile-first. En móvil, presentar los campos en una columna; en pantallas amplias, agrupar campos relacionados en columnas cuando el espacio lo permita. No debe haber desbordamiento horizontal, solapamientos ni controles difíciles de usar.
- **RNF-03. Accesibilidad:** cumplir WCAG 2.2 AA. Usar HTML semántico, etiquetas asociadas, agrupación accesible de radios, orden de tabulación lógico, foco visible, controles operables por teclado y mensajes comprensibles sin depender solo del color.
- **RNF-04. Anuncios de validación:** vincular cada error a su campo mediante `aria-describedby` o mecanismo equivalente y comunicar el estado inválido mediante `aria-invalid`. Los cambios de estado y la confirmación deben anunciarse a tecnologías de asistencia sin provocar anuncios repetitivos o intrusivos.
- **RNF-05. Seguridad y privacidad:** procesar la interacción localmente; no transmitir, registrar ni almacenar valores del formulario. No incluir analítica, seguimiento ni dependencias de terceros que recojan datos.
- **RNF-06. Tailwind:** asegurar que la configuración o el proceso de compilación escanee `application.html` y también las clases Tailwind utilizadas desde `validation.js`, para que las clases aplicadas dinámicamente no desaparezcan del CSS generado.

## 6. Casos límite

- **Campo obligatorio vacío:** mostrar el error específico del campo y mantener el resto de los valores introducidos.
- **Nombre con espacios sobrantes o múltiples:** ignorar espacios iniciales/finales y exigir al menos dos partes no vacías; un único nombre no es válido.
- **Email con formato incompleto:** rechazar, entre otros, valores sin `@` o sin dominio válido; no aceptar una cadena vacía como email válido.
- **Teléfono con prefijo ausente, código de país de más de tres dígitos o número con menos de seis o más de catorce dígitos:** mostrar el error de teléfono. Los espacios o guiones permitidos no cuentan como dígitos.
- **Experiencia decimal, negativa, superior a 50 o vacía:** rechazarla. Los valores 0 y 50 son válidos.
- **Select sin selección válida:** mantener el marcador inicial inválido hasta que se elija una opción permitida.
- **Ninguna disponibilidad seleccionada:** mostrar el error para el grupo de radios y permitir completar la selección con teclado.
- **LinkedIn vacío:** es válido. Si se rellena, rechazar URL sin esquema HTTP(S), esquema distinto o URL malformada; no exigir un dominio concreto.
- **Comentarios en el límite:** 500 caracteres son válidos; 501 o más se conservan, se informa del exceso, se muestra el error con «quedan 0» y se bloquea el envío.
- **Checkbox sin marcar:** no permitir el envío y mostrar el mensaje literal requerido, sin presentar una política inexistente.
- **JavaScript desactivado:** hacer visible el aviso sin script y evitar cualquier envío o mensaje de éxito.
- **Envío válido:** sustituir o actualizar el formulario con el estado de éxito y el enlace de LinkedIn; no mostrar datos personales introducidos en la confirmación.
- **Pantalla estrecha, zoom o navegación por teclado:** conservar el orden, la legibilidad y el acceso a todos los campos, errores y acciones.

## 7. Out of scope

Recepción, transmisión, almacenamiento o evaluación real de candidaturas; backend, API, base de datos, ATS, CRM, autenticación, emails de confirmación o seguimiento; publicación de una política de privacidad no proporcionada; panel interno para selección; carga de CV o documentos; campos distintos de los 11 especificados; solicitudes comerciales B2B desde este formulario; traducción a otros idiomas; analítica y gestión de campañas.

## 8. Criterios de aceptación

1. El formulario presenta los 11 campos definidos, con tipos, opciones, obligatoriedad y mensajes de error coincidentes con RF-04.
2. Se valida nombre con al menos dos palabras, email, teléfono flexible, enteros de experiencia de 0 a 50, selecciones requeridas, URL LinkedIn opcional con HTTP(S) y aceptación obligatoria del checkbox.
3. Los errores aparecen asociados al campo, se comunican de forma accesible, y los valores de otros campos no se pierden al validar.
4. El contador se actualiza en vivo; 500 caracteres se aceptan, mientras que 501 o más se conservan, muestran el exceso y bloquean el envío con el mensaje que termina en «quedan 0».
5. El aviso para empresas incluye el texto requerido y un enlace funcional `mailto:contacto@nexova.com`; no se confunde con el flujo de registro profesional.
6. Un envío válido presenta el título, los dos párrafos completos de éxito y el enlace de LinkedIn especificados, sin emitir una solicitud de red ni persistir los datos.
7. Sin JavaScript se muestra el aviso `<noscript>`, no se permite enviar el formulario y no aparece una confirmación de éxito.
8. No existe un botón «Limpiar formulario» ni un enlace o texto de política de datos inventado.
9. El recorrido puede iniciarse desde la landing y ofrece un enlace para volver a ella; la experiencia está íntegramente en español.
10. La interfaz es utilizable con teclado y lector de pantalla y se comprueba en móvil y escritorio sin desbordamientos ni solapamientos.
11. Tailwind incluye las clases presentes en `application.html` y las utilizadas dinámicamente por `validation.js` en el CSS generado.
12. No se recopila, transmite ni almacena información personal en esta entrega.
