// contactos.js - Funcionalidades para la página de contacto

document.addEventListener('DOMContentLoaded', function() {
    console.log('📞 Contactos inicializado');
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactoForm = document.getElementById('contacto-form');
    
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validarFormulario()) {
                enviarFormulario();
            }
        });
    }
    
    // ===== VALIDAR FORMULARIO =====
    function validarFormulario() {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
        let valido = true;
        
        // Validar nombre
        if (!nombre) {
            mostrarError('nombre', 'Por favor ingresa tu nombre');
            valido = false;
        } else {
            limpiarError('nombre');
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            mostrarError('email', 'Por favor ingresa tu email');
            valido = false;
        } else if (!emailRegex.test(email)) {
            mostrarError('email', 'Por favor ingresa un email válido');
            valido = false;
        } else {
            limpiarError('email');
        }
        
        // Validar asunto
        if (!asunto) {
            mostrarError('asunto', 'Por favor selecciona un asunto');
            valido = false;
        } else {
            limpiarError('asunto');
        }
        
        // Validar mensaje
        if (!mensaje) {
            mostrarError('mensaje', 'Por favor escribe tu mensaje');
            valido = false;
        } else if (mensaje.length < 10) {
            mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            valido = false;
        } else {
            limpiarError('mensaje');
        }
        
        return valido;
    }
    
    // ===== MOSTRAR ERROR =====
    function mostrarError(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const grupo = campo.closest('.form-group');
        
        // Limpiar errores anteriores
        limpiarError(campoId);
        
        // Añadir clase de error
        campo.classList.add('error');
        
        // Crear mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.textContent = mensaje;
        errorDiv.style.cssText = `
            color: #F44336;
            font-size: 0.85rem;
            margin-top: 5px;
        `;
        
        grupo.appendChild(errorDiv);
    }
    
    // ===== LIMPIAR ERROR =====
    function limpiarError(campoId) {
        const campo = document.getElementById(campoId);
        const grupo = campo.closest('.form-group');
        
        // Remover clase de error
        campo.classList.remove('error');
        
        // Remover mensajes de error anteriores
        const erroresAnteriores = grupo.querySelectorAll('.error-mensaje');
        erroresAnteriores.forEach(error => error.remove());
    }
    
    // ===== ENVIAR FORMULARIO =====
    function enviarFormulario() {
        const btnEnviar = contactoForm.querySelector('.btn-enviar');
        const textoOriginal = btnEnviar.innerHTML;
        
        // Mostrar loading
        btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btnEnviar.disabled = true;
        
        // Simular envío (en un caso real aquí iría una petición AJAX)
        setTimeout(() => {
            // Éxito
            btnEnviar.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            btnEnviar.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Mostrar mensaje de éxito
            mostrarMensajeExito();
            
            // Resetear formulario después de 2 segundos
            setTimeout(() => {
                contactoForm.reset();
                btnEnviar.innerHTML = textoOriginal;
                btnEnviar.disabled = false;
                btnEnviar.style.background = '';
            }, 2000);
            
            // Aquí normalmente enviarías los datos a tu servidor
            const datosFormulario = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value,
                fecha: new Date().toISOString()
            };
            
            console.log('📧 Formulario enviado:', datosFormulario);
            
        }, 1500);
    }
    
    // ===== MOSTRAR MENSAJE DE ÉXITO =====
    function mostrarMensajeExito() {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = 'mensaje-exito';
        mensajeDiv.innerHTML = `
            <div class="mensaje-contenido">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>¡Mensaje Enviado!</h4>
                    <p>Te contactaremos en menos de 24 horas</p>
                </div>
            </div>
        `;
        
        // Estilos
        mensajeDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            text-align: center;
            animation: fadeIn 0.5s ease;
            max-width: 400px;
            width: 90%;
        `;
        
        document.body.appendChild(mensajeDiv);
        
        // Fondo oscuro
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Cerrar después de 3 segundos
        setTimeout(() => {
            mensajeDiv.style.animation = 'fadeOut 0.5s ease';
            overlay.style.animation = 'fadeOut 0.3s ease';
            
            setTimeout(() => {
                mensajeDiv.remove();
                overlay.remove();
            }, 500);
        }, 3000);
    }
    
    // ===== NÚMEROS DE TELÉFONO CLICKABLES =====
    function setupTelefonosClickables() {
        const telefonos = document.querySelectorAll('.contacto-info');
        
        telefonos.forEach(telefono => {
            const texto = telefono.textContent;
            const numeroMatch = texto.match(/\d{2}\s?\d{4}\s?\d{4}/);
            
            if (numeroMatch) {
                const numero = numeroMatch[0].replace(/\s/g, '');
                telefono.innerHTML = texto.replace(
                    numeroMatch[0],
                    `<a href="tel:${numero}" style="color: var(--azul); text-decoration: none; font-weight: bold;">${numeroMatch[0]}</a>`
                );
            }
        });
    }
    
    // ===== INICIALIZAR =====
    function init() {
        setupTelefonosClickables();
        
        // Añadir estilos para validación
        if (!document.querySelector('#estilos-validacion')) {
            const estilo = document.createElement('style');
            estilo.id = 'estilos-validacion';
            estilo.textContent = `
                .form-group input.error,
                .form-group select.error,
                .form-group textarea.error {
                    border-color: #F44336 !important;
                    background-color: rgba(244, 67, 54, 0.05);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, -60%); }
                    to { opacity: 1; transform: translate(-50%, -50%); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .mensaje-contenido {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .mensaje-contenido i {
                    font-size: 2.5rem;
                    color: #4CAF50;
                }
                .mensaje-contenido h4 {
                    margin: 0;
                    color: var(--texto);
                }
                .mensaje-contenido p {
                    margin: 5px 0 0 0;
                    color: var(--texto-claro);
                }
            `;
            document.head.appendChild(estilo);
        }
        
        console.log('✅ Contactos listo');
    }
    
    // Iniciar
    init();
});