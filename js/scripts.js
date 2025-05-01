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











