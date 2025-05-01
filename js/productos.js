const productos = [
    {
      nombre: 'Caja de vegetales orgánicos',
      descripcion: 'Mix fresco de vegetales de estación, 2 kg aprox.',
      precio: 8700,
      imagen: 'assets/img/Caja de Vegetales.png'
    },
    {
      nombre: 'Miel pura de abejas',
      descripcion: 'Miel 100% natural, sin aditivos, 1 Kilo.',
      precio: 10000,
      imagen: 'assets/img/Miel Pura Abeja.png'
    },
    {
      nombre: 'Pan integral artesanal',
      descripcion: 'Pan de centeno y semillas, recién horneado.',
      precio: 3500,
      imagen: 'assets/img/Pan Integral.png'
    },
    {
        nombre: 'Caja de Frutas',
        descripcion: 'Una Caja de Frutas cultivadas de forma narural, 3 Kg aprox.',
        precio: 6200,
        imagen: 'assets/img/CajaFruta.png'
    },
    {
        nombre: 'Bolsa de Papas',
        descripcion: 'Una Bolsa de ricas Papas cultivadas de forma narural, 2 Kg aprox.',
        precio: 6300,
        imagen: 'assets/img/Bolsa de Papas.png'
    },
    {
        nombre: 'Choclo',
        descripcion: 'Paquete de 4 choclos frescos cultivados de forma natural, perfectos para asar, hervir o preparar ensaladas.',
        precio: 3500,
        imagen: 'assets/img/Choclo.png'
    }
  ];
  
  // formateador de pesos
  function formatearCLP(valor) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(valor);
  }
  
  function cargarProductos() {
    const contenedor = document.getElementById('contenedorProductos');
    productos.forEach(prod => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
  
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text flex-grow-1">${prod.descripcion}</p>
            <p class="fw-bold mt-3">${formatearCLP(prod.precio)}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(col);
    });
  }
  

  window.addEventListener('DOMContentLoaded', cargarProductos);
  