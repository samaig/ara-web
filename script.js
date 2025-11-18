/**
 * ARAVIEL - Landing Page JavaScript
 * Handles all interactions, animations, and form submissions
 */

// ============================================
// NAVIGATION
// ============================================

const nav = document.getElementById('nav');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

// Scroll effect for navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// AUDIENCE TABS
// ============================================

const tabButtons = document.querySelectorAll('.tab-button');
const audiencePanels = document.querySelectorAll('.audience-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        audiencePanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const targetPanel = document.querySelector(`[data-panel="${targetTab}"]`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// ============================================
// WAITLIST FORM
// ============================================

const waitlistForm = document.getElementById('waitlistForm');
const waitlistSuccess = document.getElementById('waitlistSuccess');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Get submit button
        const submitButton = waitlistForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="btn-text">Joining...</span>';

        try {
            // In a real implementation, you would send this to your backend
            // For now, we'll simulate a successful submission
            await simulateAPICall(email);

            // Hide form and show success message
            waitlistForm.style.display = 'none';
            waitlistSuccess.classList.add('show');

            // Increment counter
            incrementCounter();

            // Store email in localStorage (for demo purposes)
            localStorage.setItem('araviel_waitlist_email', email);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Oops! Something went wrong. Please try again.');
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

// Simulate API call (replace with real backend integration)
function simulateAPICall(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Email submitted:', email);
            resolve();
        }, 1500);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target).toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

function incrementCounter() {
    const counterElement = document.querySelector('.proof-number[data-count]');
    if (counterElement) {
        const currentCount = parseInt(counterElement.getAttribute('data-count'));
        const newCount = currentCount + 1;
        counterElement.setAttribute('data-count', newCount);
        animateCounter(counterElement, newCount);
    }
}

// Initialize counter on page load
window.addEventListener('load', () => {
    const counterElement = document.querySelector('.proof-number[data-count]');
    if (counterElement) {
        const targetCount = parseInt(counterElement.getAttribute('data-count'));
        animateCounter(counterElement, targetCount);
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Special animation for feature cards
            if (entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('problem-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .problem-card, .feature-card, .step').forEach(el => {
    observer.observe(el);
});

// ============================================
// PARALLAX EFFECT FOR HERO ORBS
// ============================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    orbs.forEach((orb, index) => {
        const speed = parallaxSpeed * (index + 1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// LAZY LOADING FOR IMAGES (if any are added)
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

window.addEventListener('load', () => {
    // Check if browser supports Performance API
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log(`Page load time: ${pageLoadTime}ms`);

        // Send to analytics (implement your analytics here)
        // Example: gtag('event', 'timing_complete', { name: 'load', value: pageLoadTime });
    }
});

// ============================================
// COPY EMAIL TO CLIPBOARD (Investors Section)
// ============================================

const investorEmail = document.querySelector('.investors-contact');
if (investorEmail) {
    investorEmail.style.cursor = 'pointer';
    investorEmail.title = 'Click to copy';

    investorEmail.addEventListener('click', async () => {
        const email = 'investors@araviel.ai';

        try {
            await navigator.clipboard.writeText(email);

            // Show feedback
            const originalText = investorEmail.textContent;
            investorEmail.textContent = '✓ Copied to clipboard!';
            investorEmail.style.color = 'var(--color-success)';

            setTimeout(() => {
                investorEmail.textContent = originalText;
                investorEmail.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    });
}

// ============================================
// KEYBOARD NAVIGATION IMPROVEMENTS
// ============================================

// Trap focus in mobile menu when open
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

if (mobileMenu) {
    const firstFocusableElement = mobileMenu.querySelectorAll(focusableElements)[0];
    const focusableContent = mobileMenu.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', (e) => {
        if (!mobileMenu.classList.contains('active')) return;

        const isTabPressed = e.key === 'Tab';

        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });

    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            mobileMenuToggle.focus();
        }
    });
}

// ============================================
// SOLUTION GRAPHIC INTERACTION
// ============================================

const modelNodes = document.querySelectorAll('.model-node');
const centerLogo = document.querySelector('.center-logo');

modelNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        // Highlight connection
        if (centerLogo) {
            centerLogo.style.transform = 'scale(1.1)';
            centerLogo.style.transition = 'transform 0.3s ease';
        }
    });

    node.addEventListener('mouseleave', () => {
        if (centerLogo) {
            centerLogo.style.transform = 'scale(1)';
        }
    });
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);

    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Remove after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        console.log('🎉 You found the secret! Welcome to the future of AI.');
    }
});

// ============================================
// FORM VALIDATION HELPER
// ============================================

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Real-time email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
        const email = e.target.value.trim();
        if (email && !validateEmail(email)) {
            emailInput.style.borderColor = 'var(--color-error)';
            emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
        } else {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
        }
    });

    emailInput.addEventListener('focus', (e) => {
        emailInput.style.borderColor = '';
        emailInput.style.boxShadow = '';
    });
}

// ============================================
// ANALYTICS INTEGRATION (Google Analytics, Plausible, etc.)
// ============================================

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonLocation = button.closest('section')?.id || 'unknown';

        console.log('CTA Click:', {
            text: buttonText,
            location: buttonLocation
        });

        // Send to your analytics platform
        // Example for Google Analytics:
        // gtag('event', 'cta_click', {
        //     button_text: buttonText,
        //     button_location: buttonLocation
        // });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log('Section viewed:', sectionId);

            // Send to your analytics platform
            // Example for Google Analytics:
            // gtag('event', 'section_view', {
            //     section_id: sectionId
            // });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// PROGRESSIVE ENHANCEMENT
// ============================================

// Check for JavaScript support and add class to body
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Check for touch support
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.documentElement.classList.add('touch');
} else {
    document.documentElement.classList.add('no-touch');
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Welcome to Araviel!', 'font-size: 20px; font-weight: bold; color: #A78BFA;');
console.log('%cWe\'re building the future of AI interaction.', 'font-size: 14px; color: #6B6761;');
console.log('%cInterested in joining our team? Email us at careers@araviel.ai', 'font-size: 12px; color: #FF6B6B;');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Araviel landing page loaded successfully');

    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fix smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

