// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcasePanels = document.querySelectorAll('.showcase-panel');
    const featureTriggers = document.querySelectorAll('.feature-trigger');
    const featureModal = document.getElementById('feature-modal');
    const featureModalTitle = document.getElementById('feature-modal-title');
    const featureList = document.getElementById('feature-list');
    const featureModalClose = document.querySelector('.feature-modal-close');
    const designPreviewTriggers = document.querySelectorAll('.design-preview-trigger');
    const imagePreviewModal = document.getElementById('image-preview-modal');
    const imagePreviewTitle = document.getElementById('image-preview-title');
    const imagePreviewFull = document.getElementById('image-preview-full');

    if (featureModalClose) {
        featureModalClose.textContent = 'x';
    }

    const setActiveCategory = (category) => {
        showcasePanels.forEach(panel => {
            const panelCategory = panel.getAttribute('data-showcase');
            const shouldShow = category === 'all'
                ? panelCategory !== 'all'
                : panelCategory === category;

            panel.classList.toggle('active', shouldShow);
        });
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the category
            const category = button.getAttribute('data-category');
            setActiveCategory(category);
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 136, 0.5)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            console.log('Selected category:', category);
        });
    });

    const initialActiveButton = document.querySelector('.filter-btn.active');
    if (initialActiveButton) {
        const initialCategory = initialActiveButton.getAttribute('data-category') || 'all';
        setActiveCategory(initialCategory);
    }

    const closeFeatureModal = () => {
        featureModal.hidden = true;
        document.body.style.overflow = '';
    };

    const closeImagePreviewModal = () => {
        imagePreviewModal.hidden = true;
        imagePreviewFull.src = '';
        document.body.style.overflow = '';
    };

    featureTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const title = trigger.getAttribute('data-title') || 'Bot Features';
            const features = (trigger.getAttribute('data-features') || '')
                .split('|')
                .map(item => item.trim())
                .filter(Boolean);

            featureModalTitle.textContent = `${title} Features`;
            featureList.innerHTML = '';

            features.forEach(feature => {
                const item = document.createElement('li');
                item.textContent = feature;
                featureList.appendChild(item);
            });

            featureModal.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    });

    featureModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.closeModal === 'true') {
            closeFeatureModal();
        }
    });

    designPreviewTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const image = trigger.getAttribute('data-image') || '';
            const title = trigger.getAttribute('data-title') || 'Design Preview';

            imagePreviewTitle.textContent = title;
            imagePreviewFull.src = image;
            imagePreviewModal.hidden = false;
            document.body.style.overflow = 'hidden';
        });
    });

    imagePreviewModal.addEventListener('click', (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.closeImageModal === 'true') {
            closeImagePreviewModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !featureModal.hidden) {
            closeFeatureModal();
        }

        if (event.key === 'Escape' && !imagePreviewModal.hidden) {
            closeImagePreviewModal();
        }
    });
    
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1 + 0.3}s both`;
    });

    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const angleX = (mouseY - cardY / window.innerHeight) * 5;
            const angleY = (mouseX - cardX / window.innerWidth) * 5;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = `translateY(-8px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
                margin-left: -100px;
                margin-top: -100px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});
