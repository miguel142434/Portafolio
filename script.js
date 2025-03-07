document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    

    const elementoLogo = document.querySelector('.logo h1');
    const textoBase = "Miguel Z ";
    const palabras = ["Portafolio", "Desarrollador", "Estudiante", "Ingeniero"];
    let indicePalabra = 0;
    let indiceCaracter = 0;
    let borrando = false;
    let velocidadEscritura = 150;
    
    function maquinaEscribir() {
        const palabraActual = palabras[indicePalabra];
        
        if (borrando) {
            indiceCaracter--;
            velocidadEscritura = 100; 
        } else {
            indiceCaracter++;
            velocidadEscritura = 150;
        }
        
        
        elementoLogo.innerHTML = textoBase + `<span style="color: black;">${palabraActual.substring(0, indiceCaracter)}</span>`;
        
        if (!borrando && indiceCaracter === palabraActual.length) {
            borrando = true;
            velocidadEscritura = 1500;
        } 
        else if (borrando && indiceCaracter === 0) {
            borrando = false;
            indicePalabra = (indicePalabra + 1) % palabras.length;
            velocidadEscritura = 500;
        }
        
        setTimeout(maquinaEscribir, velocidadEscritura);
    }
    
    maquinaEscribir();
    
    document.querySelectorAll('nav a').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const idObjetivo = this.getAttribute('href');
            const seccionObjetivo = document.querySelector(idObjetivo);
            
            window.scrollTo({
                top: seccionObjetivo.offsetTop - 70,
                behavior: 'smooth'
            });
            
            document.querySelectorAll('nav li').forEach(item => item.classList.remove('activo'));
            this.parentElement.classList.add('activo');
        });
    });
    
    const formularioContacto = document.getElementById('contact-form');
    const mensajeFormulario = document.getElementById('form-message');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('name').value;
            const correo = document.getElementById('email').value;
            const mensaje = document.getElementById('message').value;
            
            if (!nombre || !correo || !mensaje) {
                mensajeFormulario.textContent = 'Por favor completa todos los campos.';
                mensajeFormulario.className = 'form-message error';
                return;
            }
            
            mensajeFormulario.textContent = '¡Gracias por tu mensaje! Te responderé pronto.';
            mensajeFormulario.className = 'form-message success';
            
            formularioContacto.reset();
            
            setTimeout(() => {
                mensajeFormulario.style.display = 'none';
            }, 5000);
        });
    }
    
    window.addEventListener('scroll', function() {
        const posicionScroll = window.scrollY;
        const secciones = document.querySelectorAll('section');
        
        secciones.forEach(seccion => {
            const parteSuperior = seccion.offsetTop - 100;
            const parteInferior = parteSuperior + seccion.offsetHeight;
            
            if (posicionScroll >= parteSuperior && posicionScroll < parteInferior) {
                document.querySelectorAll('nav li').forEach(item => {
                    item.classList.remove('active');
                });
                
                const id = seccion.getAttribute('id');
                const itemNav = document.querySelector(`nav a[href="#${id}"]`).parentElement;
                itemNav.classList.add('active');
            }
        });
    });
    
    const etiquetasHabilidad = document.querySelectorAll('.skill-tags span');
    
    etiquetasHabilidad.forEach(etiqueta => {
        etiqueta.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        etiqueta.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const tarjetasProyecto = document.querySelectorAll('.project-card');
    
    tarjetasProyecto.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            const imagen = this.querySelector('.project-image img');
            imagen.style.transform = 'scale(1.05)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            const imagen = this.querySelector('.project-image img');
            imagen.style.transform = 'scale(1)';
        });
    });
});
