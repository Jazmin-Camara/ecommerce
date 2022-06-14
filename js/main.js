"use strict"


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




const items = [
  {
    id: 1,
    name: 'Hoodies',
    price: 14.00,
    /*image: 'https://academlo-store.netlify.app/assets/img/featured1.png',*/
    category: 'hoodies',
    quantity: 10
  },
  {
    id: 2,
    name: 'Shirts',
    price: 24.00,
    /*image: 'https://academlo-store.netlify.app/assets/img/featured2.png',*/
    category: 'shirts',
    quantity: 15
  },
  {
    id: 3,
    name: 'Sweatshirts',
    price: 24.00,
    /*image: 'https://academlo-store.netlify.app/assets/img/featured3.png',*/
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
        <div class="agregar">
            <a href="#" class="btn btn-primary">+</a>
        </div>
    </div>
  </div>
  `
}

contenedor.innerHTML=fragmentoInnerHtml

