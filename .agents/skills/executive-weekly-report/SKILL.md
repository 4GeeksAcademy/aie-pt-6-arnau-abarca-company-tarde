---
name: executive-weekly-report
description: Drafts a concise weekly executive report from user-provided aggregate KPIs. Use when preparing a leadership update for a specified reporting period.
---

# Informe ejecutivo semanal

## Objetivo

Convertir KPIs agregados proporcionados por el usuario en un borrador semanal, conciso y verificable para dirección. No conectes sistemas, inventes métricas ni atribuyas causas que los datos no demuestren.

## Cuándo usarla

Úsala para preparar un informe de estado para un periodo semanal concreto. No la uses para obtener datos de HubSpot, Zendesk, el ATS, Google Workspace u otros sistemas; las integraciones no están definidas.

## Inputs

Requiere:

- `period_start` y `period_end`: fechas inclusivas del periodo informado.
- Una o más métricas, cada una con `area`, `name`, `current_value` numérico y `unit`.

Puede incluir:

- `previous_value` y `previous_period` para una comparación comparable.
- `target_value` y `direction`: `higher_is_better`, `lower_is_better` o `equals_target`.
- `source` para identificar la procedencia de la métrica.
- `incidents` y `decisions`: notas agregadas, con área y fuente cuando estén disponibles.

Las métricas comparadas deben tener la misma unidad, definición y periodos comparables. Si no se indica un periodo anterior o hay dudas sobre comparabilidad, no calcules la variación. Acepta solo datos agregados; no incluyas nombres, correos ni otros identificadores personales.

Si falta el periodo o no hay métricas, no redactes el informe: devuelve los campos que faltan. Si faltan otros datos opcionales, continúa e indica qué análisis no se pudo hacer.

## Procedimiento

1. Valida el periodo y los campos requeridos. Detecta métricas duplicadas, unidades incompatibles y valores contradictorios.
2. No combines ni resuelvas contradicciones por cuenta propia. Señala la métrica afectada y omite sus cálculos hasta que se aclare.
3. Para métricas comparables, calcula `variación absoluta = current_value - previous_value`. Si la unidad es `%`, expresa esta diferencia en puntos porcentuales.
4. Calcula `variación relativa = (current_value - previous_value) / previous_value * 100` solo si los periodos y unidades son comparables y `previous_value` no es cero. Redondea el resultado a un decimal; si el valor anterior es cero, indica que la variación relativa no es calculable.
5. Evalúa el objetivo solo si están presentes `target_value` y `direction`: `higher_is_better` se cumple cuando el valor actual es mayor o igual al objetivo; `lower_is_better`, cuando es menor o igual; `equals_target`, cuando es igual. Si falta cualquiera, indica “sin evaluación de objetivo”.
6. Redacta el informe usando únicamente métricas e incidencias recibidas. Distingue hechos, comparaciones y datos faltantes; no infieras causalidad ni añadas recomendaciones sin respaldo explícito.
7. Antes de responder, verifica periodo, cobertura de métricas, cálculos, consistencia entre resumen y tabla, trazabilidad de afirmaciones y ausencia de datos personales.

## Formato de salida

1. **Periodo:** fechas de inicio y fin.
2. **Resumen ejecutivo:** hallazgos respaldados por los datos; si no hay comparación posible, dilo.
3. **KPIs:** tabla con área, métrica, valor actual y unidad, variación cuando sea calculable, estado del objetivo cuando sea evaluable y fuente si fue proporcionada.
4. **Incidencias y decisiones:** solo las suministradas; si no hay, indícalo.
5. **Datos faltantes o limitaciones:** campos, comparaciones u objetivos que no pudieron evaluarse.

## Criterios de aceptación

- El informe usa exactamente el periodo solicitado y no incorpora datos fuera de él.
- Cada KPI de entrada aparece una vez, con el valor y la unidad originales; no se inventan KPIs.
- Las variaciones absolutas coinciden con la resta. Para unidades porcentuales se muestran en puntos porcentuales; las variaciones relativas se redondean a un decimal.
- Una variación relativa con valor anterior cero, unidad distinta, definición no comparable o periodo no especificado se marca como no calculable.
- El estado de un objetivo solo aparece cuando se proporcionan objetivo y dirección, y coincide con la regla correspondiente.
- Los datos ausentes o contradictorios se identifican; no se sustituyen por estimaciones ni se resuelven silenciosamente.
- Las afirmaciones numéricas son rastreables a un KPI o incidencia de entrada, y el resumen no contradice la tabla.
- No se revelan identificadores personales ni se afirman causas no demostradas por los datos.

## Casos de prueba sintéticos

- KPI `resoluciones`, actual `15` tickets, anterior `20` tickets en un periodo comparable, objetivo `18`, dirección `lower_is_better`: variación absoluta `-5`, relativa `-25.0 %`, objetivo cumplido.
- KPI `resoluciones en menos de 24 h`, actual `55 %`, anterior `50 %` comparable, objetivo `60 %`, dirección `higher_is_better`: variación absoluta `+5 puntos porcentuales`, relativa `+10.0 %`, objetivo no alcanzado.
- KPI `nuevos clientes`, actual `3`, anterior `0`, misma unidad y periodo comparable: variación absoluta `+3`; variación relativa no calculable.
- KPI sin valor anterior: no mostrar variación. KPI con unidad distinta entre periodos, periodo anterior ausente o valores contradictorios: señalar limitación y no calcular ni combinar.
- Input que contenga nombres o correos: no repetirlos en el informe.
