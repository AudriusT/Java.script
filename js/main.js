function App (path) {
    var xhr = new XMLHttpRequest();
    var pathVar = 'img/';
    var catalog = document.querySelector(".catalog");
    xhr.open('GET', path);
    let products = [];
    xhr.onload= function () {
        if(xhr.status === 200){
            this.products = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    this.render = function(){
        for(let item in products){
            let product = `
                <div class="col-sm-6 col-md-4 product" name="${products[item].id}" >
        <div class="thumbnail">
            <img src="${pathVar+this.products[item].filename}" alt="...">
            <div class="caption">
                <h3>${this.products[item].title}</h3>
                <p>${this.products[item].description}</p>  
                <p>${this.products[item].price}</p>
                <button class="btn btn-primary" role="button" name="${this.products[item].id}">Priėti</button>
            </div>
        </div>
    </div>
            `;
            catalog.innerHTML += product;
        }
        let button = document.querySelectorAll(".btn-primary");
        for(let i = 0; i < button.length; i++){
            button[i].addEventListener('click', this.toCart);
        }
    };



    this.toCart = function(e){
        let cart = [];
        let id = e.target.getAttribute("data");
        let singleProduct = document.querySelectorAll(".product");
        for(let i = 0; i < singleProduct.length; i++){
            if (id === singleProduct[i].getAttribute("data")){
                cart.push(id);
                if(localStorage.hasOwnProperty('cart')){
                    cart = JSON.parse(localStorage.getItem('cart'));
                    cart.push(id);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.parseFromLocalStorage();
    };


 //   window.addEventListener('load', (event) => {
      //  setTimeout(function () {
        //    this.parseFromLocalStorage();
     //   },100)
   // });

    this.parseFromLocalStorage = function (){
        let storage = JSON.parse(localStorage.getItem('cart'));
        let divCart = document.querySelector(".cart");
        divCart.innerHTML = "";
        if (storage != null){
            for(let i = 0; i < storage.length; i++){
                for(let j = 0; j < this.products.length; j++){
                    if(storage[i] == this.products[j].id){
                        let productInCart = `
				 	<p>${this.products[j].name} <span data-id="${this.products[j].id}" class="glyphicon glyphicon-remove" aria-hidden="true"></span> </p>
				 `;

                        divCart.innerHTML += productInCart;
                    }
                }
            }
        }
        let button = document.querySelectorAll(".glyphicon-remove");
        for(let i = 0; i < button.length; i++){
            button[i].addEventListener('click', this.removeFromCart);
        }
    };

    this.removeFromCart = function(e){
        let id = e.target.getAttribute("data-id");
        let storage = JSON.parse(localStorage.getItem('cart'));
        for (let i=storage.length-1; i>=0; i--) {
            if (storage[i] === id) {
                storage.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(storage));
        this.parseFromLocalStorage();
    };

}