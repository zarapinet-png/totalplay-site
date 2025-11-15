# Sistema de Gestión de Medios Unificado - Totalplay Site

## 📋 Descripción

La página ha sido completamente reestructurada con:
- **Sistema unificado de medios** donde puedes mezclar imágenes y videos
- **Nueva sección de "Promoción del Momento"** destacada en la parte superior
- **Información de la vendedora** reubicada al final de la página
- **Assets organizados** en carpetas por tipo
- **Detección automática** de tipo de archivo y generación de elementos

## 📁 Estructura de Archivos Organizados

```
/home/yisus/Web projects/totalplay-site/
├── index.html          # HTML principal (limpio, sin estilos ni scripts inline)
├── assets/
│   ├── css/
│   │   └── styles.css  # Todos los estilos CSS
│   ├── js/
│   │   └── script.js   # Todo el JavaScript y lógica
│   ├── images/         # Todas las imágenes (PNG, JPG, etc.)
│   ├── audio/
│   │   └── musica.mp3  # Archivos de audio
│   └── video/          # Todos los videos (MP4, WebM, etc.)
```

## 🏗️ Nueva Estructura de Página

### 📍 **Secciones de la Página:**
1. **Hero Section** - Título principal y navegación
2. **🔥 Promoción del Momento** - Oferta destacada (fácil de cambiar)
3. **📋 Planes Sugeridos** - Galería de medios unificada
4. **🗺️ Cobertura** - Información de zonas disponibles
5. **👩‍💼 Tu Asesora** - Información de Elizabeth (al final)
6. **📄 Footer** - Información legal

## 🎯 Sistema Unificado de Medios

### ✨ Nueva Estructura Simplificada

**Todo se gestiona desde UNA SOLA LISTA en `assets/js/script.js`:**

```javascript
const MEDIA_CONFIG = {
  // Lista unificada de medios - puedes mezclar imágenes y videos
  media: [
    {
      src: './assets/images/Plan-1.png',      // ← Imagen
      alt: 'Plan 1',
      id: 'plan1'
    },
    {
      src: './assets/video/demo.mp4',         // ← Video
      alt: 'Demo Totalplay',
      id: 'video1'
    },
    {
      src: './assets/images/promo-390.jpg',   // ← Imagen
      alt: 'Plan 2',
      id: 'plan2'
    },
    // ... más medios en el orden que quieras
  ]
};
```

### 🚀 Cómo usar el nuevo sistema:

#### ✅ Para agregar cualquier medio:
1. Sube el archivo a la carpeta correspondiente:
   - **Imágenes**: `/assets/images/`
   - **Videos**: `/assets/video/`
   - **Audio**: `/assets/audio/`
2. Agrega el objeto a la lista `media` en la posición que desees:

```javascript
{
  src: './assets/images/nuevo-archivo.jpg',  // o './assets/video/nuevo.mp4'
  alt: 'Descripción del contenido',
  id: 'id-unico'
}
```

#### 🔄 Para cambiar el orden:
Simplemente reordena los elementos en la lista `media`

#### ❌ Para quitar medios:
Elimina el objeto correspondiente de la lista `media`

### 🤖 Detección Automática

El sistema detecta automáticamente si es imagen o video basándose en la extensión:
- **Videos**: `.mp4`, `.webm`, `.mov`, `.avi` o que contenga "video"
- **Imágenes**: Todo lo demás (`.jpg`, `.png`, `.gif`, etc.)

## 🔥 Sistema de Promoción del Momento

### ✨ **Cambiar la Promoción Destacada**

La sección de promoción se controla desde `assets/js/script.js`:

```javascript
const PROMOCION_CONFIG = {
  imagen: './assets/images/inst.jpg',
  alt: 'Promoción del momento - Instalación inmediata',
  titulo: '¡Instalación Inmediata!',
  descripcion: 'Contrata ahora y obtén instalación el mismo día.',
  botonTexto: '📞 443 405 2526',
  whatsappTexto: 'Hola, quiero información de la promoción del momento'
};
```

### 🚀 **Cómo cambiar la promoción:**

#### Opción 1: Editar la configuración
```javascript
// Cambiar solo la imagen
PROMOCION_CONFIG.imagen = './assets/images/nueva-promo.jpg';

// Cambiar título y descripción
PROMOCION_CONFIG.titulo = '¡Oferta Especial!';
PROMOCION_CONFIG.descripcion = 'Descuento del 50% en instalación.';
```

#### Opción 2: Usar la función helper
```javascript
// Cambiar solo imagen
TotalplayMedia.changePromocion('./assets/images/nueva-promo.jpg');

// Cambiar imagen, título y descripción
TotalplayMedia.changePromocion(
  './assets/images/nueva-promo.jpg',
  '¡Nueva Oferta!',
  'Instalación gratis este mes'
);
```

## 🎯 Ejemplos de Uso

### Ejemplo 1: Orden mixto personalizado
```javascript
media: [
  { src: './assets/images/portada.jpg', alt: 'Portada', id: 'portada' },           // Imagen
  { src: './assets/video/intro.mp4', alt: 'Video Intro', id: 'intro' },           // Video
  { src: './assets/images/plan-especial.png', alt: 'Plan Especial', id: 'plan' }, // Imagen
  { src: './assets/video/testimonial.mp4', alt: 'Testimonial', id: 'test' }       // Video
]
```

### Ejemplo 2: Solo imágenes
```javascript
media: [
  { src: './assets/images/plan1.jpg', alt: 'Plan Básico', id: 'plan1' },
  { src: './assets/images/plan2.jpg', alt: 'Plan Premium', id: 'plan2' },
  { src: './assets/images/plan3.jpg', alt: 'Plan Empresarial', id: 'plan3' }
]
```

### Ejemplo 3: Solo videos
```javascript
media: [
  { src: './assets/video/demo1.mp4', alt: 'Demo 1', id: 'demo1' },
  { src: './assets/video/demo2.mp4', alt: 'Demo 2', id: 'demo2' },
  { src: './assets/video/demo3.mp4', alt: 'Demo 3', id: 'demo3' }
]
```

## 💡 Funciones Avanzadas

### Agregar medios programáticamente:
```javascript
// Agregar al final
TotalplayMedia.addMedia('./assets/images/nuevo.jpg', 'Nuevo contenido');

// Agregar en posición específica (índice 2)
TotalplayMedia.addMedia('./assets/video/nuevo.mp4', 'Nuevo video', 2);

// Remover medio por ID
TotalplayMedia.removeMedia('plan1');

// Reordenar (mover del índice 0 al índice 3)
TotalplayMedia.reorderMedia(0, 3);

// Ver lista actual
console.log(TotalplayMedia.getMediaList());
```

## ✨ Beneficios del Sistema Unificado

1. **🎯 Control total del orden**: Mezcla imágenes y videos como quieras
2. **🚀 Detección automática**: No necesitas especificar el tipo
3. **🔧 Fácil mantenimiento**: Solo una lista para todo
4. **📱 Responsive**: Se adapta automáticamente
5. **🎵 Control inteligente**: Pausa música con videos automáticamente
6. **💻 API programática**: Funciones para modificar dinámicamente

## 🔍 Solución de Problemas

### Si los medios no aparecen:
1. Verifica las rutas en `MEDIA_CONFIG.media`
2. Asegúrate de que los archivos existen
3. Abre F12 → Console para ver mensajes de debug
4. Verifica que el contenedor `#mediaGallery` existe en el HTML

### Para debugging:
El sistema muestra mensajes en la consola:
- "DOM cargado, inicializando..."
- "Galería generada con X elementos de medios"
- Errores si no encuentra archivos o contenedores

¡El sistema unificado está listo! 🎉

## 📂 Organización de Assets

### ✨ **Nueva Estructura Organizada**
Los archivos ahora están organizados por tipo en carpetas específicas:

- **`/assets/css/`** → Archivos de estilos (CSS)
- **`/assets/js/`** → Archivos de JavaScript
- **`/assets/images/`** → Todas las imágenes (PNG, JPG, JPEG, etc.)
- **`/assets/video/`** → Todos los videos (MP4, WebM, MOV, etc.)
- **`/assets/audio/`** → Archivos de audio (MP3, WAV, etc.)

### 🎯 **Ventajas de la Organización**
1. **🗂️ Mejor organización**: Cada tipo de archivo en su lugar
2. **🔍 Fácil de encontrar**: No más buscar entre archivos mezclados
3. **🚀 Mejor rendimiento**: Estructura más limpia y profesional
4. **📱 Escalable**: Fácil agregar nuevos tipos de archivos
5. **👥 Trabajo en equipo**: Estructura estándar que todos entienden

### 🎯 Resumen de Cambios Recientes
- ✅ **Página reestructurada** con mejor flujo de información
- ✅ **Promoción del momento** destacada al inicio
- ✅ **Vendedora reubicada** al final con mejor presentación
- ✅ **Sistema de promoción** fácil de cambiar
- ✅ **Una sola lista** `media` en lugar de `images` y `videos`
- ✅ **Detección automática** de tipo de archivo
- ✅ **Orden personalizable** mezclando imágenes y videos
- ✅ **API mejorada** con más funciones
- ✅ **Assets organizados** en carpetas por tipo
- ✅ **Rutas actualizadas** automáticamente
- ✅ **Navegación mejorada** con nuevas secciones

## 🔧 Funcionalidades Automáticas

### ✨ Lo que hace el sistema automáticamente:

1. **Genera la galería**: Los medios aparecen en el orden de las listas
2. **Crea modales**: Cada imagen/video tiene su modal de pantalla completa
3. **Maneja eventos**: Click para ampliar, cerrar con botón o click fuera
4. **Controla audio**: Pausa música al reproducir videos
5. **Responsive**: Se adapta automáticamente a diferentes pantallas

### 🎵 Control de Música

- Botón de música en la esquina inferior derecha
- Se pausa automáticamente cuando se reproduce un video
- Se reanuda cuando el video termina o se pausa

### 📱 Menú Responsivo

- Menú hamburguesa que se abre/cierra automáticamente
- Se cierra al hacer click fuera de él

## 🛠️ Personalización Avanzada

### Agregar medios programáticamente:

```javascript
// Agregar imagen
window.TotalplayMedia.addImage('/assets/nueva-imagen.jpg', 'Alt text');

// Agregar video
window.TotalplayMedia.addVideo('/assets/video/nuevo.mp4', 'Alt text', '/assets/poster.jpg');

// Regenerar galería
window.TotalplayMedia.generateMediaGallery();
```

### Modificar estilos:

Todos los estilos están en `assets/styles.css` organizados por secciones:
- Animaciones
- Clases especiales  
- Estilos para medios
- Modales
- Header
- Responsive

## 🚀 Beneficios del Refactor

1. **📝 Código más limpio**: HTML separado de estilos y scripts
2. **🔧 Fácil mantenimiento**: Cada archivo tiene una responsabilidad
3. **⚡ Gestión simplificada**: Solo modificar listas para cambiar contenido
4. **📱 Responsive**: Sistema que se adapta automáticamente
5. **🎯 Modular**: Funcionalidades independientes y reutilizables

## 🔍 Solución de Problemas

### Si los estilos no cargan:
- Verifica que `/assets/styles.css` existe
- Comprueba la ruta en el HTML: `<link rel="stylesheet" href="/assets/styles.css">`

### Si el JavaScript no funciona:
- Verifica que `/assets/script.js` existe  
- Comprueba la ruta en el HTML: `<script src="/assets/script.js"></script>`
- Abre las herramientas de desarrollador (F12) para ver errores

### Si los medios no aparecen:
- Verifica las rutas en `MEDIA_CONFIG`
- Asegúrate de que los archivos existen en las rutas especificadas
- Comprueba que el contenedor `#mediaGallery` existe en el HTML

¡El sistema está listo para usar! 🎉