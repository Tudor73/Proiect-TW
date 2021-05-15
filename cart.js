const container = document.querySelector('.cart-container');
let prices = {}
total_price = 0;

setInterval(updateTotalPrice, 300);

window.addEventListener('load', function(){
    let guitars;
    if (localStorage.getItem('guitars') === null){
        guitars = [];
    }
    else{
        guitars = JSON.parse(localStorage.getItem("guitars"));
    }
    guitars.forEach(element => {
        let key = element['guitar'];
        let value = element['price'];
        prices[key] = value;
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
    price.innerHTML ='$' +item['price'];
    total_price  = Number(total_price) + Number(item['price']);
    total_price = total_price.toFixed(2);

    let quantity = document.createElement('div');
    quantity.style.display = 'flex';
    quantity.style.width = "8%";
    quantity.style.justifyContent= 'space-between';
    quantity.style.alignItems= 'center';
    let num = document.createElement('h2');
    num.innerHTML = 1;
    let minus = document.createElement('i');
    minus.style.cursor = 'pointer';
    minus.style.color = '#f48b29'
    minus.classList.add('fas')
    minus.classList.add('fa-minus-circle');
    let plus = document.createElement('i');
    plus.style.color = '#f48b29';
    plus.style.cursor = 'pointer';
    plus.classList.add('fas');
    plus.classList.add('fa-plus-circle');
    quantity.appendChild(minus);
    quantity.appendChild(num);
    quantity.appendChild(plus);

    let x = document.createElement('i');
    x.classList.add('fas')
    x.classList.add('fa-times');
    x.classList.add('remove');
    switch(item['guitar']){
        case "lesPaul":
            img.setAttribute('src', 'images/guitar.jpg');
            h2.innerHTML = 'Les Paul';
            div.id = "lesPaul";
            break;
        case "strat":
            img.setAttribute('src', 'images/start.jpg');
            h2.innerHTML = 'Stratocaster';
            div.id = "strat";
            break;
        case "ibanez":
            img.setAttribute('src', 'images/ibanez2.png');
            h2.innerHTML = 'Ibanez';
            div.id = 'ibanez';
            break;
    }
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(quantity);
    div.appendChild(price);
    div.appendChild(x);
    container.appendChild(div);
}

container.addEventListener('click', deleteItem);
container.addEventListener('click', changeQuantity);

function deleteItem(e){
    if(e.target.classList.contains('remove')){
        const item = e.target.parentElement;
        const id = item.id;
        console.log(item.id);
        item.remove();
        deleteFromStorage(id);
        console.log(e.target.previousSibling.previousSibling.childNodes[1].innerHTML);
        number_of_items = e.target.previousSibling.previousSibling.childNodes[1].innerHTML;
        total_price = Number(total_price) - Number(prices[e.target.parentElement.id])*Number(number_of_items);
        total_price = total_price.toFixed(2);
    }
}
function deleteFromStorage(id){
    guitars = JSON.parse(localStorage.getItem("guitars"));
    let index = guitars.length-1;
    while (index >= 0){
        if (guitars[index]['guitar'] == id){
            guitars.splice(index, 1);
        }
        index--;
    }
    localStorage.setItem('guitars', JSON.stringify(guitars));
}

function changeQuantity(e){
    if (e.target.classList.contains('fa-minus-circle')){
        let item = e.target.nextSibling;
        value = Number(item.innerHTML);
        value--;
        if(value == 0){
            id = item.parentElement.parentElement.id;
            item.parentElement.parentElement.remove();
            total_price  = Number(total_price) - Number(prices[item.parentElement.parentElement.id]);
            total_price = total_price.toFixed(2);
            deleteFromStorage(id);
            console.log(total_price);
        }
        else{
            item.innerHTML = value;
            let price = item.parentElement.nextSibling;
            let val = price.innerHTML.substring(1);
            new_price = Number(val) - Number(prices[item.parentElement.parentElement.id]);
            new_price = new_price.toFixed(2);
            price.innerHTML = '$' + new_price;
            total_price  = Number(total_price) - Number(prices[item.parentElement.parentElement.id]);
            total_price = total_price.toFixed(2);
            console.log(total_price);
        }
    }
    else if (e.target.classList.contains('fa-plus-circle')){
        let item = e.target.previousSibling;
        value = Number(item.innerHTML);
        value++;
        item.innerHTML = value;
        let price = item.parentElement.nextSibling;
        let val = price.innerHTML.substring(1);
        new_price = Number(val) + Number(prices[item.parentElement.parentElement.id]);
        new_price = new_price.toFixed(2);
        total_price = Number(total_price) + Number(prices[item.parentElement.parentElement.id]);
        total_price = total_price.toFixed(2);
        console.log(total_price);
        price.innerHTML = '$' + new_price;
    }
}
function updateTotalPrice(){
    const h1 = document.querySelector('.mesaj');
    msg = "Pretul total: " + String(total_price);
    if(total_price == 0){
        h1.innerHTML = "Cosul este gol"
        const button = document.querySelector('.purchase');
        button.style.display = "none";
    }
    else{
        h1.innerHTML = msg;
    }
}

