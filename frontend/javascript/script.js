const url = 'http://localhost:3000/api/furniture'; 

/**
 * Fonction qui récupère chaque article transmis par l'API et qui crée une card par élément avec l'image de l'article, son nom, son id, et son prix.
 */
function chargeProduit(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        for (const produit of data) {
            document.getElementById('section-product').innerHTML += `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card card-home">
                    <img class="card-img-top" src="${produit.imageUrl}" alt="table en chêne massif" id="image-first-item">
                    <div class="card-body">
                        <a href="product.html?id=${produit._id}" class="stretched-link" id="link-first-item">
                            <h5 class="card-title" id="name-first-item">${produit.name}</h5>
                        </a>
                        <p class="card-text" id="price-first-item">${produit.price/100}€</p>
                    </div>
                </div>
            </div>
            `;
        }
    })
    .catch(() => {
        alert('données inaccessibles');
        return(false);
    })
};

/**
 * Fonction qui récupère l'Id contenu dans l'url, récupère les informations lui correspondant dans les données transmises par l'API, puis place le nom, l'image, et le prix produit.
 * Enfin, on parcourt tous les vernis disponibles pour l'élément et on les place dans une liste à choix (select).
 */
function chargeDetailsProduit(){                                                    
    const id = window.location.href.split('id=')[1];
    fetch(url + '/' + id)
    .then(response => response.json())
    .then(data => {
        var Data = data;
        document.getElementById('image-item').setAttribute("src", `${Data.imageUrl}`);
        document.getElementById('name-item').innerHTML = Data.name;
        document.getElementById('price-item').innerHTML = `${Data.price/100}€`;
        for (const varnish of Data.varnish) {
            document.getElementById('vernis').innerHTML += `<option value="mat">${varnish}</option>`;
        }
    })
    .catch(() => {
        alert('données inaccessibles');
        return(false);
    })
};

var quantityInCart = 0; //compteur de quantité d'articles séléctionnés 

/**
 * Fonction qui récupère l'Id de l'élément sur lequel on se trouve (stocké dans l'url), vérifie qu'il ne se trouve pas local storage, et l'ajoute si il n'y est pas.
 * Si l'élément est déjà présent, la fonction retourne false et une alerte.
 */
function addToCart(){
    const id = window.location.href.split('id=')[1];
    if(localStorage.getItem(`${id}`) === null){
        localStorage.setItem(`${id}`, `${id}`);
        quantityInCart++;
        document.getElementById('quantity-cart').innerHTML = (quantityInCart);
        localStorage.setItem(`${id}/quantity`, quantityInCart);
    }
    else{
        quantityInCart++;
        document.getElementById('quantity-cart').innerHTML = (quantityInCart);
        localStorage.setItem(`${id}/quantity`, quantityInCart);
    };
};

/**
 * fonction qui supprime l'élément du panier au moment du clic sur le boutton supprimer, elle remet ensuite le compteur de produits au panier à 0.
 */
function removeItemProduct(){
    const id = window.location.href.split('id=')[1];
    localStorage.removeItem(id);
    localStorage.removeItem(`${id}/quantity`);
    quantityInCart = 0;
    document.getElementById('quantity-cart').innerHTML = quantityInCart;
};

/**
 * fonction qui contrôle le nombre d'itérations du produit identifié dans l'url dans localStorage et qui en supprime une si il y en a au moins une présente, elle met ensuite à jour le compteur de produits au panier.
 * fonction appelée au clic.
 */
function decreaseToCart(){
    const id = window.location.href.split('id=')[1];
    if (quantityInCart > 1){
        quantityInCart--;
        document.getElementById('quantity-cart').innerHTML = quantityInCart;
        localStorage.setItem(`${id}/quantity`, quantityInCart);
    }
    else if ( quantityInCart === 1){
        quantityInCart--;
        document.getElementById('quantity-cart').innerHTML = quantityInCart;
        localStorage.removeItem(id);
        localStorage.removeItem(`${id}/quantity`);
    }
    else{
        return false;
    }
};

/**
 * Fonction qui récupère chaque Id dans localStorage et qui les fait correspondre aux Id se trouvant dans la data de l'API.
 * Pour chaque correspondance, une card est créée avec l'image du produit, son Id, son nom et son prix.
 * La possibilité de retirer l'article du panier est laissée à l'aide d'un button.
 */
function chargeCartProducts(){
    var totalPrice = 0;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        for (const produit of data) {
            var idData = produit._id;
            var quantityData = produit._id +'/quantity';
            if (localStorage.getItem(`${idData}`) !== null) {
                quantity = localStorage.getItem(quantityData);
                totalPrice = totalPrice + produit.price*quantity/100;
                document.getElementById('section-product').innerHTML += `
                <div class="card card-cart">
                    <div class="card-body card-body-cart row">
                        <img class="col-5" src="${produit.imageUrl}" alt="table en chêne massif">
                        <div class="col-5">
                            <a href="product.html?id=${produit._id}" class="stretched-link">
                                <h5 class="card-title">${produit.name}</h5>
                            </a>
                            <p class="card-text">${produit.price/100}€ x ${quantity}</p>
                            <p>Total : ${produit.price*quantity/100}€</p>
                        </div>
                        <button type="button" class="col-3 btn-cart" onclick="removeItemCart('${produit._id}')">supprimer</button></p>
                    </div>
                </div>
                `;
            }
        }
        document.getElementById('total-command').innerHTML = totalPrice + '€';
    })
    .catch(() => {
        alert('données inaccessibles');
        return(false);
    })
};


/**
 * Fonction qui retire l'Id de l'article de localStorage et qui rafraichit la page pour mettre à jour le panier.
 */
function removeItemCart(id){
    localStorage.removeItem(id);
    window.location.reload();
};
 
/**
 * Fonction qui vérifie la validité des champs prénom, nom, et ville avec la Regex validityNames, adresse avec la regex validityAddress, et l'adresse mail avec les regexvaliditymail et testEmail. si un champ est incorrect, la fonction revoie false.
 * Elle met ensuite les Id de chaque article dans un tableau en vérifiant que le panier ne soit pas vide, sinon, elle renvoie false.
 * Elle fait ensuite une requete fetch avec POST en envoyant l'objet contact contenant les informations du formulaire vérifiées et le tableau productId contenant les id de chaque article de la commande.
 * La fonction fait enfin une redirection vers la page de confirmation de commande en ajoutant à l'URL l'Id de la commande retourné par L'API. 
 */
function validCommand(){
    event.preventDefault();
    var validityNames = /[a-zA-Z \-çéèîïÈÉÏÎàâäë]+/;
    var validityAddress = /[0-9a-zA-Z \-çéèîïÈÉÏÎàâäë]+/;
    var validityMail = /[0-9a-zA-Z \-çéèîïÈÉÏÎàâäë.@_]+/;
    var testEmail = /@/;


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
        }
    };

    if (localStorage.length === 0) {
        alert('panier vide');
        return false;
    };

    fetch(url + '/order', {
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
      window.location.href = 'commande.html?order_id='+data.orderId;
      localStorage.clear();
    })
    .catch(() => {
        alert('données inaccessibles');
        return(false);
    })
};

/**
 * La fonction récupère l'Id stocké dans l'URL et le place dans l'espace lui correspondant.
 */
function checkCommand(){
    const id = window.location.href.split('id=')[1];
    document.getElementById('id').innerHTML = id;
};