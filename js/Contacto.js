document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    const politicaPrivacidad = document.getElementById('politicaPrivacidad');
    
    // validar el gmail
    function validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    //validar el teléfono
    function validarTelefono(telefono) {
        if (telefono === '') return true; 
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/;
        return re.test(String(telefono));
    }
    
    // validar el formulario
    function validarFormulario() {
        let esValido = true;
        
        // Validar nombre
        if (nombre.value.trim() === '') {
            nombre.classList.add('is-invalid');
            esValido = false;
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        }
        
        // Validar gmail
        if (!validarEmail(email.value)) {
            email.classList.add('is-invalid');
            esValido = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }
        
        // Validar teléfono
        if (telefono.value !== '' && !validarTelefono(telefono.value)) {
            telefono.classList.add('is-invalid');
            esValido = false;
        } else {
            telefono.classList.remove('is-invalid');
            if (telefono.value !== '') {
                telefono.classList.add('is-valid');
            }
        }
        
        //Validar asunto
        if (asunto.value.trim() === '') {
            asunto.classList.add('is-invalid');
            esValido = false;
        } else {
            asunto.classList.remove('is-invalid');
            asunto.classList.add('is-valid');
        }
        
        // Validar mensaje
        if (mensaje.value.trim() === '') {
            mensaje.classList.add('is-invalid');
            esValido = false;
        } else {
            mensaje.classList.remove('is-invalid');
            mensaje.classList.add('is-valid');
        }
        
        // Validar política de privacidad
        if (!politicaPrivacidad.checked) {
            politicaPrivacidad.classList.add('is-invalid');
            esValido = false;
        } else {
            politicaPrivacidad.classList.remove('is-invalid');
            politicaPrivacidad.classList.add('is-valid');
        }
        
        return esValido;
    }
    
    //validación en tiempo real
    nombre.addEventListener('blur', function() {
        if (nombre.value.trim() === '') {
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        }
    });
    
    email.addEventListener('blur', function() {
        if (!validarEmail(email.value)) {
            email.classList.add('is-invalid');
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }
    });
    
    telefono.addEventListener('blur', function() {
        if (telefono.value !== '' && !validarTelefono(telefono.value)) {
            telefono.classList.add('is-invalid');
        } else {
            telefono.classList.remove('is-invalid');
            if (telefono.value !== '') {
                telefono.classList.add('is-valid');
            }
        }
    });
    
    asunto.addEventListener('blur', function() {
        if (asunto.value.trim() === '') {
            asunto.classList.add('is-invalid');
        } else {
            asunto.classList.remove('is-invalid');
            asunto.classList.add('is-valid');
        }
    });
    
    mensaje.addEventListener('blur', function() {
        if (mensaje.value.trim() === '') {
            mensaje.classList.add('is-invalid');
        } else {
            mensaje.classList.remove('is-invalid');
            mensaje.classList.add('is-valid');
        }
    });
    
    // manejar el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // validar formulario
        if (validarFormulario()) {
            simulateFormSubmission()
                .then(response => {
                    contactForm.reset();
                    
                    const formElements = contactForm.elements;
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].classList.remove('is-valid');
                    }
                    
                    successMessage.style.display = 'block';
                    
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    errorMessage.style.display = 'block';
                    
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 5000);
                });
        }
    });
    
    //simula el envío del formulario a un servidor
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = Math.random() < 0.9;
                
                if (isSuccess) {
                    resolve({ status: 'success', message: 'Formulario enviado correctamente' });
                } else {
                    reject({ status: 'error', message: 'Error al enviar el formulario' });
                }
            }, Math.random() * 1000 + 1000);
        });
    }
    
    // Añadir preguntas frecuentes
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('FAQ toggled:', this.textContent.trim());
        });
    });
    
    try {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    } catch (e) {
        console.warn('Bootstrap Tooltip initialization failed:', e);
    }
    

    function trackEvent(category, action, label = null) {
        console.log(`Event tracked: ${category} - ${action}${label ? ' - ' + label : ''}`);
    }
    
    trackEvent('Page', 'View', 'Contact');
    
    contactForm.addEventListener('focus', function() {
        trackEvent('Form', 'Focus', 'Contact Form');
    }, true);
    
    document.querySelector('button[type="submit"]').addEventListener('click', function() {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
    
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const network = this.querySelector('i').className.split('-').pop();
            trackEvent('Social', 'Click', network);
        });
    });
    
    //mapa
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            trackEvent('Map', 'Click', 'Contact Map');
        });
    }
    
    // mostrar mensajes de notificación
    function showNotification(message, type = 'info', duration = 3000) {

        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed bottom-0 end-0 m-3`;
        notification.style.zIndex = '9999';
        notification.style.maxWidth = '300px';
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
    

    const shareButtons = document.querySelectorAll('.share-button');
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.dataset.platform;
                let shareUrl = '';
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Contacta con EcoFood Community`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${encodeURIComponent('Contacta con EcoFood Community: ' + window.location.href)}`;
                        break;
                }
                

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    trackEvent('Share', 'Click', platform);
                }
            });
        });
    }
});
