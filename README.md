# Prowindows Limitada — Sitio web

Sitio web de **Prowindows Limitada**, empresa de Coquimbo que fabrica e instala ventanas de aluminio, PVC, termopaneles y cierres de terraza a medida en la Región de Coquimbo.

Es un sitio estático: HTML, CSS y JavaScript sin frameworks ni proceso de compilación.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Inicio: productos, carrusel de obras con filtros, videos, nosotros y contacto |
| `ventanas-aluminio.html` | Ventanas de aluminio: ventajas, tipos de apertura, vidrios, colores, comparativa con PVC |
| `pvc.html` | Ventanas de PVC: perfiles, diagrama del perfil por dentro, aperturas, mantención |
| `termopanel.html` | Termopanel (DVH): diagrama de sus partes, aislación térmica y acústica, seguridad, normativa |
| `cierre-terrazas.html` | Cierre de terrazas: materiales, vidrios, techos, permisos y recomendaciones |

## Estructura

```
├── index.html, pvc.html, ...   Páginas
├── style.css                   Estilos de todo el sitio
├── script.js                   Menú, carrusel de obras, lightbox y videos
├── obras-data.js               Listado de fotos de obras que muestra el carrusel
├── obras/                      Fotos en tamaño grande y videos
│   └── thumbs/                 Miniaturas de las fotos
├── logo.png, logo-texto.png    Logos
└── package.json                Script para levantar el sitio en local
```

## Ver el sitio en local

Necesitas [Node.js](https://nodejs.org/) instalado.

```bash
npm run dev
```

Luego abre <http://localhost:3000>. También puedes abrir `index.html` directamente en el navegador, aunque los videos y algunas rutas funcionan mejor con el servidor.

## Agregar una obra al carrusel

1. Copia la foto en tamaño grande a `obras/` y una versión reducida (unos 720 px de ancho) con **el mismo nombre** a `obras/thumbs/`.
2. Agrega una línea en `obras-data.js`:

   ```js
   {"img": "casa-nueva-01.jpg", "title": "Casa Nueva", "subtitle": "Ventanas de PVC", "cat": "residencial"},
   ```

   El campo `cat` define en qué filtro aparece:

   | `cat` | Filtro |
   | --- | --- |
   | `residencial` | Residencial |
   | `institucional` | Comercial e Institucional |
   | `conjuntos` | Conjuntos Habitacionales |
   | `especiales` | Solar Room y Cierres |
   | `detalles` | Puertas y Detalles |

Usa nombres de archivo sin espacios ni tildes (por ejemplo `casa-nueva-01.jpg`).

## Agregar un video

1. Copia el `.mp4` a `obras/` con un nombre sin espacios.
2. Agrega una imagen de portada `.jpg` con el mismo nombre. Así el video no se descarga hasta que alguien aprieta play.
3. Copia uno de los bloques `<figure class="videos__card">` de la sección `#videos` en `index.html` y cambia las rutas y los textos.

Conviene que los videos pesen poco (idealmente menos de 10 MB, en 720p), porque muchas personas visitan el sitio desde el celular.

## Contacto

- Email: prowindowslimitada@gmail.com
- Teléfono / WhatsApp: +56 9 6845 0823
- Dirección: Avenida Gerónimo Méndez 1551, Coquimbo
- Instagram: [@prowindowsdesign](https://www.instagram.com/prowindowsdesign/)

---

Los datos técnicos de la página de termopanel provienen de la guía "¿Cómo seleccionar adecuadamente un termopanel?" de la Corporación de Desarrollo Tecnológico (CDT, CChC), Ediciones Técnicas N°3, 2018.
