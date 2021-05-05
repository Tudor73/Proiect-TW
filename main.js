const carousel = document.querySelector(".carousel-slide")

const slides = document.getElementsByClassName("presentation");
const next_button = document.getElementById("next");
const prev_button = document.getElementById("prev");

const size = slides[0].clientWidth;  
let current_slide = 1;

carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';

next_button.addEventListener('click', function(){
    carousel.style.transition = 'transform 0.4s ease-in-out';
    current_slide++;
    carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
});


prev_button.addEventListener('click', function(){
    carousel.style.transition = 'transform 0.4s ease-in-out';
    current_slide--;
    carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
});

carousel.addEventListener('transitionend', function(){
    console.log(slides[current_slide].id)
    if(slides[current_slide].id === "lastCopy"){
        carousel.style.transition = "none";
        current_slide = slides.length - 2;
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
    if (slides[current_slide].id === "firstCopy"){
        carousel.style.transition = "none";
        current_slide = 1;
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
});
