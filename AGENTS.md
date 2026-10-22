# Instrucciones del proyecto

Estas instrucciones se aplican a todo el monorepo. Conserva las convenciones locales de cada carpeta y limita cada tarea al alcance solicitado.

## Contexto obligatorio

Antes de empezar cualquier tarea, lee estos documentos:

- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `memory-bank/progress.md`

Lee también el README de la carpeta o componente que vayas a modificar. Consulta `CONTEXT.es.md` y los documentos de `contexts/nexova/` cuando necesites datos o reglas del negocio. Trata las recomendaciones técnicas como propuestas hasta que una implementación o decisión documentada las confirme.

## Alcance y protección

- Respeta la organización del monorepo descrita en `README.es.md`; documenta cada aplicación, servicio, agente o pipeline en su área correspondiente.
- Inspecciona el estado y los cambios existentes antes de editar. Preserva el trabajo del usuario y no lo incluyas en tu cambio ni en un commit.
- No introduzcas secretos, credenciales ni datos personales reales en código, ejemplos, logs o documentación.
- No modifiques, elimines ni reemplaces sin autorización explícita del usuario estos archivos o recursos:
  - `CONTEXT.es.md`, `company-choice.md`, `contexts/nexova/**` y `memory-bank/**`.
  - `data/raw/**` y otros datos fuente originales.
  - Credenciales, secretos y archivos que los contengan.
  - Configuración de entorno, seguridad, infraestructura o despliegue, incluidos `.devcontainer/**`, `infra/**` y manifiestos de despliegue en la raíz, como `docker-compose.yml`.
- Una petición explícita que identifique el archivo o recurso y el cambio solicitado cuenta como autorización; no pidas confirmación redundante. Nunca expongas el valor de un secreto.
- Esta lista es una salvaguarda recomendada para el proyecto, no una afirmación de que ya exista una política formal. No bloquees cambios normales de código que formen parte de una solicitud explícita.

## Web de Nexova: hallazgos de la auditoría

Esta sección se aplica solo a `uis/website/**`. La auditoría compara `uis/website/BRIEFING.md` con `uis/website/docs/DESIGN.md`; no implica que la implementación esté validada.

### Alcance y fuentes

- Implementa la landing y el formulario en fases separadas. Conserva el enlace entre ambas páginas y define su destino provisional si el formulario aún no está disponible.
- Usa el briefing para los requisitos funcionales y de contenido, y el diseño como guía visual. Una omisión en el diseño no elimina un requisito del briefing. Aplica también los criterios de aceptación adicionales indicados por el usuario.
- Correcciones ya acordadas y reflejadas en ambos documentos: 15 años de experiencia, fundación en 2011 y copyright 2026. No recuperes las referencias antiguas a 12 años o copyright 2025.
- Define un idioma base coherente para ambas páginas; el español es la propuesta de partida. Un segundo idioma es opcional y no debe reducir la calidad del idioma base.

### Landing y contenido

- El diseño omite SEO y el marcado Schema.org obligatorio. Incluye ambos; utiliza el tipo `Organization` y los datos del JSON del briefing.
- El CTA del hero debe decir "Únete a nuestro banco de talento" y enlazar al formulario. El diseño usa "Únete al talento" en el header; tratar esa variante abreviada como propuesta, no como sustitución del CTA requerido.
- Conserva el orden de secciones del briefing y las dos columnas de "Por qué Nexova" en escritorio, adaptadas a una columna en móvil; el diseño enumera los argumentos sin fijar esa distribución.
- Las direcciones postales exactas del diseño no están respaldadas por el briefing. No las publiques sin confirmación. La insignia de garantía del hero tampoco tiene contenido definido: no extiendas a todos los servicios la garantía de reemplazo propia de headhunting.
- La referencia al "mercado latinoamericano" no queda explicada por las sedes en Valencia y Miami. Mantén este punto pendiente de aclaración; no inventes presencia ni sustituyas el texto sin acuerdo.

### Coherencia visual y accesibilidad

- No des por verificados los contrastes de la tabla del diseño. En particular, `#D5DFE6` sobre `#F5F8FA` no alcanza el 3,2:1 declarado. Cuando un borde sea necesario para identificar un control, utiliza una combinación que alcance el contraste aplicable; distingue esos bordes de los divisores decorativos.
- Resuelve antes de implementar las discrepancias entre tamaños tipográficos y utilidades Tailwind. Por ejemplo, el H1 especifica 44px en escritorio, pero `md:text-5xl` equivale a 48px con la escala estándar. También hay diferencias en H2, cuerpo y botones. No asumas que ambas columnas son equivalentes.

### Formulario

- Usa la etiqueta "Email" del briefing, no "Email profesional": el registro admite candidatos activos o pasivos y no exige correo corporativo.
- Conserva los 11 campos, opciones, reglas y mensajes del briefing. El éxito debe incluir también el párrafo omitido en el diseño: "Mientras tanto, síguenos en LinkedIn para estar al día de nuestras vacantes y contenido sobre desarrollo profesional."
- El envío es simulado. No incorpores persistencia ni envío real de datos como parte de esta entrega. Mantén visible el aviso que dirige a las empresas a `contacto@nexova.com`.

## Flujo obligatorio antes de un commit

Sigue estos pasos en orden antes de crear cualquier commit:

1. Lee los tres documentos del memory bank y los README y fuentes de contexto aplicables.
2. Revisa `git status --short --untracked-files=all`, `git diff` y `git diff --cached`. Identifica cambios preexistentes y archivos nuevos; mantenlos intactos y fuera del commit salvo que el usuario los haya incluido explícitamente en la solicitud.
3. Confirma el alcance autorizado y modifica solo lo necesario para cumplirlo.
4. Ejecuta las pruebas y comandos de validación documentados por el componente afectado o declarados en sus manifests. No inventes comandos ni asumas que hay pruebas globales. Si no hay checks aplicables, indícalo.
5. Ejecuta `git diff --check` y corrige cualquier problema introducido por tu cambio.
6. Revisa el diff completo y los archivos nuevos para comprobar el alcance, el comportamiento, la ausencia de secretos y datos personales reales, y que no se hayan incluido cambios ajenos.
7. Solo si el usuario solicitó crear un commit, stagea únicamente los archivos de tu cambio autorizado. No stages cambios preexistentes.
8. Antes del commit, ejecuta `git diff --cached --check` y revisa `git diff --cached` y `git status` para confirmar exactamente qué se incluirá.
9. Informa qué validaciones ejecutaste y cuáles no estaban disponibles. No crees un commit si el usuario no lo solicitó expresamente.

Actualmente el repositorio no declara un comando global de test, lint, build o typecheck. Comprueba los scripts y la documentación del componente afectado antes de elegir validaciones.
