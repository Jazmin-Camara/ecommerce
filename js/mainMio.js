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
    price: '$14.00',
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: `$24.00`,
    category: 'shirts',
    quantity: 10
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: `$24.00`,
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
        <h3 class="card-title">${product.price}</h3>
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

/*
[ 
  {
      id: 2,
      quantitySelected: 1,
  },
]

*/
/*
Verificar si ya existe en el carrito
  Si existe
      Checar el stock
      quantitySelected += 1
  Si NO existe
      Creo quantitySelected y asigno valor inicial 1

*/
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

  console.log(cart)
  mostrarProductosCart()
}


function mostrarProductosCart(){

  let fragmentoHTML = ``
  let suma = 0
  let cantidadTotal = 0

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
      <p>$${ suma }</p>
  </div>
  `
  cartContainer.innerHTML = fragmentoHTML
  cartCount.textContent = cantidadTotal
}



