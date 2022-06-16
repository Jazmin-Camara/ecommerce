"use strict"

/*dark theme*/
let themeIcon = document.getElementById("theme-toggler")
let body = document.querySelector("body")

console.log(localStorage.getItem("isDark"))
    

themeIcon.addEventListener( "click", (e) =>{
    body.classList.toggle("dark-theme")
    
    let isDark = body.classList.contains("dark-theme")

    if(isDark){
      themeIcon.classList.replace("bx-moon", "bx-sun")
      localStorage.setItem("darkMode","true")
    }else{
        themeIcon.classList.replace("bx-sun", "bx-moon")
        localStorage.setItem("darkMode","false")
    }
    
})

if(localStorage.getItem("darkMode")==="true"){
  document.body.classList.add('dark-theme')
  themeIcon.classList.replace("bx-moon", "bx-sun")
}else{
  document.body.classList.remove('dark-theme')
}

/*add products*/

const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: 14.00,
    image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.00,
    image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.00,
    image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
    category: 'sweatshirts',
    quantity: 20
  },
  {
    id: 4,
    name: 'Sweatshirts',
    price: 30.00,
    image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
    category: 'sweatshirts',
    quantity: 10
  }
]




/*carrito*/

let cartIcon = document.querySelector(".cart") /*cartIcon*/
let cartOverlay = document.querySelector(".shopping-cart-overlay") /*carrito*/
let cartClose = document.getElementById("cart-close") /*IconCartCerrado*/
let listProducts = document.querySelector(".products-list")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []




document.addEventListener("DOMContentLoaded", () =>{
  mostrarProductos()
  mostrarProductosCart()
})

cartIcon.addEventListener( "click", () =>{
  cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
  cartOverlay.classList.remove("mostrar")
})


function mostrarProductos(){

  let contenedor = document.querySelector("#card-section")
  
  let fragmentoInnerHtml = ""
  
  items.forEach( (product) =>{
    fragmentoInnerHtml += `
    <div class="card" >
    <div class="card-img card${product.id}" ></div>
    <div class="card-body">
        <h3 class="card-title">$ ${product.price}.00</h3>
        <small>stock: ${product.quantity}</small>
        <h4 class="card-text">${product.name}</h4>
            <button data-id="${product.id}" class="product-button agregar">
                <i class='bx bx-plus-circle bx-md'></i>
            </button>
    </div>
  </div>
    `
})

  
  listProducts.innerHTML = fragmentoInnerHtml


  let productsButton = document.querySelectorAll(".product-button")


  productsButton.forEach( (button) =>{
      button.addEventListener("click", (evento) =>{
          let id = parseInt( button.getAttribute("data-id") )
          let product = items.find( item =>{ 
              return item.id === id 
          })
          
          agregarProducto(product)
          //cart.push( product )
          //console.log((cart))
      })
  })
}

function agregarProducto( producto ){

  let resultadoFind = cart.find( item => item.id === producto.id )
  //resultadoFind = "actualizacion"

  if( resultadoFind ){
      let stock = cart[resultadoFind.index].quantity
      let quantitySelected = cart[resultadoFind.index].quantitySelected

      if( stock > quantitySelected ){
          cart[resultadoFind.index].quantitySelected += 1
      }else{
          alert( "No tenemos suficiente inventario" )
      }

  }else{
      producto.quantitySelected = 1
      producto.index = cart.length


      cart.push(producto)
  }
  localStorage.setItem('carrito', JSON.stringify(cart));
  console.log(cart)
  mostrarProductosCart()
}


console.log(localStorage.getItem('carrito'))

function mostrarProductosCart(){

  let fragmentoHTML = ``
  let suma = 0
  let cantidadTotal = 0

  cart = localStorage.getItem('carrito');

  cart = JSON.parse(cart);

  cart.forEach( item =>{
      fragmentoHTML += `
      <div class="cart-item">
          <img src=${item.image} alt="">
          <p>${item.name}</p>
          <small>Cantidad: ${item.quantitySelected}</small>
      </div>
      `
  
      let totalProducto = item.quantitySelected * item.price 
      suma += totalProducto

      cantidadTotal += item.quantitySelected
  })

  fragmentoHTML += `
  <div class="cart-price">
      <p>Productos seleccionados:${ cantidadTotal }</p>
      <p> Total: $${ suma }</p>
  </div>
  <div><button id="comprar" type="button">Comprar</button></div>
  `
  cartContainer.innerHTML = fragmentoHTML
  cartCount.textContent = cantidadTotal
}



