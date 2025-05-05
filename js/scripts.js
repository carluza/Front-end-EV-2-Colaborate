/*seccion de las frases dinamicas*/
const quotes = [
  "Reducir el desperdicio de alimentos es cuidar el planeta.",
  "Pequeñas acciones, gran impacto ambiental.",
  "Valora cada bocado: sé parte de la solución.",
  "La sostenibilidad comienza en tu cocina.",
  "Juntos podemos alimentar al futuro.",
  "Cada comida salvada es un paso hacia un mundo sin hambre.",
  "Alimentos valorados, planeta protegido.",
  "Transforma tu desperdicio en conciencia.",
  "Un desperdicio menos, un recurso más.",
  "Comparte lo que te sobra, alimenta una esperanza.",
  "Tu acción hoy define el mañana de nuestro planeta.",
  "Del campo a tu mesa: cuidemos cada grano.",
  "Reduce, reutiliza y disfruta de cada bocado.",
  "Con pequeños gestos generamos grandes cambios.",
  "EcoFood: cuando el respeto por la comida es respeto por la vida."
];

let current = 0;
const el = document.getElementById('motivational-quote');

function showNextQuote() {

  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = quotes[current];
    el.style.opacity = 1;
    current = (current + 1) % quotes.length;
  }, 500);
}

window.addEventListener('DOMContentLoaded', () => {
  showNextQuote();
  setInterval(showNextQuote, 5000);
});


// recuperacion contraseña //

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const passwordInput = document.getElementById("password");
  const repetirPasswordInput = document.getElementById("repetirPassword");
  const submitButton = form.querySelector("button[type='submit']");

  //para mostrar mensajes de error
  function mostrarMensaje(mensaje, tipo) {
    const mensajesAnteriores = document.querySelectorAll(".mensaje-validacion");
    mensajesAnteriores.forEach(msg => msg.remove());

    const mensajeDiv = document.createElement("div");
    mensajeDiv.className = `mensaje-validacion ${tipo === "error" ? "mensaje-error" : "mensaje-exito"}`;
    mensajeDiv.textContent = mensaje;
    
    form.parentNode.insertBefore(mensajeDiv, form.nextSibling);
    
    if (tipo === "exito") {
      setTimeout(() => {
        mensajeDiv.remove();
      }, 3000);
    }
  }

  // Validar contraseña 
  passwordInput.addEventListener("input", validarContraseña);
  
  function validarContraseña() {
    const password = passwordInput.value.trim();
    const indicadorFuerza = document.getElementById("indicador-fuerza");

    if (!indicadorFuerza) {
      const div = document.createElement("div");
      div.id = "indicador-fuerza";
      div.className = "mt-2";
      passwordInput.parentNode.insertBefore(div, passwordInput.nextSibling);
    }
    
    let fuerza = 0;
    let mensaje = "";
    
    if (password.length < 8) {
      mensaje = "Demasiado corta";
      fuerza = 1;
    } else {
      if (password.length >= 10) fuerza++;
      if (/[A-Z]/.test(password)) fuerza++;
      if (/[a-z]/.test(password)) fuerza++;
      if (/[0-9]/.test(password)) fuerza++;
      if (/[^A-Za-z0-9]/.test(password)) fuerza++;
      
      if (fuerza < 3) {
        mensaje = "Débil";
      } else if (fuerza < 5) {
        mensaje = "Media";
      } else {
        mensaje = "Fuerte";
      }
    }
    
    // Actualizar indicador
    document.getElementById("indicador-fuerza").innerHTML = `
      <div class="barra-fuerza">
        <div class="fuerza-nivel fuerza-${fuerza}"></div>
      </div>
      <small>${mensaje}</small>
    `;
  }

  // Verificar coincidencia de contraseñas
  repetirPasswordInput.addEventListener("input", function() {
    if (passwordInput.value && repetirPasswordInput.value) {
      verificarCoincidencia();
    }
  });
  
  function verificarCoincidencia() {
    const coincidenciaMsg = document.getElementById("coincidencia-msg");
    
    if (!coincidenciaMsg) {
      const div = document.createElement("div");
      div.id = "coincidencia-msg";
      div.className = "mt-2";
      repetirPasswordInput.parentNode.insertBefore(div, repetirPasswordInput.nextSibling);
    }
    
    if (passwordInput.value !== repetirPasswordInput.value) {
      document.getElementById("coincidencia-msg").innerHTML = `
        <small class="text-danger">Las contraseñas no coinciden</small>
      `;
      return false;
    } else {
      document.getElementById("coincidencia-msg").innerHTML = `
        <small class="text-success">Las contraseñas coinciden</small>
      `;
      return true;
    }
  }

  // Envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const password = passwordInput.value.trim();
    const repetirPassword = repetirPasswordInput.value.trim();

    if (password.length < 8) {
      mostrarMensaje("La contraseña debe tener al menos 8 caracteres.", "error");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      mostrarMensaje("La contraseña debe contener al menos una mayúscula y un número.", "error");
      return;
    }

    // Validar coincidencia
    if (password !== repetirPassword) {
      mostrarMensaje("Las contraseñas no coinciden.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Procesando...";
    
    setTimeout(() => {
      mostrarMensaje("¡Contraseña actualizada exitosamente! Redirigiendo...", "exito");
      submitButton.disabled = false;
      submitButton.textContent = "Confirmar";
      form.reset();
      
      setTimeout(() => {
        window.location.href = "Login.html";
      }, 2000);
    }, 1500);
  });
});

