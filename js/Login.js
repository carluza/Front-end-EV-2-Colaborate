document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        clearErrors();
        
        let isValid = true;
        
        // validar email
        if (!email) {
            showError('email', 'El correo electrónico es obligatorio');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Formato de correo electrónico inválido');
            isValid = false;
        }
        
        // validar contraseña
        if (!password) {
            showError('password', 'La contraseña es obligatoria');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }
        
        //simular el envío al servidor
        if (isValid) {
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Procesando...';
            
            // demostracion
            setTimeout(function() {
                if (email === 'usuario@ecofood.org' && password === '123456') {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);
                    
                    showMessage('success', '¡Inicio de sesión exitoso!');
                    
                    setTimeout(function() {
                        window.location.href = 'Home.html';
                    }, 1000);
                } else {
                    showMessage('error', 'Correo electrónico o contraseña incorrectos. Por favor, inténtelo de nuevo.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }, 1000);
        }
    });
    
    // errores en los campos
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // limpiar mensajes de error
    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        document.querySelectorAll('.invalid-feedback').forEach(errorMsg => {
            errorMsg.remove();
        });
        
        document.querySelectorAll('.alert').forEach(alert => {
            alert.remove();
        });
    }
    
    //validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // mostrar mensajes exito o error
    function showMessage(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = type === 'success' 
            ? 'alert alert-success mt-3'
            : 'alert alert-danger mt-3';
        alertDiv.textContent = message;
    
        const form = document.querySelector('form');
        form.insertBefore(alertDiv, form.querySelector('.d-grid'));
    }
});
