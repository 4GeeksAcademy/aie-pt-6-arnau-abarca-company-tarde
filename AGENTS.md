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
