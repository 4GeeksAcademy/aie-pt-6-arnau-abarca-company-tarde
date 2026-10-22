# Especificación: Landing Page de Nexova

**Identificador:** 001-website-nexova
**Estado:** Propuesta funcional, sin implementación
**Alcance:** Landing pública. El formulario tendrá una especificación independiente.

## 1. Qué debe hacer

Presentar Nexova, sus servicios y ventajas competitivas; facilitar el contacto de empresas y dirigir a profesionales hacia el registro de talento. La página debe ser responsive, accesible y estar optimizada para buscadores.

Fuentes: [BRIEFING.md](../../uis/website/BRIEFING.md) define el contenido; [DESIGN.md](../../uis/website/docs/DESIGN.md) orienta el diseño; [AGENTS.md](../../AGENTS.md) recoge las correcciones y salvaguardas acordadas. El checklist adicional del usuario también constituye un criterio de aceptación.

## 2. Quién usa esto

- **Empresas:** responsables de contratación que buscan headhunting, outsourcing o formación.
- **Profesionales:** candidatos activos o pasivos interesados en oportunidades laborales.
- **Marketing:** Carmen Ruiz y su equipo, responsables de revisar contenido, posicionamiento y captación.

## 3. Historias de usuario

- Como representante de una empresa, quiero entender los servicios para valorar si Nexova puede ayudarme.
- Como posible cliente, quiero conocer su experiencia y especialización para evaluar su credibilidad.
- Como profesional, quiero encontrar el acceso al registro de talento sin confundirlo con el contacto comercial.
- Como visitante desde móvil o mediante teclado o lector de pantalla, quiero acceder a todo el contenido y los enlaces.
- Como responsable de Marketing, quiero una página coherente con la marca y evaluable mediante auditorías externas.

## 4. Requisitos funcionales

- **RF-01. Estructura:** disponer de una página de entrada con HTML5 semántico y este orden: header, hero, servicios, por qué Nexova, contacto y footer.
- **RF-02. Header:** mostrar Nexova y navegación «Inicio», «Servicios», «Talento» y «Contacto». Los destinos deben ser coherentes y operativos; «Talento» debe dirigir al registro.
- **RF-03. Hero:** mostrar el titular «Construimos equipos excepcionales para empresas en crecimiento» y el subtítulo exacto del briefing. Incluir el CTA «Únete a nuestro banco de talento», dirigido al formulario.
- **RF-04. Servicios:** presentar Headhunting Ejecutivo, Outsourcing de Atención al Cliente y Formación Corporativa, conservando las descripciones del briefing. La garantía de reemplazo debe asociarse exclusivamente a headhunting. Distribuirlos en tres columnas en escritorio y una en móvil.
- **RF-05. Ventajas:** presentar 15 años de experiencia, presencia en España y Estados Unidos, más de 500 procesos exitosos y especialización en tecnología, retail y finanzas. Usar dos columnas en escritorio y una en móvil.
- **RF-06. Contacto:** mostrar enlaces utilizables para `contacto@nexova.com`, Valencia `+34 960 123 456` y Miami `+1 305 555 0191`.
- **RF-07. Footer:** incluir información de contacto, «© 2026 Nexova. Todos los derechos reservados.» y enlaces a LinkedIn e Instagram definidos en el briefing.
- **RF-08. SEO:** incluir idioma del documento, título descriptivo, metadescripción, jerarquía lógica de encabezados y marcado JSON-LD válido de tipo `Organization`, con los datos del briefing.
- **RF-09. Idioma:** utilizar español como idioma base de esta entrega. Un segundo idioma no es obligatorio.
- **RF-10. Integración futura:** conservar el enlace al formulario como contrato entre entregas. Si aún no está disponible, acordar un destino provisional antes de publicar; no dejar enlaces rotos ni destinos ficticios.

## 5. Requisitos no funcionales

- **RNF-01. Estilo:** utilizar clases utilitarias Tailwind, sin CSS personalizado innecesario, manteniendo coherencia visual con el diseño.
- **RNF-02. Responsive:** aplicar mobile-first y breakpoints apropiados para móvil, tablet y escritorio; evitar desbordamientos, solapamientos y contenido inaccesible.
- **RNF-03. Accesibilidad:** cumplir WCAG 2.2 AA: teclado, foco visible, navegación predecible, textos alternativos apropiados y ARIA cuando aporte información necesaria. Las imágenes decorativas deben tener `alt=""`.
- **RNF-04. Contraste y tipografía:** verificar los contrastes reales; no asumir válidas las cifras del diseño. Resolver las discrepancias entre tamaños declarados y utilidades Tailwind antes de implementar.
- **RNF-05. Ejecución:** documentar y comprobar un comando `npx` compatible con GitHub Codespaces.
- **RNF-06. Evaluación:** habilitar una URL pública mediante port forwarding y obtener al menos 80 en rendimiento con PageSpeed Insights, preferiblemente más de 90. Si no puede acceder, utilizar Lighthouse y conservar una captura del resultado.
- **RNF-07. Privacidad:** no recopilar datos personales, incluir secretos ni introducir integraciones de seguimiento como parte de esta entrega.

## 6. Casos límites

- **Formulario pendiente:** el acceso al registro necesita un destino provisional acordado; no se considerará validado el recorrido completo hasta disponer del formulario.
- **Pantallas estrechas o zoom:** navegación, textos y CTA deben seguir siendo legibles y utilizables.
- **Menú móvil desplegable:** si se incorpora, debe poder abrirse y cerrarse con teclado, comunicar su estado y gestionar el foco correctamente.
- **Imágenes no disponibles:** el contenido esencial y los enlaces deben seguir siendo comprensibles.
- **Contenido no confirmado:** no publicar las direcciones postales exactas ni una insignia de garantía genérica. La referencia al «mercado latinoamericano» queda pendiente de aclaración; no sustituirla ni ampliarla sin acuerdo.

## 7. Out of scope

Formulario, sus campos y validaciones; recepción o almacenamiento de candidaturas; backend, ATS, CRM y envío de emails; autenticación; backoffice; traducción completa; analítica y gestión de campañas. Tampoco se incluyen cambios de infraestructura ajenos a la ejecución y exposición solicitadas.

## 8. Criterios de aceptación

1. Todas las secciones y contenidos de RF-01 a RF-09 están presentes, en el orden requerido y con las correcciones de experiencia y copyright.
2. Navegación, contacto, redes sociales y CTA funcionan; cualquier dependencia pendiente del formulario queda documentada.
3. La página utiliza HTML semántico, un H1 principal, encabezados jerárquicos y alternativas de imagen adecuadas.
4. El diseño se comprueba en móvil, tablet y escritorio, sin solapamientos ni desplazamiento horizontal no intencionado.
5. Todos los controles funcionan mediante teclado y presentan foco visible; los contrastes cumplen los mínimos aplicables.
6. Los metadatos y el JSON-LD `Organization` son válidos y no contienen datos empresariales inventados.
7. El comando `npx` documentado funciona en Codespaces y la URL pública permite realizar la auditoría.
8. Se adjunta una captura de PageSpeed Insights o Lighthouse con rendimiento mínimo de 80, indicando herramienta, URL y modalidad evaluada.
9. No se implementa el formulario ni se recopilan datos personales como parte de esta funcionalidad.
