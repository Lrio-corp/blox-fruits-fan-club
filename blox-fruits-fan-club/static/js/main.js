// Script principal pour le site Blox Fruits Fan Club

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter l'effet de parallaxe sur la section héro
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Animer l'apparition des sections au scroll
    const animatedElements = document.querySelectorAll('.features-container, .news-container');
    
    // Observer les éléments à animer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observer chaque élément
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Ajouter du CSS pour les animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .features-container, .news-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .features-container.animated, .news-container.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .features-container .feature-card, .news-container .news-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .features-container.animated .feature-card, .news-container.animated .news-card {
            opacity: 1;
            transform: translateY(0);
        }
        
        .features-container.animated .feature-card:nth-child(1),
        .news-container.animated .news-card:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .features-container.animated .feature-card:nth-child(2),
        .news-container.animated .news-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .features-container.animated .feature-card:nth-child(3),
        .news-container.animated .news-card:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .features-container.animated .feature-card:nth-child(4) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(animationStyle);

    // Déclencher les animations des éléments visibles au chargement
    setTimeout(() => {
        document.querySelectorAll('.features-container, .news-container').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('animated');
            }
        });
    }, 100);
});