function chargeProduit(){
    fetch('http://localhost:3000/api/furniture')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (const produit of data) {
            document.getElementById('section-product').innerHTML += `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card">
                    <img class="card-img-top" src="${produit.imageUrl}" alt="table en chêne massif" id="image-first-item">
                    <div class="card-body">
                        <a href="product.html?id=${produit._id}" class="stretched-link" id="link-first-item">
                            <h5 class="card-title" id="name-first-item">${produit.name}</h5>
                        </a>
                        <p class="card-text" id="price-first-item">${produit.price}</p>
                    </div>
                </div>
            </div>
            `;
        }
    })
};

function chargeDetailsProduit(){
    const id = window.location.href.split('id=')[1];
    fetch('http://localhost:3000/api/furniture/'+ id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var Data = data;
        document.getElementById('image-item').setAttribute("src", `${Data.imageUrl}`);
        document.getElementById('name-item').innerHTML = Data.name;
        document.getElementById('price-item').innerHTML = Data.price;
        for (const varnish of Data.varnish) {
            console.log(varnish);
            document.getElementById('vernis').innerHTML += `<option value="mat">${varnish}</option>`;
        }
    })
};

function addToCart(){
    const id = window.location.href.split('id=')[1];
    if(localStorage.getItem(`${id}`) === null){
        localStorage.setItem(`${id}`, `${id}`);
    }
    else{
        alert('cet article est déjà au panier');
        console.log('existe déjà');
    };
};

function chargeCartProducts(){
    fetch('http://localhost:3000/api/furniture')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (const produit of data) {
            var idData = produit._id;
            if (localStorage.getItem(`${idData}`) !== null) {
                document.getElementById('section-product').innerHTML += `
                <div class="card">
                    <div class="card-body row">
                        <img class="col-2" src="${produit.imageUrl}" alt="table en chêne massif">
                        <div class="col-8">
                            <a href="product.html?id=${produit._id}" class="stretched-link">
                                <h5 class="card-title">${produit.name}</h5>
                            </a>
                            <p class="card-text">${produit.price}</p>
                        </div>
                        <p class="col-2 text-right">Prix Total : <strong>${produit.price}</strong>
                        <button type="button" onclick="removeItemCart('${produit._id}')">supprimer</button></p>
                    </div>
                </div>
                `;
            }
        }
    })
};

function removeItemCart(id){
    localStorage.removeItem(id);
    window.location.reload();
};
 

function validCommand(){
    event.preventDefault();
    var validityNames = /^[a-zA-ZéèîïÈÉÏÎ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÈÉÏÎ][a-zéèêàçîï]+)?/;  //mot qui commence par une minuscule, majuscule, ou accentués et qui continue par minuscule ou minuscule accentuée. deuxieme partie pour prendre en compte les noms composés (parenthèses et "?" pour définir le caractère facultatif)
    //console.log(validityNames);

    formulaire.firstName.value.willValidate;
    formulaire.lastName.value.willValidate;
    formulaire.address.value.willValidate;
    formulaire.city.value.willValidate;
    formulaire.email.value.willValidate;

    if (formulaire.firstName.value.length < 3) {
        event.preventDefault();
        alert('nom incorrect');
        return false;
    }

    firstName = formulaire.firstName.value
    if (formulaire.checkValidity() == !true) {
        alert('erreur de syntaxe');
        return false;
    }

    console.log(validityNames.test(formulaire.firstName.value));
    var productId = [];
    for (const key in localStorage) {
        if (localStorage.getItem(key)) {
            productId.push(key);
            //console.log(key);
        }
    };
    console.log(productId);
    fetch("http://localhost:3000/api/furniture/order", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            contact : {
                firstName : formulaire.firstName.value,
                lastName : formulaire.lastName.value,
                address : formulaire.address.value,
                city : formulaire.city.value,
                email : formulaire.email.value,
            },
            product_id : productId,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    });
};




function validNom(){
    let elementNom = document.getElementById("firstName");
    const regexName = /[a-zA-Z éèêàîïôû]*/;
    if(regexName.test(formulaire.firstName.value)){
       var elementNomError = document.getElementById("error-input-nom");
       elementNomError.value = "Le format n'est pas correct";
       elementNomError.style.display = "block"
    }
 };