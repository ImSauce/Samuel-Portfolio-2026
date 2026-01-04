const track = document.querySelector('.fluid-track');
let isDragging = false;
let startX, scrollLeft;
let speed = 0.2; // normal auto-scroll speed
let currentTranslate = 0;

function animate() {
    if (!isDragging) {
        currentTranslate -= speed;
        if (currentTranslate <= -track.scrollWidth / 2) {
            currentTranslate = 0;
        }
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    requestAnimationFrame(animate);
}

animate();

// --- Drag to scroll ---
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    currentTranslate += dx;
    startX = e.pageX;
    track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('mouseup', () => {
    isDragging = false;
});

track.addEventListener('mouseleave', () => {
    isDragging = false;
});

// touch support
track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].pageX - startX;
    currentTranslate += dx;
    startX = e.touches[0].pageX;
    track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

// --- clickable images ---
document.querySelectorAll('.fluid-slide img').forEach(img => {
    img.addEventListener('click', () => {
        const link = img.dataset.link;
        if (link) window.open(link, "_blank");
    });
});


