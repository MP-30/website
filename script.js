// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function setNavigationOpen(isOpen) {
    if (!hamburger || !navMenu) return;

    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        setNavigationOpen(hamburger.getAttribute('aria-expanded') !== 'true');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setNavigationOpen(false);
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger?.getAttribute('aria-expanded') === 'true') {
        setNavigationOpen(false);
        hamburger.focus();
    }
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.skill-card, .timeline-item, .project-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const isCurrent = link.getAttribute('href').slice(1) === current;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
});

// ===== NAVBAR STYLING ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    // Animate hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');

    if (!prefersReducedMotion) {
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease 0.2s forwards';
        if (heroCTA) heroCTA.style.animation = 'fadeInUp 0.8s ease 0.4s forwards';
        if (heroStats) heroStats.style.animation = 'fadeInUp 0.8s ease 0.6s forwards';
    }

    console.log('✨ Portfolio loaded successfully');
});
