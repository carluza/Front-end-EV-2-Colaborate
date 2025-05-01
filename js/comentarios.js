const comentarios = [
    { nombreUsuario: 'María',    textoComentario: '¡Excelente iniciativa!' },
    { nombreUsuario: 'Juan',     textoComentario: 'Muy útil, gracias por compartir.' },
    { nombreUsuario: 'Lucía',    textoComentario: 'No me convenció del todo la interfaz.' },
    { nombreUsuario: 'Pedro',    textoComentario: 'Algunas secciones cargan muy lento.' },
    { nombreUsuario: 'Ana',      textoComentario: 'Esta interesante la idea pero creo que le falta algo mas.' },
    { nombreUsuario: 'Carlos',   textoComentario: 'Creo que faltan cosas.' },
    { nombreUsuario: 'Sofía',    textoComentario: '¡Muy intuitivo y fácil de usar!' },
    { nombreUsuario: 'Miguel',   textoComentario: 'No encontré lo que buscaba, decepcionante.' }
  ];
  
  // referencias al DOM
  const listaComentarios   = document.getElementById('lista-comentarios');
  const formComentario     = document.getElementById('form-comentario');
  const inputNombre        = document.getElementById('nombre');
  const textareaComentario = document.getElementById('comentario');
  
  // Para rotar
  let startIndex = 0;
  const VISIBLE_COUNT = 4;
  const ROTATE_INTERVAL_MS = 10000; // 10 segundos
  
  // función para renderizar un bloque de comentarios
  function mostrarComentarios() {
    // conservo el título de la comunidad
    listaComentarios.innerHTML = '<h4 class="text-center mb-3">Comentarios de la Comunidad</h4>';
    
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const idx = (startIndex + i) % comentarios.length;
      const { nombreUsuario, textoComentario } = comentarios[idx];
      
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.innerHTML = `
        <div class="card-body">
          <h6 class="card-title">${nombreUsuario}</h6>
          <p class="card-text">${textoComentario}</p>
        </div>
      `;
      listaComentarios.appendChild(card);
    }
  }
  
  // función que avanza el índice y vuelve a mostrar
  function rotarComentarios() {
    startIndex = (startIndex + VISIBLE_COUNT) % comentarios.length;
    mostrarComentarios();
  }
  
  // función para agregar un nuevo comentario (se añade al final)
  function agregarComentario(event) {
    event.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const texto  = textareaComentario.value.trim();
    if (!nombre || !texto) return;
    
    comentarios.push({ nombreUsuario: nombre, textoComentario: texto });
    
    // si el nuevo comentario cae en la ventana actual, se vera en la próxima rotación
    formComentario.reset();
  }
  
  // inicialización
  document.addEventListener('DOMContentLoaded', () => {
    mostrarComentarios();
    // arranca la rotación
    setInterval(rotarComentarios, ROTATE_INTERVAL_MS);
  });
  
  formComentario.addEventListener('submit', agregarComentario);
  