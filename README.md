# My Nails — Sitio web

Sitio de una sola página para el salón My Nails (Miranda de Ebro). HTML + CSS + JS puro, sin dependencias de build — listo para GitHub Pages.

## Estructura

```
my-nails-website/
├── index.html
├── css/style.css
├── js/script.js
└── assets/images/   ← aquí van las fotos reales
```

## Sustituir las fotos placeholder

Ahora mismo hay 7 bloques con fondo nude y una etiqueta de texto (p. ej. "Foto de Maylin"). Son marcadores de posición, no imágenes reales. Para reemplazarlos:

1. Sube tus fotos a `assets/images/` (nombres sugeridos: `maylin.jpg`, `ozda.jpg`, `galeria-1.jpg`... `galeria-5.jpg`).
2. En `index.html`, busca cada `<div class="... placeholder-photo" data-placeholder="...">` y cámbialo por una etiqueta `<img>`, por ejemplo:

   ```html
   <!-- Antes -->
   <div class="team-card__photo placeholder-photo" data-placeholder="Foto de Maylin"></div>

   <!-- Después -->
   <img class="team-card__photo" src="assets/images/maylin.jpg" alt="Maylin Azuaje, especialista de My Nails">
   ```
3. Haz lo mismo con los 5 bloques de la galería y el logo si quieres sustituir el texto "My Nails" del nav por una imagen.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube esta carpeta (todo el contenido, no la carpeta contenedora).
2. En el repositorio: **Settings → Pages → Source**, selecciona la rama `main` y la carpeta `/ (root)`.
3. En un par de minutos el sitio estará disponible en `https://tu-usuario.github.io/nombre-repo/`.

## Conectar un dominio personalizado (para cuando lo vendas al cliente)

1. En **Settings → Pages → Custom domain**, escribe el dominio del cliente (ej. `mynails.es`).
2. En el proveedor DNS del cliente, crea:
   - Un registro `A` apuntando a las IPs de GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153), o
   - Un registro `CNAME` a `tu-usuario.github.io` si usan un subdominio como `www`.
3. Activa "Enforce HTTPS" en la misma pantalla una vez el DNS propague (puede tardar hasta 24h).

## Evitar que el navegador sirva una versión antigua en caché

Cada vez que subas cambios al repositorio (nuevo CSS, JS o contenido), los visitantes que ya conocían la web podrían seguir viendo la versión anterior porque su navegador la tiene guardada en caché. Para evitarlo:

1. En `index.html`, busca estas dos líneas cerca del final del `<head>` y del `<body>`:

   ```html
   <link rel="stylesheet" href="css/style.css?v=20260903-1">
   ...
   <script src="js/script.js?v=20260903-1"></script>
   ```

2. Cambia el número de versión (`?v=...`) en ambas — por ejemplo, a la fecha del día o subiendo el número: `?v=20260910-1`. Con eso el navegador entiende que es un archivo "nuevo" y descarga la versión actualizada en vez de usar la cacheada.
3. También se han añadido etiquetas `Cache-Control` en el `<head>` para pedirle al navegador que no guarde el HTML en caché, así que la propia página `index.html` siempre se recarga fresca.

En resumen: **cada vez que subas cambios de `style.css` o `script.js`, incrementa el `?v=` en `index.html`.**

## Notas de diseño

- Colores y tipografías están centralizados como variables CSS al principio de `css/style.css` (`:root`), fáciles de ajustar.
- El botón "Reservar" en todo el sitio enlaza directo a Booksy: `https://booksy.com/es-es/dl/show-business/141899`.
- El mapa usa un iframe de Google Maps sin API key (no requiere configuración adicional).
- Textos de servicios y precios extraídos del perfil de Booksy — conviene revisarlos antes de publicar por si han cambiado.
- El banner de cabecera usa una foto real de la fachada del local (`assets/images/facade-banner.jpg`), recortada y retocada.
- La galería (`assets/images/gallery-1.jpg` a `gallery-9.jpg`) y las fotos de equipo están ya insertadas; para añadir o cambiar fotos, sustituye el archivo manteniendo el mismo nombre o actualiza la ruta en `index.html`.
- Las secciones y elementos con la clase `reveal` aparecen con una animación de entrada (fundido + desplazamiento) la primera vez que entran en el viewport al hacer scroll, gestionada por `IntersectionObserver` en `js/script.js`. Para añadir esta animación a un nuevo bloque, basta con añadirle la clase `reveal` en el HTML.
