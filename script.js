// ===========================
// Navigation & Mobile Menu
// ===========================
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===========================
// Smooth Scroll
// ===========================
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
        }
    });
});

// ===========================
// Scroll to Top Button
// ===========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Intersection Observer (AOS Animation)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===========================
// Gallery Lightbox
// ===========================
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;
let galleryImages = [];

// Create lightbox element
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Sluiten">&times;</button>
        <button class="lightbox-prev" aria-label="Vorige">&#10094;</button>
        <button class="lightbox-next" aria-label="Volgende">&#10095;</button>
        <img src="" alt="">
    </div>
`;
document.body.appendChild(lightbox);

// Add lightbox styles
const lightboxStyles = `
    .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .lightbox-close,
    .lightbox-prev,
    .lightbox-next {
        position: absolute;
        background: rgba(212, 175, 55, 0.9);
        color: var(--text-dark);
        border: none;
        font-size: 32px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        border-radius: 50%;
    }
    
    .lightbox-close {
        top: 20px;
        right: 20px;
    }
    
    .lightbox-prev {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .lightbox-next {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .lightbox-close:hover,
    .lightbox-prev:hover,
    .lightbox-next:hover {
        background: var(--primary);
        transform: scale(1.1);
    }
    
    .lightbox-prev:hover {
        transform: translateY(-50%) scale(1.1);
    }
    
    .lightbox-next:hover {
        transform: translateY(-50%) scale(1.1);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);
    
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = galleryImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = galleryImages[currentImageIndex];
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===========================
// Dynamic Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ===========================
// Opening Hours Highlight
// ===========================
function highlightCurrentDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    const hoursTable = document.querySelector('.hours-table');
    
    if (hoursTable) {
        const rows = hoursTable.querySelectorAll('tr');
        rows.forEach(row => {
            const dayCell = row.querySelector('td:first-child');
            if (dayCell) {
                const dayText = dayCell.textContent.toLowerCase();
                if (
                    (currentDay === 'Monday' && dayText.includes('maandag')) ||
                    (currentDay === 'Sunday' && dayText.includes('zondag')) ||
                    (['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(currentDay) && 
                     dayText.includes('dinsdag') && dayText.includes('zaterdag'))
                ) {
                    row.style.background = 'rgba(212, 175, 55, 0.15)';
                    row.style.fontWeight = '600';
                }
            }
        });
    }
}

highlightCurrentDay();

// ===========================
// Performance: Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Console Message
// ===========================
console.log('%c Kapsalon Rasho ', 'background: #D4AF37; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('Website gemaakt voor Kapsalon Rasho - Made');
console.log('Bezoek ons op Marktstraat 32, 4921 EG Made');

// ===========================
// Prevent Right-Click on Gallery Images (Optional)
// ===========================
// Uncomment if you want to protect gallery images
/*
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
*/
