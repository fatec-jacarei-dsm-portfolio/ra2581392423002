// 1. Efeito de Digitação Dinâmico
const textElement = document.getElementById('typing-text');
const messages = [
    "Analista e Desenvolvedor em formação.",
    "Focado em React, Node.js e TypeScript.",
    "Especialista em resolver problemas complexos.",
    "Apaixonado por criar experiências digitais."
];
let msgIndex = 0;
let charIndex = 0;
let isTyping = true;

function type() {
    if (charIndex < messages[msgIndex].length) {
        textElement.textContent += messages[msgIndex].charAt(charIndex++);
        setTimeout(type, 60);
    } else {
        isTyping = false;
        setTimeout(erase, 2500);
    }
}

function erase() {
    if (charIndex > 0) {
        textElement.textContent = messages[msgIndex].substring(0, charIndex-- - 1);
        setTimeout(erase, 30);
    } else {
        isTyping = true;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(type, 500);
    }
}

// 2. Sistema de Filtros (Carrossel)
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
const projectsCarousel = document.getElementById('project-container');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Botão Ativo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Reset scroll do carrossel ao filtrar
        projectsCarousel.scrollLeft = 0;

        cards.forEach(card => {
            // Animação de saída sutil
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (filter === 'todos' || card.dataset.categoria === filter) {
                    card.style.display = 'block'; // 'block' mantém a perspectiva 3D ativa
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    });
});

// 3. Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('nav ul');
const navLinksLi = document.querySelectorAll('nav ul li');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    
    navLinksLi.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    mobileMenu.classList.toggle('toggle');
});

navLinksLi.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            mobileMenu.classList.remove('toggle');
            navLinksLi.forEach(l => l.style.animation = '');
        }
    });
});

// 4. Grid de Partículas Reativas (Background)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: -100, y: -100, radius: 150 }; 

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = -100;
    mouse.y = -100;
});

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const spacing = 50; 
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            particles.push({ x, y, baseOpacity: Math.random() * 0.02 + 0.01 });
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const opacity = force * 0.4;
            
            ctx.fillStyle = `rgba(255, 90, 31, ${opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 + force, 0, Math.PI * 2); 
            ctx.fill();
            
            if (dist < mouse.radius * 0.6) {
                ctx.strokeStyle = `rgba(255, 90, 31, ${opacity * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.baseOpacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    requestAnimationFrame(animate);
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCanvas();
    }, 200);
});

// Inicialização
initCanvas();
animate();
type();