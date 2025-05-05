// comentarios de ejemplo
const comentarios = [
  { 
    nombreUsuario: 'María',    
    textoComentario: '¡Excelente iniciativa! Me encanta cómo promueven la alimentación sostenible.',
    fecha: '2024-04-15'
  },
  { 
    nombreUsuario: 'Juan',     
    textoComentario: 'Muy útil, gracias por compartir recetas con productos de temporada y locales.',
    fecha: '2024-04-18'
  },
  { 
    nombreUsuario: 'Lucía',    
    textoComentario: 'Me gustaría que mejoren la sección de recetas vegetarianas, pero el concepto es bueno.',
    fecha: '2024-04-20'
  },
  { 
    nombreUsuario: 'Pedro',    
    textoComentario: 'Algunas secciones cargan lento en mi móvil, pero el contenido vale la pena.',
    fecha: '2024-04-22'
  },
  { 
    nombreUsuario: 'Ana',      
    textoComentario: 'Interesante la idea, pero creo que necesitan más opciones para dietas específicas.',
    fecha: '2024-04-25'
  },
  { 
    nombreUsuario: 'Carlos',   
    textoComentario: 'Me gustaría ver más información sobre el impacto ambiental de cada receta.',
    fecha: '2024-04-28'
  },
  { 
    nombreUsuario: 'Sofía',    
    textoComentario: '¡Muy intuitivo y fácil de usar! La calculadora de huella de carbono es genial.',
    fecha: '2024-04-30'
  },
  { 
    nombreUsuario: 'Miguel',   
    textoComentario: 'Estoy impresionado con la calidad de la información sobre alimentos ecológicos.',
    fecha: '2024-05-01'
  }
];

const listaComentarios = document.getElementById('lista-comentarios');
const formComentario = document.getElementById('form-comentario');
const inputNombre = document.getElementById('nombre');
const textareaComentario = document.getElementById('comentario');
const progressBar = document.querySelector('.progress-bar');

// Configuración
let startIndex = 0;
const VISIBLE_COUNT = 3;
const ROTATE_INTERVAL_MS = 8000;
let progressInterval;
let rotateTimeout;

function obtenerIniciales(nombre) {
  return nombre
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function formatearFecha(fecha) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', options);
}

// para renderizar un bloque de comentarios
function mostrarComentarios() {
  const seccionTitle = listaComentarios.querySelector('.section-title');
  const progressContainer = listaComentarios.querySelector('.comments-rotation');
  
  listaComentarios.innerHTML = '';
  listaComentarios.appendChild(seccionTitle);
  
  const commentsContainer = document.createElement('div');
  commentsContainer.className = 'comments-container';
  
  // Mostrar los comentarios actuales
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    const idx = (startIndex + i) % comentarios.length;
    const { nombreUsuario, textoComentario, fecha } = comentarios[idx];
    
    const card = document.createElement('div');
    card.className = 'comment-card card mb-3';
    card.innerHTML = `
      <div class="card-body">
        <div class="comment-header">
          <div class="comment-avatar">
            ${obtenerIniciales(nombreUsuario)}
          </div>
          <h6 class="comment-username">${nombreUsuario}</h6>
          ${fecha ? `<small class="text-muted ms-auto">${formatearFecha(fecha)}</small>` : ''}
        </div>
        <p class="comment-text">${textoComentario}</p>
      </div>
    `;
    
    // animación de entrada
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    commentsContainer.appendChild(card);
    
    // Animar la entrada
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 200);
  }
  
  listaComentarios.appendChild(commentsContainer);
  listaComentarios.appendChild(progressContainer);
  
  // Reiniciar la barra de progreso
  if (progressBar) {
    progressBar.style.width = '0%';

    if (progressInterval) clearInterval(progressInterval);

    const totalSteps = 100;
    const stepTime = ROTATE_INTERVAL_MS / totalSteps;
    let currentStep = 0;
    
    progressInterval = setInterval(() => {
      currentStep++;
      progressBar.style.width = `${currentStep}%`;
      
      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
      }
    }, stepTime);
  }
}

//avanza el índice y vuelve a mostrar
function rotarComentarios() {
  const cards = document.querySelectorAll('.comment-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';
    }, index * 100);
  });

  setTimeout(() => {
    startIndex = (startIndex + VISIBLE_COUNT) % comentarios.length;
    mostrarComentarios();
  }, 500);

  rotateTimeout = setTimeout(rotarComentarios, ROTATE_INTERVAL_MS);
}

//agregar un nuevo comentario
function agregarComentario(event) {
  event.preventDefault();
  
  const nombre = inputNombre.value.trim();
  const texto = textareaComentario.value.trim();
  
  if (!nombre || !texto) {
    mostrarAlerta('Por favor completa todos los campos', 'warning');
    return;
  }

  const hoy = new Date().toISOString().split('T')[0];
  comentarios.push({ 
    nombreUsuario: nombre, 
    textoComentario: texto,
    fecha: hoy
  });

  mostrarAlerta('¡Comentario agregado con éxito!', 'success');

  formComentario.reset();
  
  if (startIndex + VISIBLE_COUNT >= comentarios.length - 1) {
    clearTimeout(rotateTimeout);
    startIndex = Math.max(0, comentarios.length - VISIBLE_COUNT);
    mostrarComentarios();
    rotateTimeout = setTimeout(rotarComentarios, ROTATE_INTERVAL_MS);
  }
}

// Para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
  const alertaDiv = document.createElement('div');
  alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
  alertaDiv.role = 'alert';
  
  alertaDiv.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;

  formComentario.parentNode.insertBefore(alertaDiv, formComentario);

  setTimeout(() => {
    alertaDiv.classList.remove('show');
    setTimeout(() => alertaDiv.remove(), 300);
  }, 3000);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  mostrarComentarios();
  
  rotateTimeout = setTimeout(rotarComentarios, ROTATE_INTERVAL_MS);
  
  listaComentarios.addEventListener('mouseenter', () => {
    clearTimeout(rotateTimeout);
    clearInterval(progressInterval);
  });
  
  listaComentarios.addEventListener('mouseleave', () => {
    progressBar.style.width = '0%';
    rotateTimeout = setTimeout(rotarComentarios, 1000);
  });
});


formComentario.addEventListener('submit', agregarComentario);

