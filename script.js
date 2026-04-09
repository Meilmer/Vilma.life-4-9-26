// Portfolio Website JavaScript

// Ensure page starts at the top
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Also ensure it's at top when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    // Mobile nav toggle (only when hamburger + menu exist; homepage may hide both on small screens via CSS)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.skill-category, .work-item, .about-text, .about-image');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Timeline expand/collapse functionality
    window.toggleTimelineItem = function(element) {
        const opening = !element.classList.contains('expanded');
        document.querySelectorAll('.timeline-content').forEach(item => {
            if (item === element) {
                item.classList.toggle('expanded', opening);
                item.setAttribute('aria-expanded', opening ? 'true' : 'false');
            } else {
                item.classList.remove('expanded');
                item.setAttribute('aria-expanded', 'false');
            }
        });
    };

    document.querySelectorAll('.timeline-content').forEach(card => {
        const titleEl = card.querySelector('.job-title');
        const title = titleEl ? titleEl.textContent.trim() : 'Role';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-expanded', 'false');
        card.setAttribute('aria-label', `${title}, expand for details`);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.toggleTimelineItem(card);
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroElements = document.querySelectorAll('.floating-elements .element');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        heroElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Animate stats counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        updateCounter();
    }
    
    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Work item hover effects
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Contact form handling
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#4ecdc4';
                break;
            case 'error':
                notification.style.background = '#ff6b35';
                break;
            default:
                notification.style.background = '#45b7d1';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    function showEmailCopyToast(anchor, message, type) {
        const wrap = anchor.closest('.contact-email-wrap');
        if (!wrap) {
            showNotification(message, type);
            return;
        }
        wrap.querySelectorAll('.email-copy-toast').forEach(function(el) {
            el.remove();
        });
        const toast = document.createElement('div');
        toast.className = 'email-copy-toast' + (type === 'error' ? ' email-copy-toast--error' : '');
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        wrap.appendChild(toast);
        requestAnimationFrame(function() {
            toast.classList.add('is-visible');
        });
        window.setTimeout(function() {
            toast.classList.remove('is-visible');
            window.setTimeout(function() {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2600);
    }

    // Copy contact email to clipboard on click (mailto kept for no-JS fallback)
    const contactEmailCopy = document.getElementById('contact-email-copy');
    if (contactEmailCopy) {
        contactEmailCopy.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email') || '';
            if (!email) return;

            function legacyCopy() {
                try {
                    const ta = document.createElement('textarea');
                    ta.value = email;
                    ta.setAttribute('readonly', '');
                    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
                    document.body.appendChild(ta);
                    ta.select();
                    const ok = document.execCommand('copy');
                    document.body.removeChild(ta);
                    return ok;
                } catch (err) {
                    return false;
                }
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(function() {
                    showEmailCopyToast(contactEmailCopy, 'Email copied to clipboard', 'success');
                }).catch(function() {
                    if (legacyCopy()) {
                        showEmailCopyToast(contactEmailCopy, 'Email copied to clipboard', 'success');
                    } else {
                        showEmailCopyToast(contactEmailCopy, 'Could not copy email', 'error');
                    }
                });
            } else if (legacyCopy()) {
                showEmailCopyToast(contactEmailCopy, 'Email copied to clipboard', 'success');
            } else {
                showEmailCopyToast(contactEmailCopy, 'Could not copy email', 'error');
            }
        });
    }
    
    // Simple star cursor trail effect
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.1;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        const cursor = document.querySelector('.cursor-trail');
        if (cursor) {
            cursor.style.left = ballX + 'px';
            cursor.style.top = ballY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Create simple star cursor trail element
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.innerHTML = '✦';
    Object.assign(cursorTrail.style, {
        position: 'fixed',
        width: '32px',
        height: '32px',
        fontSize: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: '9999',
        color: 'rgba(255, 107, 53, 0.6)',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out',
        animation: 'starWiggle 2s ease-in-out infinite'
    });
    document.body.appendChild(cursorTrail);
    
    // Start cursor animation
    animateCursor();
    
    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursorTrail.style.display = 'none';
    }
    
    // Frog interaction setup - click only
    const frog = document.getElementById('frog-illustration');
    if (frog) {
        // Click interaction for all devices
        frog.addEventListener('click', function(e) {
            e.preventDefault();
            frogBounce();
        });
        
        // Add visual feedback for interaction - always show pointer cursor
        frog.style.cursor = 'pointer';
        
        // Ensure cursor stays as pointer even during cooldown
        frog.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS and shooting star animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes starWiggle {
            0%, 100% {
                transform: translate(-50%, -50%) rotate(0deg) scale(1);
            }
            25% {
                transform: translate(-50%, -50%) rotate(-5deg) scale(1.1);
            }
            50% {
                transform: translate(-50%, -50%) rotate(0deg) scale(0.9);
            }
            75% {
                transform: translate(-50%, -50%) rotate(5deg) scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
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
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        // Scroll-based animations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Initialize everything
    console.log('Portfolio website loaded successfully!');
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
});

// Frog interaction variables
let frogCooldown = false;
let isMobile = window.innerWidth <= 768;

// Simple Frog Bounce Function with Sound
function frogBounce() {
    if (frogCooldown) return; // Prevent spam
    
    const frog = document.getElementById('frog-illustration');
    
    // Add bounce animation
    frog.classList.add('clicked');
    
    // Play ribbit sound
    playRibbitSound();
    
    // Set cooldown
    frogCooldown = true;
    frog.classList.add('cooldown');
    
    // Remove animation class after it finishes
    setTimeout(() => {
        frog.classList.remove('clicked');
    }, 600);
    
    // Reset cooldown after sound finishes + 3 seconds
    setTimeout(() => {
        frogCooldown = false;
        frog.classList.remove('cooldown');
    }, 6000); // 3 seconds for sound + 3 seconds cooldown
}

// Play real frog sound
function playRibbitSound() {
    // Create audio element
    const audio = new Audio();
    
    // Try to load a frog sound file
    audio.src = 'frog-croaks-22312.mp3';
    audio.volume = 0.4; // Set volume to 40%
    
    // Play the sound
    audio.play().catch(error => {
        console.log('Frog sound file not found, using fallback sound');
        // Fallback to a simple beep if file doesn't exist
        playFallbackSound();
    });
    
    // Cut off sound after 3 seconds
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset to beginning
    }, 3000);
}

// Simple fallback sound if frog file doesn't exist
function playFallbackSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}
