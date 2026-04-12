// DOM Elements
const preloader = document.getElementById('preloader');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const typedTextElement = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');
const statNumbers = document.querySelectorAll('.stat-number');
const skillBars = document.querySelectorAll('.skill-progress .progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Typed Animation
const typedTexts = [
    'Web Designer',
    'Mobile App Developer',
    'Graphics Designer',
    'Digital Solutions Expert',
    'Founder of Asmart'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typedTexts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typedTexts.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeText, typingSpeed);
}

// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.8 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card, .skill-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// Preloader
function hidePreloader() {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
}

// Mobile Navigation
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const progress = (scrollPosition / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

// Navbar Background on Scroll
function updateNavbarBackground() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Back to Top Button
function updateBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    const icon = themeToggle.querySelector('i');
    
    if (isLightMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Load Saved Theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Counter Animation
function animateCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    statNumbers.forEach(counter => observer.observe(counter));
}

// Skill Bars Animation
function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                observer.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Portfolio Filter
function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            item.style.display = 'block';
        } else {
            item.classList.add('hidden');
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
}

// Testimonial Slider
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create email content
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n\n` +
        `Message:\n${data.message}`
    );
    
    // Create mailto link
    const mailtoLink = `mailto:asiimwelucky34@gmail.com?subject=${subject}&body=${body}`;
    
    // Show sending message
    formMessage.textContent = 'Opening your email client...';
    formMessage.className = 'form-message';
    formMessage.style.display = 'block';
    
    // Open email client
    setTimeout(() => {
        window.location.href = mailtoLink;
        
        formMessage.textContent = 'Thank you for your message! Your email client has been opened.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1000);
}

// Smooth Scroll for Navigation Links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .skill-card, .portfolio-card, .about-content, .contact-content, .documentation-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function isSafeHttpUrl(url) {
    try {
        const u = new URL(String(url).trim());
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}

function formatFileSize(bytes) {
    const n = Number(bytes);
    if (bytes == null || Number.isNaN(n) || n < 0) return '';
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

/** Supports { documents: [...] } or your Apps Script shape { files: [{ name, id, url, viewUrl, type, size, date }] } */
function normalizeDriveFeed(data) {
    if (!data || typeof data !== 'object') return [];
    if (Array.isArray(data.documents) && data.documents.length > 0) {
        return data.documents;
    }
    if (Array.isArray(data.files) && data.files.length > 0) {
        return data.files.map((f) => {
            const name = (f.name != null && String(f.name).trim()) || (f.title != null && String(f.title).trim()) || '';
            let downloadUrl = f.url != null ? String(f.url).trim() : '';
            if (!downloadUrl && f.id != null) {
                downloadUrl = 'https://drive.google.com/uc?export=download&id=' + String(f.id).trim();
            }
            const type = f.type != null ? String(f.type).trim() : '';
            const sizeStr = formatFileSize(f.size);
            let dateStr = '';
            if (f.date) {
                try {
                    dateStr = new Date(f.date).toLocaleString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    });
                } catch {
                    dateStr = '';
                }
            }
            const descParts = [type, sizeStr, dateStr].filter(Boolean);
            return {
                title: name,
                description: descParts.join(' · '),
                url: downloadUrl,
                viewUrl: f.viewUrl != null ? String(f.viewUrl).trim() : ''
            };
        });
    }
    return [];
}

function renderDocumentationCards(list, docs, emptyMessage) {
    list.innerHTML = '';
    let rendered = 0;
    docs.forEach((doc) => {
        if (!doc) return;
        const title =
            (doc.title != null && String(doc.title).trim()) ||
            (doc.name != null && String(doc.name).trim()) ||
            '';
        if (!title) return;
        rendered += 1;
        const rawUrl = doc.url != null ? String(doc.url).trim() : '';
        const hasUrl = isSafeHttpUrl(rawUrl);
        const viewRaw = doc.viewUrl != null ? String(doc.viewUrl).trim() : '';
        const hasView = isSafeHttpUrl(viewRaw) && viewRaw !== rawUrl;
        const card = document.createElement('article');
        card.className = 'documentation-card';
        card.setAttribute('role', 'listitem');
        let actions = hasUrl
            ? '<a class="btn-doc" href="' +
              escapeHtml(rawUrl) +
              '" target="_blank" rel="noopener noreferrer"><i class="fas fa-download" aria-hidden="true"></i> Download</a>'
            : '<span class="documentation-soon">' +
              escapeHtml(emptyMessage) +
              '</span>';
        if (hasView) {
            actions +=
                ' <a class="documentation-view-link" href="' +
                escapeHtml(viewRaw) +
                '" target="_blank" rel="noopener noreferrer">View in Drive</a>';
        }
        card.innerHTML =
            '<h3>' +
            escapeHtml(title) +
            '</h3><p>' +
            escapeHtml(doc.description || '') +
            '</p>' +
            actions;
        list.appendChild(card);
    });
    return rendered;
}

function fetchDriveFeed(feedUrl) {
    const sep = feedUrl.includes('?') ? '&' : '?';
    const url = feedUrl + sep + '_=' + Date.now();
    return fetch(url, { method: 'GET', credentials: 'omit' }).then((res) => {
        if (!res.ok) return Promise.reject(new Error('feed HTTP ' + res.status));
        return res.json();
    });
}

function loadClientDocuments() {
    const list = document.getElementById('documentation-list');
    const fallback = document.getElementById('documentation-fallback');
    if (!list || !fallback) return;

    const manualHint =
        'Add a full https URL in docs/documents.json for this row (Google Drive direct link or a path under docs/).';
    const driveHint =
        'Missing download URL for this file. Check sharing on the file or the Apps Script folder.';

    fetch('docs/documents.json')
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
        .then((config) => {
            const feedUrl =
                config.driveFeedUrl != null && String(config.driveFeedUrl).trim()
                    ? String(config.driveFeedUrl).trim()
                    : '';
            const staticDocs = Array.isArray(config.documents) ? config.documents : [];

            const showFallback = () => {
                fallback.hidden = false;
            };

            const applyStatic = () => {
                list.innerHTML = '';
                const rendered = renderDocumentationCards(list, staticDocs, manualHint);
                if (rendered === 0) showFallback();
                else fallback.hidden = true;
            };

            if (!feedUrl) {
                applyStatic();
                return;
            }

            fetchDriveFeed(feedUrl)
                .then((data) => {
                    const fromDrive = normalizeDriveFeed(data);
                    list.innerHTML = '';
                    if (fromDrive.length > 0) {
                        const rendered = renderDocumentationCards(list, fromDrive, driveHint);
                        if (rendered === 0) applyStatic();
                        else fallback.hidden = true;
                    } else {
                        applyStatic();
                    }
                })
                .catch(() => {
                    applyStatic();
                });
        })
        .catch(() => {
            fallback.hidden = false;
        });
}

function initAiHelpPanel() {
    const toggle = document.getElementById('ai-help-toggle');
    const panel = document.getElementById('ai-help-panel');
    const backdrop = document.getElementById('ai-help-backdrop');
    const closeBtn = document.getElementById('ai-help-close');
    const frame = document.getElementById('ai-help-frame');
    if (!toggle || !panel || !backdrop || !closeBtn || !frame) return;

    let iframeLoaded = false;

    function openPanel() {
        if (!iframeLoaded) {
            const src = frame.getAttribute('data-src');
            if (src) frame.src = src;
            iframeLoaded = true;
        }
        panel.hidden = false;
        backdrop.hidden = false;
        panel.setAttribute('aria-hidden', 'false');
        backdrop.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            panel.classList.add('is-open');
            backdrop.classList.add('is-visible');
        });
    }

    function closePanel() {
        panel.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        toggle.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        const onEnd = (e) => {
            if (e.target !== panel || e.propertyName !== 'transform') return;
            panel.removeEventListener('transitionend', onEnd);
            if (!panel.classList.contains('is-open')) {
                panel.hidden = true;
                backdrop.hidden = true;
            }
        };
        panel.addEventListener('transitionend', onEnd);
        setTimeout(() => {
            if (!panel.classList.contains('is-open')) {
                panel.hidden = true;
                backdrop.hidden = true;
            }
        }, 500);
    }

    toggle.addEventListener('click', () => {
        if (panel.classList.contains('is-open')) closePanel();
        else openPanel();
    });
    closeBtn.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
    });
}

function initPortfolioPlaceholders() {
    document.querySelectorAll('a.portfolio-action[data-placeholder="true"]').forEach((a) => {
        a.addEventListener('click', (e) => e.preventDefault());
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start animations
    typeText();
    createParticles();
    hidePreloader();
    loadSavedTheme();
    animateCounters();
    animateSkillBars();
    initScrollAnimations();
    loadClientDocuments();
    initAiHelpPanel();
    initPortfolioPlaceholders();
    
    // Initialize custom cursor only on desktop
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
});

// Event Listeners
hamburger.addEventListener('click', toggleMobileMenu);
themeToggle.addEventListener('click', toggleTheme);
contactForm.addEventListener('submit', handleContactForm);
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navigation links smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScrollTo(target);
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Portfolio filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        filterPortfolio(category);
    });
});

// Testimonial controls
prevBtn.addEventListener('click', prevTestimonial);
nextBtn.addEventListener('click', nextTestimonial);

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateScrollProgress();
    updateNavbarBackground();
    updateBackToTopButton();
});

// Window resize event
window.addEventListener('resize', () => {
    // Re-initialize custom cursor on desktop
    if (window.innerWidth > 768) {
        initCustomCursor();
    }
});

// Add CSS for particles animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
        }
        33% {
            transform: translateY(-30px) translateX(20px);
        }
        66% {
            transform: translateY(20px) translateX(-20px);
        }
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Add hover effect to cards
document.querySelectorAll('.service-card, .portfolio-card, .skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease';
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
    updateScrollProgress();
    updateNavbarBackground();
    updateBackToTopButton();
}, 10));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    }
    
    if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Add touch support for mobile swipe on testimonials
let touchStartX = 0;
let touchEndX = 0;

const testimonialsSlider = document.querySelector('.testimonials-slider');

testimonialsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextTestimonial(); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        prevTestimonial(); // Swipe right
    }
}

// Console Easter egg
console.log('%c🚀 Welcome to Asiimwe Lucky\'s Portfolio!', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion in Kagadi, Uganda 🇺🇬', 'color: #0A0E27; font-size: 14px;');
console.log('%cCheck out my work and let\'s build something amazing together!', 'color: #FFA500; font-size: 12px;');
