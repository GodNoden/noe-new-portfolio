# Propuesta de favicon — «N Degradado» (rosa → violeta)

`app/icon.svg` es la fuente; aquí quedan las copias para revisión y la
evidencia. Todo se regenera con:

```bash
pnpm icons:generate   # .ico + apple-icon + PNGs del manifest
pnpm icons:preview    # previews a 16/32/64 px + metrics.md
```

| Archivo | Qué es |
| --- | --- |
| `propuesta-n-degradado.svg` | **Activo**: copia exacta de `app/icon.svg` |
| `previews/` | Renders a 16/32/64 px sobre claro y oscuro + `metrics.md` |

Los SVG descartados ya no viven en el repo (se limpiaron junto con los restos
de la plantilla de `create-next-app`): su memoria es el registro de diseño de
abajo.

## La idea

**Un monograma "N" a pelo**: sin tile y sin contorno, solo la letra con un
degradado **rosa → violeta que sigue su diagonal** (rosa arriba-izquierda,
donde entra la mirada; violeta abajo-derecha, cerrando el trazo).

Sin contorno a propósito — y medido: el degradado **se sostiene solo** sobre
ambos fondos. El contorno negro que llevaba era una muleta de contraste que
además robaba 1 px por lado de los contadores y daba ese aire de clipart con
borde. Quitado, la letra respira y los huecos se abren.

La pareja de colores está **medida, no elegida a ojo**. Regla aplicada: cada
extremo del degradado debe mantenerse por encima de 3:1 tanto sobre barra de
pestañas clara (`#fafafa`) como oscura (`#18181b`):

| Pareja | Extremo A (claro/oscuro) | Extremo B (claro/oscuro) | Peor caso | Veredicto |
| --- | --- | --- | --- | --- |
| **`#ec4899` → `#8b5cf6`** (pink-500 → violet-500) | 3.38 / 5.02 | 4.06 / 4.18 | **3.38** | **activa** |
| `#f43f5e` → `#9333ea` (rose-500 → purple-600) | 3.52 / 4.83 | 5.16 / 3.29 | 3.29 | Casi: el violeta se apaga en oscuro |
| `#db2777` → `#7c3aed` (pink-600 → violet-600) | 4.40 / 3.85 | 5.46 / 3.11 | 3.11 | En oscuro pierde chispa |
| `#f472b6` → `#a78bfa` (pink-400 → violet-400) | 2.54 / 6.69 | 2.61 / 6.51 | 2.54 | Se lava en fondo claro |

La elegida no solo gana en el peor caso: **todo el recorrido del degradado se
mantiene en la banda 3.4–5.0:1** sobre claro y 4.2–5.0:1 sobre oscuro (el punto
medio `#bb52c7` mide 4.11 / 4.45, y el extremo violeta está casi en el punto
exacto de equilibrio: 4.06 de un lado, 4.18 del otro). Con eso, el borde negro
sobra.

Medido a 16 px (`previews/metrics.md`): ~59% del lienzo es tinta, y de ella el
78% mantiene ≥3:1 sobre claro y el 79% sobre oscuro — el resto son los píxeles
de antialias del borde de la letra. La escala va a propósito a 3:1 (objeto
gráfico) y no a 4.5:1 (texto): no hay color que aguante 4.5 sobre blanco *y*
negro, y subirlo en un fondo es bajarlo en el otro.

## Decisiones de forma

- **Sin tile y sin contorno.** Un tile oscuro se funde en barra oscura y uno
  claro en clara; el contorno era ruido visual. La letra va a pelo.
- **Contadores grandes (28u) y tallos de 11u.** La primera "N" pesada (tallos
  15u) se leía como bloque a 16 px: los huecos se cerraban.
- **Polígono cerrado, nunca trazo** (regla de la casa): ni `stroke` ni picos
  de miter.
- **El degradado es la única concesión decorativa**, y aun así limitado por la
  regla de contraste de arriba.

## Registro de diseño (descartos)

| Candidato | Qué era | Por qué no |
| --- | --- | --- |
| Cara `#f59e0b` | Ámbar de los badges "en progreso" | 2.06:1 sobre claro: la cara se lava |
| Cara `#b45309` | Ámbar profundo | 2.85:1 sobre oscuro: se apaga |
| Cara oscura + contorno ámbar | Inversión de la propuesta | Sobre oscuro, neón esquelético (35% de tinta legible) |
| Sticker de 3 capas | Contorno + anillo claro + cara | Los anillos sellaban los contadores a 16 px |
| N pesada con contorno | Tallos 15u + contorno negro | Contadores como rendijas de 1–2 px y aire de clipart |
| Degradados rosa/violeta más puros o más profundos | Ver tabla de arriba | Un extremo siempre se caía por debajo de 3:1 |

## Cómo juzgarla tú

Abre `previews/icon-16-claro-x8.png` y `previews/icon-16-oscuro-x8.png`: el
render real a 16 px ampliado ×8 con vecino más próximo — lo que verá tu ojo,
píxel por píxel, en una barra de pestañas clara y en una oscura. Los archivos
sin `-x8` son el tamaño real. La regla de la casa manda: si a 16 px no se lee,
no vale.

¿Quieres solo rosa o solo morado? Es cambiar el `fill="url(#g)"` de la cara por
un color plano de la tabla de arriba y correr `pnpm icons:generate` — las dos
versiones sólidas seguras están en la primera tabla (columna Extremo A y B), y
la variante ámbar se regenera en un segundo con la misma silueta y cara
`#d97706`.
