const firstItem = document.getElementById('link-first-item');
const imgFirstItem = document.getElementById('image-first-item');
const nameFirstItem = document.getElementById('name-first-item');
const priceFirstItem = document.getElementById('price-first-item');

const secondItem = document.getElementById('link-second-item');
const imgSecondItem = document.getElementById('image-second-item');
const nameSecondItem = document.getElementById('name-second-item');
const priceSecondItem = document.getElementById('price-second-item');

const thirdItem = document.getElementById('link-third-item');
const imgThirdItem = document.getElementById('image-third-item');
const nameThirdItem = document.getElementById('name-third-item');
const priceThirdItem = document.getElementById('price-third-item');

const fourthItem = document.getElementById('link-fourth-item');
const imgFourthItem = document.getElementById('image-fourth-item');
const nameFourthItem = document.getElementById('name-fourth-item');
const priceFourthItem = document.getElementById('price-fourth-item');

const fifthItem = document.getElementById('link-fifth-item');
const imgFifthItem = document.getElementById('image-fifth-item');
const nameFifthItem = document.getElementById('name-fifth-item');
const priceFifthItem = document.getElementById('price-fifth-item');

// emplacements avec valeur en fonction de l'événement //
var imageItem = document.getElementById('image-item');
var nameItem = document.getElementById('name-item');
var priceItem = document.getElementById('price-item');

// fonction changement de contenu dans la page product.html //
function changements(img, name, price){
    imageItem.innerHTML = img;
    nameItem.innerHTML = name;
    priceItem.innerHTML = price;
}

// appel de la fonction avec les bons envois en fonction du lien choisi //
firstItem.addEventListener('click', changements(imgFirstItem, nameFirstItem, priceFirstItem));
secondItem.addEventListener('click', changements(imgSecondItem, nameSecondItem, priceSecondItem));
thirdItem.addEventListener('click', changements(imgThirdItem, nameThirdItem, priceThirdItem));
fourthItem.addEventListener('click', changements(imgFourthItem, nameFourthItem, priceFourthItem));
fifthItem.addEventListener('click', changements(imgFifthItem, nameFifthItem, priceFifthItem));