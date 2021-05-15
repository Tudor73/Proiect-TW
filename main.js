const carousel = document.querySelector(".carousel-slide")
const slides = document.getElementsByClassName("presentation");
const next_button = document.getElementById("next");
const prev_button = document.getElementById("prev");
const add_to_cart = document.querySelector('.add-to-cart')

const size = slides[0].clientWidth;  
let current_slide = 1;

carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';

next_button.addEventListener('click', function(){
    if ( current_slide >= 4)return;
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
    carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
});

document.onkeydown = function(e){
    if(e.key == "ArrowRight" ){
        if ( current_slide >= 4)return;
        carousel.style.transition = 'transform 0.4s ease-in-out';
        current_slide++;
        console.log(current_slide);
        if (current_slide === 3){ // fixes a front-end bug 
            carousel.style.transform = "translateX(" + (-size * current_slide + 2) + 'px)';
        }
        else{
            carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
        }
    }
    if(e.key === "ArrowLeft"){
        if (current_slide <= 0)return;
        carousel.style.transition = 'transform 0.4s ease-in-out';
        current_slide--;
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
}

carousel.addEventListener('transitionend', function(){
    if(slides[current_slide].classList.contains("lastCopy")){
        carousel.style.transition = "none";
        current_slide = slides.length - 2;
        carousel.style.transform = "translateX(" + (-size * current_slide+2) + 'px)'; // adding 2 to fix that front-end bug
    }
    if (slides[current_slide].classList.contains("firstCopy")){
        carousel.style.transition = "none";
        current_slide = 1;
        carousel.style.transform = "translateX(" + (-size * current_slide) + 'px)';
    }
});

add_to_cart.addEventListener('click', function(){
    addToLocalStorage(slides[current_slide]);
});

function addToLocalStorage(item){
    let obj = {};
    let price ;
    guitar_name = item.classList[1]
    obj['guitar'] = guitar_name;
    switch(guitar_name){
        case "lesPaul":
            price = 999.99;
            break;
        case "strat":
            price = 599.99
            break;
        case "ibanez":
            price = 799.99;
            break;
    }
    obj["price"] = price;
    let guitars;
    if(localStorage.getItem('guitars') === null){
        guitars = [];
    }
    else{
        guitars = JSON.parse(localStorage.getItem("guitars"));
    }
    guitars.push(obj);
    localStorage.setItem("guitars",JSON.stringify(guitars));
}