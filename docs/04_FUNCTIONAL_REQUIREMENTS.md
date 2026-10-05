# 04 — Requisitos funcionales

## 1. Booksy

Toda acción de reserva debe abrir la URL oficial de La 7 Barbería en Booksy.

Como todavía no se dispone de la URL definitiva del establecimiento:

```ts
export const BOOKSY_URL = process.env.NEXT_PUBLIC_BOOKSY_URL || "#";
```

Nunca enlazar de forma definitiva a la página genérica de categoría de barberías.

Puntos CTA mínimos:
- header
- hero
- cada servicio
- sección de reserva
- CTA final
- mobile sticky bar

## 2. WhatsApp

Número:
`+34 643 67 53 76`

Formato de enlace:
`https://wa.me/34643675376`

Mensaje sugerido:
`Hola, he visto la web de La 7 Barbería y quería hacer una consulta.`

Codificar el texto en URL.

## 3. Instagram

Cuenta:
`@la7barberia`

URL conocida:
`https://www.instagram.com/la7barberia/`

Abrir enlaces externos de forma segura.

## 4. Teléfono

Usar:
`tel:+34643675376`

## 5. Email

Usar:
`mailto:la7barberia@gmail.com`

## 6. Galería

Crear sección preparada para fotos reales.

Mientras no existan fotografías definitivas:
- usar las referencias visuales como guía
- no presentarlas como fotos reales del local si son renders/conceptos

Debe existir arquitectura sencilla para reemplazar imágenes sin tocar la estructura.

## 7. FAQ

Preguntas iniciales:

- ¿Cómo reservo mi cita?
- ¿Puedo escribir por WhatsApp?
- ¿Dónde estáis?
- ¿Qué servicios ofrecéis?
- ¿Vendéis productos?
- ¿Cuánto dura cada servicio?

Cuando falten datos objetivos, la respuesta debe dirigir a Booksy o WhatsApp sin inventar.

## 8. Navegación

Preferencia por one-page con anchors:
- #inicio
- #servicios
- #galeria
- #reserva
- #nosotros
- #contacto

Puede existir `/servicios` si se considera necesario, pero no es obligatorio para MVP.

## 9. Formularios

No crear formulario complejo en MVP si WhatsApp y Booksy cubren la necesidad.

## 10. Analytics

Preparar puntos de evento para:
- click_booksy
- click_whatsapp
- click_phone
- click_email
- click_instagram

No acoplar a un proveedor concreto hasta que se defina.
