document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .stat-card, .contact-card, .section-header, .hero-content, .hero-image');

    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Chart Animation Trigger
    const chart = document.querySelector('.chart-mockup');
    if (chart) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Re-trigger CSS animation
                    const bars = document.querySelectorAll('.chart-bar');
                    bars.forEach((bar) => {
                        bar.style.animation = 'none';
                        bar.offsetHeight; /* trigger reflow */
                        bar.style.animation = 'growBar 1.5s ease-out forwards';
                    });

                    const stat = document.querySelector('.floating-stat');
                    stat.style.animation = 'none';
                    stat.offsetHeight;
                    stat.style.animation = 'float 3s ease-in-out infinite';

                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        chartObserver.observe(chart);
    }
});
