console.log(localStorage.getItem('guitars'));

window.addEventListener('load', function(){
    let guitars;
    if (localStorage.getItem('guitars') === null){
        guitars = [];
    }
    else{
        guitars = JSON.parse(localStorage.getItem("guitars"));
    }
    guitars.forEach(element => {
        createCartItem(element);
    });
});

function createCartItem(item){
    const container = document.querySelector('.cart-container');
    let div = document.createElement('div');
    div.classList.add('item');
    let img = document.createElement('img');
    img.classList.add('guitar-img');
    let h2 = document.createElement('h2');
    let price = document.createElement('h3');
    price.innerHTML = item['price'];
    switch(item['guitar']){
        case "lesPaul":
            img.setAttribute('src', 'images/guitar.jpg');
            h2.innerHTML = 'Gibson Les Paul';
            break;
        case "strat":
            img.setAttribute('src', 'images/start.jpg');
            h2.innerHTML = 'Stratocaster';
            break;
        case "ibanez":
            img.setAttribute('src', 'images/ibanez2.png');
            h2.innerHTML = 'Ibanez';
            break;
    }
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(price);
    container.appendChild(div);
}