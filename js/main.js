"use strict"

/*dark theme*/
let themeIcon = document.getElementById("theme-toggler")
let body = document.querySelector("body")

themeIcon.addEventListener( "click", (e) =>{
    body.classList.toggle("dark-theme")
    
    let isDark = body.classList.contains("dark-theme")

    if(isDark){
        themeIcon.classList.replace("bx-moon", "bx-sun")
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon")
    }
})


/*add products*/

const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: `$14.00`,
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: `$24.00`,
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: `$24.00`,
    category: 'sweatshirts',
    quantity: 20
  }
]


let contenedor = document.querySelector("#card-section")
let fragmentoInnerHtml = ""

for(let product of items){
  fragmentoInnerHtml += `
  <div class="card" >
    <div class="card-img card${product.id}" ></div>
    <div class="card-body">
        <h3 class="card-title">${product.price}</h3>
        <small>stock: ${product.quantity}</small>
        <h4 class="card-text">${product.name}</h4>
            <button data-id="${product.id}" class="product-button agregar">
                <i class='bx bx-plus-circle bx-md'></i>
            </button>
    </div>
  </div>
  `
}

contenedor.innerHTML=fragmentoInnerHtml


/*carrito*/

let cartIcon = document.querySelector(".cart") /*cartIcon*/
let cartOverlay = document.querySelector(".shopping-cart-overlay") /*carrito*/
let cartClose = document.getElementById("cart-close") /*IconCartCerrado*/
let listProducts = document.querySelector(".products-list")
let cart = []



/*document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
})*/

cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("mostrar")
})


let productsButton = document.querySelectorAll(".product-button")


    productsButton.forEach( (button) =>{
        button.addEventListener("click", (evento) =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            

            cart.push( product )
            console.log((cart))
        })
    })





