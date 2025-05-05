document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('registroForm');
    
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault();
            
            // validar el formulario
            if (validarFormulario()) {
                mostrarAlerta('¡Registro exitoso! Redirigiendo...', 'success');
                
                setTimeout(function() {
                    enviarDatosAlServidor();
                }, 1500);
            }
        });
        
        // validar que coincidan las contraseñas en tiempo real
        const password = document.getElementById('password');
        const repetirPassword = document.getElementById('repetirPassword');
        
        repetirPassword.addEventListener('input', function() {
            if (password.value !== repetirPassword.value) {
                repetirPassword.setCustomValidity('Las contraseñas no coinciden');
            } else {
                repetirPassword.setCustomValidity('');
            }
        });
    }
});

//validar el formulario 
function validarFormulario() {
    const formulario = document.getElementById('registroForm');
    
    Array.from(formulario.elements).forEach(input => {
        if (input.type !== 'submit') {
            if (!input.validity.valid) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        }
    });
    
    // Validar contraseñas
    const password = document.getElementById('password');
    const repetirPassword = document.getElementById('repetirPassword');
    
    if (password.value !== repetirPassword.value) {
        repetirPassword.classList.add('is-invalid');
        return false;
    }
    
    // Validar al menos una opción
    const conocimientoOptions = document.querySelectorAll('input[name="conocimiento"]');
    let conocimientoSeleccionado = false;
    
    conocimientoOptions.forEach(option => {
        if (option.checked) {
            conocimientoSeleccionado = true;
        }
    });
    

    if (!conocimientoSeleccionado) {
        mostrarAlerta('Por favor seleccione cómo supo de nosotros', 'warning');
    }
    
    return formulario.checkValidity() && conocimientoSeleccionado;
}

// para mostrar alertas de bootstrap
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const formulario = document.getElementById('registroForm');
    formulario.parentNode.insertBefore(alerta, formulario);
    
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

//simular el envío de datos al servidor
function enviarDatosAlServidor() {
    const formulario = document.getElementById('registroForm');
    
    const datos = {
        nombre: formulario.nombre.value,
        email: formulario.email.value,
        password: formulario.password.value,
        fechaNacimiento: formulario.fechaNacimiento.value,
        genero: formulario.genero.value,
        conocimiento: []
    };
    
    const conocimientoOptions = document.querySelectorAll('input[name="conocimiento"]');
    conocimientoOptions.forEach(option => {
        if (option.checked) {
            datos.conocimiento.push(option.value);
        }
    });
    
    console.log('Datos enviados al servidor:', datos);
    
    // redireccionar después de enviar los datos
    setTimeout(() => {
        window.location.href = 'Login.html';
    }, 1500);
}
