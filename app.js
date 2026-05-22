function changeCarousel(button, direction) {
    // Get the carousel container (parent of parent)
    const carouselContainer = button.closest('.carousel-container');
    const carousel = carouselContainer.querySelector('.carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const dots = carouselContainer.querySelectorAll('.dot');
    
    // Find current active image
    let currentIndex = 0;
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate next index
    let nextIndex = currentIndex + direction;
    if (nextIndex >= images.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = images.length - 1;
    }
    
    // Update carousel
    images[currentIndex].classList.remove('active');
    images[nextIndex].classList.add('active');
    
    dots[currentIndex].classList.remove('active');
    dots[nextIndex].classList.add('active');
    
    // Reset auto-slide timer when manual control is used
    resetAutoSlide(carouselContainer);
}

function currentCarouselSlide(dot, index) {
    // Get the carousel container
    const carouselContainer = dot.closest('.carousel-container');
    const carousel = carouselContainer.querySelector('.carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const dots = carouselContainer.querySelectorAll('.dot');
    
    // Remove active from all
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    // Add active to selected
    images[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Reset auto-slide timer when manual control is used
    resetAutoSlide(carouselContainer);
}

function startAutoSlide(carouselContainer) {
    // Auto-advance carousel every 5 seconds
    const intervalId = setInterval(() => {
        const carousel = carouselContainer.querySelector('.carousel');
        const images = carousel.querySelectorAll('.carousel-img');
        const dots = carouselContainer.querySelectorAll('.dot');
        
        // Find current active image
        let currentIndex = 0;
        images.forEach((img, index) => {
            if (img.classList.contains('active')) {
                currentIndex = index;
            }
        });
        
        // Calculate next index
        let nextIndex = currentIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = 0;
        }
        
        // Update carousel
        images[currentIndex].classList.remove('active');
        images[nextIndex].classList.add('active');
        
        dots[currentIndex].classList.remove('active');
        dots[nextIndex].classList.add('active');
    }, 5000); // Change slide every 5 seconds
    
    // Store the interval ID so we can clear it later
    carouselContainer.autoSlideInterval = intervalId;
}

function resetAutoSlide(carouselContainer) {
    // Clear the existing interval
    if (carouselContainer.autoSlideInterval) {
        clearInterval(carouselContainer.autoSlideInterval);
    }
    
    // Start a new auto-slide
    startAutoSlide(carouselContainer);
}

// Initialize carousels on page load
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    
    carouselContainers.forEach(container => {
        const images = container.querySelectorAll('.carousel-img');
        if (images.length > 0) {
            // Set first image as active
            images[0].classList.add('active');
            
            // Start auto-slide for this carousel
            startAutoSlide(container);
        }
    });
});

