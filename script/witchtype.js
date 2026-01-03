$(document).ready(function() {
    // ============================================
    // CAROUSEL FUNCTIONALITY
    // ============================================
    const track = $('#carouselTrack');
    const slides = $('.carousel-slide');
    const thumbnails = $('.thumbnail');
    const prevBtn = $('#prevBtn');
    const nextBtn = $('#nextBtn');
    const carousel = $('.carousel-container');

    let currentIndex = 0;
    let isAnimating = false;
    const totalSlides = slides.length;
    let prevTranslate = 0;
    let currentTranslate = 0;
    let isDragging = false;
    let startX = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let carouselDisabled = false;

    function updateCarousel(animate = true) {
        if (isAnimating) return;

        const width = carousel.width();
        const offset = -currentIndex * width;

        track.css('transition', animate
            ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none'
        );

        track.css('transform', `translateX(${offset}px)`);

        thumbnails.removeClass('active');
        thumbnails.eq(currentIndex).addClass('active');

        prevTranslate = offset;

        if (animate) {
            isAnimating = true;
            setTimeout(() => isAnimating = false, 500);
        }
    }

    // Featured slide lock
    $('.carousel-slide.featured').on('click', e => {
        e.stopPropagation();
        carouselDisabled = true;
        setTimeout(() => carouselDisabled = false, 3000);
    });

    // Nav buttons
    prevBtn.on('click', () => {
        if (isAnimating || (carouselDisabled && currentIndex === 0)) return;
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        stopAutoplay();
    });

    nextBtn.on('click', () => {
        if (isAnimating || (carouselDisabled && currentIndex === 0)) return;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        stopAutoplay();
    });

    thumbnails.on('click', function() {
        currentIndex = +$(this).data('index');
        updateCarousel();
        stopAutoplay();
    });

    // Keyboard
    $(document).on('keydown', e => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Touch
    carousel.on('touchstart', e => touchStartX = e.touches[0].clientX);
    carousel.on('touchmove', e => touchEndX = e.touches[0].clientX);
    carousel.on('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) diff > 0 ? nextBtn.click() : prevBtn.click();
    });

    // Mouse drag
    carousel.on('mousedown', e => {
        if (carouselDisabled && currentIndex === 0) return;
        isDragging = true;
        startX = e.pageX;
        track.css('transition', 'none');
    });

    carousel.on('mousemove', e => {
        if (!isDragging) return;
        currentTranslate = prevTranslate + (e.pageX - startX);
        track.css('transform', `translateX(${currentTranslate}px)`);
    });

    carousel.on('mouseup mouseleave', () => {
        if (!isDragging) return;
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;
        if (Math.abs(movedBy) > carousel.width() * 0.2) {
            currentIndex += movedBy < 0 ? 1 : -1;
            currentIndex = (currentIndex + totalSlides) % totalSlides;
        }
        updateCarousel();
    });

    // Autoplay
    let autoplayInterval;
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (currentIndex !== 0) {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            }
        }, 5000);
    }
    function stopAutoplay() { clearInterval(autoplayInterval); }

    startAutoplay();
    carousel.on('mouseenter', stopAutoplay);
    carousel.on('mouseleave', startAutoplay);

    // Thumbnail strip smooth scroll
    const strip = $('.thumbnail-strip');
    thumbnails.on('click', function() {
        const t = $(this);
        strip.animate({
            scrollLeft:
                strip.scrollLeft()
                + t.position().left
                - strip.width() / 2
                + t.outerWidth() / 2
        }, 300);
    });

    // Resize
    $(window).on('resize', () => {
        updateCarousel(false);
        prevTranslate = -currentIndex * carousel.width();
        fixMobileOrder();
    });

    // Tab visibility
    document.addEventListener('visibilitychange', () => {
        track.css('transition',
            document.hidden ? 'none' : 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
        );
    });

    // ============================================
    // MOBILE LAYOUT FIX (SAFE)
    // ============================================
    function fixMobileOrder() {
        const description = $('.-extra-info-main');

        if ($(window).width() <= 992) {
            // Move description AFTER About, BEFORE System (mobile)
            if (!description.parent().hasClass('game-info')) {
                $('.info-sidebar').before(description);
            }
        } else {
            // Move description BACK to original parent (desktop)
            const originalParent = $('.media-carousel');
            if (!description.parent().is(originalParent)) {
                originalParent.append(description);
            }
        }
    }

    // Run on page load
    fixMobileOrder();

    // Run on resize
    $(window).on('resize', fixMobileOrder);
});
