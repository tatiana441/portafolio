// ===============================================
// PORTAFOLIO TATIANA MUÑOZ - JAVASCRIPT
// ===============================================

// Años de experiencia en tiempo real: se calculan a partir de la fecha de
// inicio (marzo 2021 en Teleperformance) en cada carga de página, para que
// nunca vuelvan a quedar desactualizados. Cualquier elemento con el atributo
// data-years-since="YYYY-MM" se actualiza automáticamente; data-years-suffix
// agrega un texto después del número (ej. "años").
function updateExperienceYears() {
    document.querySelectorAll('[data-years-since]').forEach(el => {
        const [year, month] = el.dataset.yearsSince.split('-').map(Number);
        const startDate = new Date(year, month - 1, 1);
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        const beforeAnniversary =
            now.getMonth() < startDate.getMonth() ||
            (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate());
        if (beforeAnniversary) years--;

        const suffix = el.dataset.yearsSuffix;
        el.textContent = suffix ? `${years} ${suffix}` : years;
    });
}

updateExperienceYears();

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Menú hamburguesa móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Highlight del nav link activo al hacer scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .achievement-card, .skill-category');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observar las estadísticas para animarlas cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numberElement = entry.target.querySelector('.stat-number');
            const targetValue = numberElement.textContent.replace(/\D/g, '');
            const suffix = numberElement.textContent.replace(/[0-9]/g, '');

            if (targetValue) {
                numberElement.textContent = '0';
                setTimeout(() => {
                    animateCounter(numberElement, parseInt(targetValue));
                    setTimeout(() => {
                        numberElement.textContent += suffix;
                    }, 2100);
                }, 200);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Copiar email al hacer click
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Mostrar tooltip temporal
                const tooltip = document.createElement('span');
                tooltip.textContent = '✓ Email copiado';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #0066CC;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    margin-left: 10px;
                    animation: fadeIn 0.3s ease;
                `;
                link.parentElement.style.position = 'relative';
                link.parentElement.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        }
    });
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Prevenir comportamiento predeterminado en enlaces externos
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Permitir que el navegador maneje el enlace normalmente
        // Solo agregamos rel="noopener noreferrer" por seguridad
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Detectar modo oscuro del sistema (opcional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Usuario prefiere modo oscuro');
    // Aquí podrías agregar lógica para cambiar el tema si lo deseas
}

// Lazy loading para imágenes (si agregas fotos después)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Mensaje de consola (opcional - para recruiters que inspeccionen el código)
console.log('%c👋 Hola! Soy Tatiana Muñoz', 'font-size: 20px; color: #0066CC; font-weight: bold;');
console.log('%cBI Analyst | Data Scientist | Python | SQL | NLP', 'font-size: 14px; color: #666;');
console.log('%c¿Buscas un perfil de datos? Contáctame: tatiana.441@gmail.com', 'font-size: 12px; color: #00B4D8;');
console.log('%cLinkedIn: https://linkedin.com/in/tmarias', 'font-size: 12px; color: #00B4D8;');

// Performance monitoring (opcional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
    });
}

// Easter egg - Konami Code (opcional - divertido para recruiters tech)
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            alert('🎉 ¡Encontraste el easter egg! Si llegaste aquí, definitivamente deberías contratarme 😄');
            document.body.style.animation = '';
        }, 100);
    }
});

// Agregar estilo para el easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Función para descargar CV (cuando tengas el PDF)
function downloadCV() {
    // Cuando tengas el CV en PDF, descomenta y ajusta la ruta:
    // const link = document.createElement('a');
    // link.href = 'CV_Tatiana_Munoz_BI_Analyst.pdf';
    // link.download = 'CV_Tatiana_Munoz_BI_Analyst.pdf';
    // link.click();

    alert('CV disponible próximamente. Por ahora, contáctame en tatiana.441@gmail.com');
}

// Hacer la función accesible globalmente si agregas el botón de descarga
window.downloadCV = downloadCV;

console.log('✅ Portafolio cargado exitosamente');
