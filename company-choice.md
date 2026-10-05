# Selección de la empresa
- Nexova
## Razón de la elección
Como Product Manager con background en Business Administration considero que Nexova me da exposición a conceptos muy horizontales que luego seré capaz de aplicar en varios casos de uso. Por ejemplo:
- RAG: ¿Por qué decidimos construir un feature a través de recuperar conocimiento interno?
- Semantic Search: encontrar feedback relacionado
- Recommendation: recomendaciones de las siguientes acciones de producto
- Scoring: priorización de oportunidades
- Agents: Investigar problema -> analytics -> research -> propuesta
- Workflows: Automatizar procesos repetibles de producto
- Natural-language analytics: investigar métricas a nivel conversacional
- Monitoring: Detectar cambios importantes en métricas
También me gustaría ser capaz de crear un sistema de agentes para pasar de discovery a prototipado en código pre-producción de cara al lanzamiento de nuevos features.

## Los departamentos cuyos problemas encuentro interesantes
1. Operaciones de Selección (negocio principal): Generar un pipeline asistido con IA con scoring y ranking automático de CVs, tener un RAG sobre la bbdd de candidatos y un chatbot para consultar estados transforma el core business y la principal fuente de creación de valor. También la automatización de emails de seguimiento, tanto con candidatos como con clientes (empresas), sigue siendo transformador a nivel de modelo de negocio de la compañía.
2. Atención al cliente automatizada: Generar un chatbot para la resolución del 40% de problemas, usando RAG, búsqueda semántica y un dashboard en tiempo real para el análisis de sensibilidad de los tickets.
3. Comunicación y Marketing: rediseñar la web con una buena optimización SEO/GEO. Generar un pipeline de contenido AI y dashboard de Marketing Metrics.
4. Ventas: automatizar outreach/prospecting, obtener alertas de inactividad, tener agentes que sugieran el ángulo de propuesta más adecuada para cada situación. 

## El Reto de automatización de IA que más ganas tengo de construir
- Conectar los agentes que gestionan los departamentos verticales (ejemplo: atención al cliente, comunicación y mktg, ventas) a un orquestrador para poder reportar automáticamente al CEO. También, que este agente este conextado con el Business Principal: Operaciones de Selección (principal fuente de ingresos) y que leadership pueda tener una foto de la evolución de su core.

## My AI Agent Idea
- Descripción: Un agente que cree un pool de candidatos para que otro agente pueda evaluar los datos de los CVs.
- Qué información necesita y que produciría:
1. Una descripción de trabajo (oferta) que podría también generarse con IA paralelamente.
2. Acceso a las páginas web principales para publicar autónomamente una oferta. Ejemplo: linkedin, infojobs.
3. Acceso a las candidaturas recibidas en los portales y a los CVs adjuntados por los candidatos.
4. Centralización de las candidaturas y los archivos en un sistema centralizado.
- El objetivo es habilitar que otro agente se encargue de otra función. Por ejemplo: scoring y screening de candidatos -lo cual requeriría el desarrollo de otro agente.
