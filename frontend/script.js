function chargeProduit(){                                         //chargement des produits sur la page d'accueil en fonction des informations fournies par l'API 
    fetch('http://localhost:3000/api/furniture')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (const produit of data) {                                           //on parcourt la data, on récupere chaque produit puis on place les éléments à l'emplacement leur correspondant 
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
                        <img class="col-7" src="${produit.imageUrl}" alt="table en chêne massif">
                        <div class="col-5">
                            <a href="product.html?id=${produit._id}" class="stretched-link">
                                <h5 class="card-title">${produit.name}</h5>
                            </a>
                            <p class="card-text">${produit.price}</p>
                        </div>
                        <p class="col-12 text-right">Prix Total : <strong>${produit.price}</strong>
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
    var validityNames = /[a-zA-Z çéèîïÈÉÏÎà]+/;
    var validityAddress = /[0-9a-zA-Z çéèîïÈÉÏÎà]+/;
    var validityMail = /[0-9a-zA-Z çéèîïÈÉÏÎà.@]+/;
    var testEmail = /@/;
    //console.log(validityNames);

    console.log(validityNames.test(formulaire.firstName.value));

    if ((formulaire.firstName.value.length < 3) || !validityNames.test(formulaire.firstName.value) || (validityNames.exec(formulaire.firstName.value).join('') != formulaire.firstName.value)) {
        event.preventDefault();
        alert('prénom incorrect');
        return false;
    };

    if ((formulaire.lastName.value.length < 3) || !validityNames.test(formulaire.lastName.value) || (validityNames.exec(formulaire.lastName.value).join('') != formulaire.lastName.value)) {
        event.preventDefault();
        alert('nom incorrect');
        return false;
    };

    if ((formulaire.address.value.length < 3) || !validityAddress.test(formulaire.address.value) || (validityAddress.exec(formulaire.address.value).join('') != formulaire.address.value)) {
        event.preventDefault();
        alert('addresse incorrecte');
        return false;
    };

    if ((formulaire.city.value.length < 3) || !validityNames.test(formulaire.city.value) || (validityNames.exec(formulaire.city.value).join('') != formulaire.city.value)) {
        event.preventDefault();
        alert('ville incorrecte');
        return false;
    };

    if ((formulaire.email.value.length < 3) || !validityMail.test(formulaire.email.value) || (validityMail.exec(formulaire.email.value).join('') != formulaire.email.value) || !testEmail.test(formulaire.email.value)) {
        event.preventDefault();
        alert('email incorrect');
        return false;
    };

    var productId = [];
    for (const key in localStorage) {
        if (localStorage.getItem(key)) {
            productId.push(key);
            console.log(key);
        }
    };

    if (localStorage.length === 0) {
        alert('panier vide');
        return false;
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
            products : productId,
        })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      window.location.href = 'commande.html?order_id='+data.orderId;
      localStorage.clear();
    });
};


function checkCommand(){
    const id = window.location.href.split('id=')[1];
    document.getElementById('id').innerHTML = id;
};