// ===== Scroll Animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to animatable elements
    const animatableSelectors = [
        '.hero-content',
        '.hero-image',
        '.value-text',
        '.problem-card',
        '.solution-card',
        '.cta-content'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay based on element position
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ===== Meta Pixel Events =====

    // Evento "Contact" en todos los botones de WhatsApp
    document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
        btn.addEventListener('click', function () {
            if (typeof fbq === 'function') {
                // Identificar desde qué sección se hizo clic
                const isHero = btn.closest('.hero');
                const isCta = btn.closest('.cta-section');
                const isFloat = btn.classList.contains('whatsapp-float');

                let source = 'unknown';
                if (isHero) source = 'hero';
                else if (isCta) source = 'cta_section';
                else if (isFloat) source = 'floating_button';

                // Evento estándar: Contact
                fbq('track', 'Contact', {
                    content_name: 'WhatsApp - Solicitar Precios',
                    content_category: source
                });

                // Evento estándar: Lead
                fbq('track', 'Lead', {
                    content_name: 'Redgamer Landing',
                    content_category: source
                });
            }
        });
    });

    // Evento "ViewContent" cuando el usuario llega a la sección de soluciones
    const solutionsSection = document.querySelector('.solutions');
    if (solutionsSection) {
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof fbq === 'function') {
                        fbq('track', 'ViewContent', {
                            content_name: 'Sección Soluciones',
                            content_type: 'landing_section'
                        });
                    }
                    viewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        viewObserver.observe(solutionsSection);
    }
});
