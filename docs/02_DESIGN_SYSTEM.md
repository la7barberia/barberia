# 02 — Sistema visual

## Identidad

Inspiración principal: referencias visuales incluidas en `references/final/`.

### Paleta aproximada

Usar variables CSS. Valores iniciales sugeridos:

```css
--color-bg: #080808;
--color-bg-soft: #101010;
--color-surface: #151515;
--color-gold: #D8A33B;
--color-gold-light: #F0C66A;
--color-bronze: #8C6338;
--color-text: #F4F1EA;
--color-text-muted: #B8B3AA;
--color-border: rgba(216, 163, 59, 0.38);
--color-whatsapp: #18A957;
```

Ajustar visualmente para aproximarse a las referencias.

## Tipografía

Combinar:

- Serif elegante para grandes titulares.
- Sans serif moderna para navegación, botones, etiquetas y cuerpo.

Opciones adecuadas:
- Titulares: Cormorant Garamond, Playfair Display o equivalente.
- UI/cuerpo: Inter, Manrope, DM Sans o equivalente.

No usar más de dos familias.

## Logo

Referencia:
`references/final/la7barberia_logo_instagram.png`

Uso:
- cabecera
- footer
- favicon/OG si se genera una versión simplificada
- redes sociales

La versión del logo es dorada sobre fondo negro.

## Fotografía

Estética:

- luz cálida
- negros profundos
- dorado
- madera oscura
- cuero
- espejos retroiluminados
- vegetación discreta
- sensación premium

### Regla crítica

Las imágenes del interior deben representar **3 sillones de barbería**, no más.

No utilizar la fotografía del propietario en el sitio.

## Componentes

### Botón principal
- fondo dorado
- texto negro
- icono discreto
- hover con brillo/contraste controlado
- label preferente: `Reservar en Booksy`

### Botón secundario
- fondo negro
- borde dorado
- texto blanco
- label: `Hablar por WhatsApp`

### WhatsApp
Solo usar verde como acento funcional; no convertirlo en color dominante del branding.

### Tarjetas
- fondo oscuro
- borde fino dorado
- radios moderados
- fotografía superior
- icono lineal dorado
- título serif o semibold
- descripción breve

## Responsive

Desktop:
- ancho de contenido aproximado 1200–1440 px
- hero de gran impacto visual

Tablet:
- reducir columnas progresivamente

Mobile:
- CTA Booksy y WhatsApp muy visibles
- navegación compacta
- servicios en carrusel horizontal o grid vertical
- barra CTA inferior sticky opcional, respetando safe-area
