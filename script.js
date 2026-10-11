const carousel = document.getElementById("carousel");
const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const indicatorsContainer = document.getElementById("indicators");

let currentIndex = 0;
let autoSlide;

const totalSlides = slides.length;
const interval = 3000;

// Create slide indicators
slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoSlide();
    });

    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Display selected slide
function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    slidesContainer.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
        dot.setAttribute(
            "aria-current",
            i === currentIndex ? "true" : "false"
        );
    });
}

// Next slide
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Previous slide
function previousSlide() {
    showSlide(currentIndex - 1);
}

// Start automatic rotation
function startAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
        nextSlide();
    }, interval);
}

// Restart timer after manual navigation
function restartAutoSlide() {
    startAutoSlide();
}

// Button events
nextButton.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
});

prevButton.addEventListener("click", () => {
    previousSlide();
    restartAutoSlide();
});

// Pause on hover
carousel.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

// Resume when mouse leaves
carousel.addEventListener("mouseleave", () => {
    startAutoSlide();
});

// Initialize carousel
showSlide(0);
startAutoSlide();
