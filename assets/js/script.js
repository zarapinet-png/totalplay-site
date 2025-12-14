// ===== CONFIGURACIÓN DE PROMOCIÓN DEL MOMENTO =====
// Cambia esta imagen para actualizar la promoción destacada
const PROMOCION_CONFIG = {
  imagen: './assets/images/internetcontvnavidad.jpg',
  // Imagen pequeña que aparece justo debajo del título (puede ser diferente a la imagen principal)
  headerImagen: './assets/images/inst.jpg',
  alt: 'Promocion del momento - Instalación inmediata',
  titulo: '¡Instalación Inmediata!',
  descripcion: 'Contrata ahora y obtén instalación el mismo día. Sin esperas, sin complicaciones.',
  // Puedes cambiar estos textos según la promoción actual
  botonTexto: '📞 443 405 2526',
  whatsappTexto: 'Hola, quiero información de la promoción del momento'
};

// ===== CONFIGURACIÓN DE MEDIOS =====
// Solo necesitas modificar esta lista para agregar/quitar contenido
// Puedes mezclar imágenes y videos en el orden que desees
const MEDIA_CONFIG = {
  // Lista unificada de medios (imágenes y videos) - el orden determina cómo aparecen
  media: [
    {
      src: './assets/images/auto.jpg',
      alt: 'autoinstalador',
      id: 'autoinstalador'
    },{
      src: './assets/video/monstruo_con_dron.mp4',
      alt: 'dron',
      id: 'dron'
    },
    {
      src: './assets/video/Video promocional ttt-ttp.mp4',
      alt: 'Video Promocional',
      id: 'video4'
    },
    {
      src: './assets/video/totalplay-demo-optimized.mp4',
      alt: 'Demo Totalplay',
      id: 'video1'
    },
    {
      src: './assets/video/Video de WhatsApp 2025-09-20 a las 05.30.34_b2b0ac18.mp4',
      alt: 'Video WhatsApp 1',
      id: 'video2'
    },
    {
      src: './assets/video/Video de WhatsApp 2025-09-20 a las 05.36.14_5f33da0d.mp4',
      alt: 'Video WhatsApp 2', 
      id: 'video3'
    },
    
  ]
};

// ===== VARIABLES GLOBALES =====
let isPlaying = false;
let bgMusic = null;
let playMusicBtn = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado, inicializando...');
  initializeElements();
  generateMediaGallery();
  updatePromocionSection();
  setupEventListeners();
  setCurrentYear();
  console.log('Inicialización completada');
});

// Backup por si DOMContentLoaded ya pasó
if (document.readyState === 'loading') {
  // El DOM aún se está cargando
} else {
  // El DOM ya está cargado
  setTimeout(() => {
    console.log('Inicialización de respaldo ejecutándose...');
    initializeElements();
    generateMediaGallery();
    updatePromocionSection();
    setupEventListeners();
    setCurrentYear();
  }, 100);
}

// ===== INICIALIZAR ELEMENTOS =====
function initializeElements() {
  bgMusic = document.getElementById('bgMusic');
  playMusicBtn = document.getElementById('playMusicBtn');
}

// ===== GENERAR GALERÍA DE MEDIOS =====
function generateMediaGallery() {
  const galleryContainer = document.getElementById('mediaGallery');
  if (!galleryContainer) {
    console.error('No se encontró el contenedor mediaGallery');
    return;
  }

  // Limpiar contenido existente
  galleryContainer.innerHTML = '';

  // Recorrer la lista unificada de medios en el orden especificado
  MEDIA_CONFIG.media.forEach((mediaItem, index) => {
    const mediaElement = createMediaElement(mediaItem, index);
    galleryContainer.appendChild(mediaElement);
  });

  console.log('Galería generada con', MEDIA_CONFIG.media.length, 'elementos de medios');
}

// ===== ACTUALIZAR SECCIÓN DE PROMOCIÓN =====
function updatePromocionSection() {
  const promocionImagen = document.getElementById('promocionImagen');
  if (!promocionImagen) {
    console.warn('No se encontró el contenedor de promoción');
    return;
  }

  // Actualizar la imagen de promoción
  const imgElement = promocionImagen.querySelector('img');
  if (imgElement) {
    imgElement.src = PROMOCION_CONFIG.imagen;
    imgElement.alt = PROMOCION_CONFIG.alt;
    // Cambiar animación de parpadeo a escala
    imgElement.classList.remove('animate-blink-slower');
    imgElement.classList.add('animate-pulse-scale');
  }

  // Actualizar la imagen pequeña que aparece debajo del título, si existe
  const headerImg = document.getElementById('promocionHeaderImg');
  if (headerImg) {
    // Usar `headerImagen` si está definida, si no, usar la imagen principal
    headerImg.src = PROMOCION_CONFIG.headerImagen || PROMOCION_CONFIG.imagen;
    headerImg.alt = PROMOCION_CONFIG.alt;
  }

  // Actualizar otros elementos de la promoción si es necesario
  const titulo = document.querySelector('#promocion h3');
  if (titulo) titulo.textContent = PROMOCION_CONFIG.titulo;

  const descripcion = document.querySelector('#promocion p');
  if (descripcion) descripcion.textContent = PROMOCION_CONFIG.descripcion;

  console.log('Sección de promoción actualizada');
}

// ===== CREAR ELEMENTO DE MEDIA =====
function createMediaElement(media, index) {
  const container = document.createElement('div');
  container.className = 'media-container';

  // Detectar automáticamente si es video basado en la extensión del archivo
  const isVideo = media.src.includes('.mp4') || 
                  media.src.includes('.webm') || 
                  media.src.includes('.mov') || 
                  media.src.includes('.avi') || 
                  media.src.includes('video');

  if (isVideo) {
    // Es un video
    const video = document.createElement('video');
    video.id = media.id;
    video.className = 'media-item';
    video.setAttribute('data-index', index);
    
    if (media.poster) {
      video.poster = media.poster;
    }

    const source = document.createElement('source');
    source.src = media.src;
    source.type = 'video/mp4';
    video.appendChild(source);

    // Agregar overlay de play
    const overlay = document.createElement('span');
    overlay.className = 'video-play-overlay';
    overlay.innerHTML = `
      <svg class="play-button" fill="currentColor" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)"/>
        <polygon points="26,20 50,32 26,44" fill="white"/>
      </svg>
    `;

    container.appendChild(video);
    container.appendChild(overlay);

    // Event listener para reproducir video
    video.addEventListener('click', () => openVideoModal(media.src));
    
  } else {
    // Es una imagen
    const img = document.createElement('img');
    img.id = media.id + 'Img';
    img.className = 'media-item';
    img.src = media.src;
    img.alt = media.alt;
    img.setAttribute('data-index', index);

    container.appendChild(img);

    // Event listener para ampliar imagen
    img.addEventListener('click', () => openImageModal(media.src, media.alt, media.id));
  }

  return container;
}

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
  setupMusicControl();
  setupMenuToggle();
  setupModalControls();
  setupVideoMusicHandlers();
}

// ===== CONTROL DE MÚSICA =====
function setupMusicControl() {
  if (playMusicBtn && bgMusic) {
    playMusicBtn.addEventListener('click', function() {
      if (!isPlaying) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        bgMusic.play();
        playMusicBtn.textContent = 'Detener música';
        isPlaying = true;
      } else {
        bgMusic.pause();
        playMusicBtn.textContent = 'Reproducir música';
        isPlaying = false;
      }
    });
  }
}

// ===== MANEJO DE MÚSICA CON VIDEOS =====
function setupVideoMusicHandlers() {
  document.querySelectorAll('video').forEach(handleVideoMusic);
  
  // Observar nuevos videos que se agreguen dinámicamente
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'VIDEO') {
          handleVideoMusic(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('video').forEach(handleVideoMusic);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function handleVideoMusic(video) {
  if (!bgMusic) return;
  
  video.addEventListener('play', function() {
    if (!bgMusic.paused) {
      bgMusic.pause();
    }
  });
  
  video.addEventListener('pause', function() {
    if (isPlaying && bgMusic.paused) {
      bgMusic.play();
    }
  });
  
  video.addEventListener('ended', function() {
    if (isPlaying && bgMusic.paused) {
      bgMusic.play();
    }
  });
}

// ===== MENÚ DESPLEGABLE =====
function setupMenuToggle() {
  const menuBtn = document.getElementById('menuBtn');
  const menuDropdown = document.getElementById('menuDropdown');
  
  if (menuBtn && menuDropdown) {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menuDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
      if (!menuDropdown.classList.contains('hidden')) {
        menuDropdown.classList.add('hidden');
      }
    });

    menuDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
}

// ===== CONTROLES DE MODALES =====
function setupModalControls() {
  // Modal de video
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const closeVideo = document.getElementById('closeVideo');
  
  if (closeVideo && videoModal && modalVideo) {
    closeVideo.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
    modalVideo.addEventListener('click', function() {
      if (!modalVideo.paused) {
        modalVideo.pause();
      } else {
        modalVideo.play();
      }
    });
  }

  // Modales de imágenes (se crean dinámicamente)
  setupImageModals();
}

// ===== CONFIGURAR MODALES DE IMÁGENES =====
function setupImageModals() {
  // Filtrar solo las imágenes de la lista unificada
  const images = MEDIA_CONFIG.media.filter(item => 
    !item.src.includes('.mp4') && 
    !item.src.includes('.webm') && 
    !item.src.includes('.mov') && 
    !item.src.includes('video')
  );
  
  images.forEach(image => {
    const modalId = image.id + 'Modal';
    const closeId = 'close' + image.id.charAt(0).toUpperCase() + image.id.slice(1);
    
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    
    if (modal && closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
      
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }
      });
    }
  });
}

// ===== ABRIR MODAL DE VIDEO =====
function openVideoModal(videoSrc) {
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  
  if (videoModal && modalVideo) {
    modalVideo.src = videoSrc;
    modalVideo.play();
    videoModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

// ===== CERRAR MODAL DE VIDEO =====
function closeVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  
  if (videoModal && modalVideo) {
    videoModal.classList.add('hidden');
    modalVideo.pause();
    modalVideo.src = '';
    document.body.classList.remove('overflow-hidden');
  }
}

// ===== ABRIR MODAL DE IMAGEN =====
function openImageModal(imageSrc, imageAlt, imageId) {
  const modalId = imageId + 'Modal';
  const modal = document.getElementById(modalId);
  
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

// ===== ESTABLECER AÑO ACTUAL =====
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===== FUNCIONES DE UTILIDAD =====
// Función para agregar un nuevo medio (imagen o video) en una posición específica
function addMedia(src, alt, position = -1) {
  const mediaType = src.includes('.mp4') || src.includes('.webm') || src.includes('.mov') || src.includes('video') ? 'video' : 'image';
  const newMedia = {
    src: src,
    alt: alt,
    id: mediaType + Date.now()
  };
  
  if (position === -1) {
    MEDIA_CONFIG.media.push(newMedia);
  } else {
    MEDIA_CONFIG.media.splice(position, 0, newMedia);
  }
  
  generateMediaGallery();
  return newMedia.id;
}

// Funciones de compatibilidad (mantienen la API anterior)
function addImage(src, alt, position = -1) {
  return addMedia(src, alt, position);
}

function addVideo(src, alt, poster = null, position = -1) {
  return addMedia(src, alt, position);
}

// Función para remover un medio por ID
function removeMedia(id) {
  const index = MEDIA_CONFIG.media.findIndex(item => item.id === id);
  if (index !== -1) {
    MEDIA_CONFIG.media.splice(index, 1);
    generateMediaGallery();
    return true;
  }
  return false;
}

// Función para reordenar medios
function reorderMedia(fromIndex, toIndex) {
  if (fromIndex >= 0 && fromIndex < MEDIA_CONFIG.media.length && 
      toIndex >= 0 && toIndex < MEDIA_CONFIG.media.length) {
    const item = MEDIA_CONFIG.media.splice(fromIndex, 1)[0];
    MEDIA_CONFIG.media.splice(toIndex, 0, item);
    generateMediaGallery();
    return true;
  }
  return false;
}

// Función para cambiar la promoción del momento
function changePromocion(imagen, titulo = null, descripcion = null, headerImagen = null) {
  PROMOCION_CONFIG.imagen = imagen;
  if (titulo) PROMOCION_CONFIG.titulo = titulo;
  if (descripcion) PROMOCION_CONFIG.descripcion = descripcion;
  // Si se proporciona una imagen de encabezado, actualízala también
  if (headerImagen) PROMOCION_CONFIG.headerImagen = headerImagen;
  updatePromocionSection();
}

// Exponer funciones globalmente si es necesario
window.TotalplayMedia = {
  addMedia,
  addImage,
  addVideo,
  removeMedia,
  reorderMedia,
  generateMediaGallery,
  getMediaList: () => [...MEDIA_CONFIG.media], // Copia de la lista para consulta
  // Funciones de promoción
  changePromocion,
  updatePromocionSection,
  getPromocionConfig: () => ({...PROMOCION_CONFIG}) // Copia de la configuración
};