# 08 — Prompt maestro para Claude Code

Usa este paquete como fuente de verdad para construir el portal de La 7 Barbería.

## Instrucción principal

Construye un portal web production-ready para **La 7 Barbería**, una barbería en Asturias, España.

Lee primero:

1. `docs/00_README_PAQUETE_REFERENCIA.md` (antes `README.md`)
2. `docs/01_PRODUCT_BRIEF.md`
3. `docs/02_DESIGN_SYSTEM.md`
4. `docs/03_CONTENT_ES.md`
5. `docs/04_FUNCTIONAL_REQUIREMENTS.md`
6. `docs/05_TECHNICAL_GUIDE.md`
7. `docs/06_SEO.md`
8. `docs/07_QA_CHECKLIST.md`
9. `docs/09_ASSET_MANIFEST.md`

Después inspecciona visualmente todas las imágenes de:
`references/final/`

## Prioridades

1. Fidelidad visual a las referencias finales.
2. Responsive excelente.
3. Conversión a Booksy y WhatsApp.
4. Performance.
5. Accesibilidad.
6. Código limpio y mantenible.

## Reglas obligatorias

- Todo el portal debe estar en español de España.
- No mostrar la fotografía del propietario.
- Todas las escenas de interior deben representar 3 sillones de barbería.
- No inventar dirección completa, horario, precios ni URL final de Booksy.
- Centralizar esos datos en configuración.
- Mantener la identidad negro + dorado.
- No copiar errores de texto que puedan existir dentro de imágenes generadas.
- El texto real del HTML debe venir de `03_CONTENT_ES.md`, no de OCR de los mockups.
- Booksy es el sistema de reserva.
- WhatsApp es el canal CTA de contacto.
- Usar el logo incluido en `references/final/`.

## Entregables esperados

- web responsive
- componentes reutilizables
- metadata SEO
- configuración centralizada
- README del proyecto
- `.env.example`
- imágenes optimizadas
- tests básicos o validaciones relevantes
- sin errores de TypeScript/lint/build

## Validación final

Antes de terminar:
- ejecuta build
- ejecuta lint
- revisa responsive
- revisa enlaces
- comprueba que no exista ningún dato inventado
- compara visualmente con las referencias
