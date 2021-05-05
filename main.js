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
    console.log(current_slide);
    if (current_slide === 3){ // fixes a front-end bug 
        carousel.style.transform = "translateX(" + (-size * current_slide + 2) + 'px)';
    }
    else{
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
});


prev_button.addEventListener('click', function(){
    if (current_slide <= 0)return;
    carousel.style.transition = 'transform 0.4s ease-in-out';
    current_slide--;
    console.log(current_slide);
    carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
});

carousel.addEventListener('transitionend', function(){
    if(slides[current_slide].id === "lastCopy"){
        carousel.style.transition = "none";
        current_slide = slides.length - 2;
        carousel.style.transform = "translateX(" + (-size * current_slide+2) + 'px)'; // adding 2 to fix that front-end bug
    }
    if (slides[current_slide].id === "firstCopy"){
        carousel.style.transition = "none";
        current_slide = 1;
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
});
