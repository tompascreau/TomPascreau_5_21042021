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

function numberItems(){

};

function chargeResumeCommand(){
    var nameFirst = window.location.href.split('=');
  //  var firstName = URLSearchParams.get('firstName');
//    console.log(firstName);

    for (let p of URLSearchParams) {
        console.log(p);
      };

    for (const equal of name) {
        var value = equal.name;
        console.log(equal);
    }
};