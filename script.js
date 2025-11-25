/**
 * ARAVIEL - World-Class Landing Page JavaScript
 * Theme Toggle | Mobile Menu | Countdown | Forms
 */

(function() {
    'use strict';

    // ============================================
    // THEME TOGGLE
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('araviel-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('araviel-theme', newTheme);

            // Add a subtle animation
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }

    // ============================================
    // COUNTDOWN TIMER
    // ============================================
    function initCountdown() {
        const launchDate = new Date('2026-02-01T00:00:00').getTime();

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.getElementById('nav')?.offsetHeight || 60;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
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
            const submitBtn = waitlistForm.querySelector('button[type="submit"]');

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.style.borderColor = '#EF4444';
                emailInput.focus();
                return;
            }

            // Disable button and show loading
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Joining...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success
                waitlistForm.style.display = 'none';
                waitlistSuccess.classList.add('show');
                localStorage.setItem('araviel_waitlist_email', email);

            } catch (error) {
                console.error('Form submission error:', error);
                alert('Something went wrong. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
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
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                requestAnimationFrame(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.mission-card, .problem-card, .how-card, .feature-card, .solution-card, .business-card, .investor-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // EMAIL VALIDATION FEEDBACK
    // ============================================
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            emailInput.style.borderColor = '';
        });

        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                emailInput.style.borderColor = '#EF4444';
            }
        });
    }

    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c Araviel', 'font-size: 24px; font-weight: bold; color: #06B6D4;');
    console.log('%c The AI Lifestyle Operating System', 'font-size: 14px; color: #9CA3AF;');
    console.log('%c Join us: careers@araviel.ai', 'font-size: 12px; color: #F97316;');

    // ============================================
    // INITIALIZE
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initCountdown();
        document.body.classList.add('loaded');
    });

    // If DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initCountdown();
    }

})();
