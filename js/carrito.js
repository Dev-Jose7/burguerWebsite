//global variables
let buttonProduct=document.querySelectorAll(".btn-product");
let carCount=document.querySelector(".contar-pro");
let count=0;
let cartList=document.querySelector(".list-cart tbody");
let counterProduct=document.querySelectorAll("tr");
let cart = document.querySelector(".carrito")

 document.addEventListener("DOMContentLoaded",()=>{
    updateLocalStorageCar();
 })
//counter of the car
buttonProduct.forEach((btn,i)=>{
    
    btn.addEventListener("click",()=>{
        count++;
        carCount.textContent=count;
        
        //agregar producto al carrito
        infoProduct(i)
    });
});

// Se registra evento de tipo click
cart.addEventListener("click", function(e){
    // Si el documento en su propiedad display tiene como valor none o vacío (el DOM puede tenerlo así), se le cambiará el valor a block, si se vuelve a dar click la primer condición no se cumplirá y pasará a la segunda condición ya que es verdaderá por la primer condición y se procederá a ocultar
    if(document.querySelector(".list-cart").style.display == "" || document.querySelector(".list-cart").style.display == "none"){
        document.querySelector(".list-cart").style.display = "block"
        
    } else if(document.querySelector(".list-cart").style.display == "block"){
        document.querySelector(".list-cart").style.display = ""
    }
});

//add products to the card
function addProduct(product){
    
    let fila = document.createElement("tr");
    let position = cartList.children.length+1;
    fila.innerHTML=`
        <td> ${position}</td>
        <td><img src="${product.image}" width="70px"></img></td>
        <td>${product.name}</td>
        <td> $${product.price}</td>
        <td> <span onclick="deleteProduct(${position})" class="btn btn-danger"">X</span> </td>
    `;
    cartList.appendChild(fila);
}

//function to add info in the car´s table
function infoProduct(position){
    let product=buttonProduct[position].parentElement.parentElement.parentElement;
    let infoProductCar={
        name:product.querySelector("h3").textContent ,
        image:product.querySelector("img").src ,
        price:product.querySelector("h5").textContent.split("$")[1] ,
        quantity: 1
    }
    
    addProduct(infoProductCar)
    saveProductLocalStorage(infoProductCar)

}

//function to delete a product from the car
function deleteProduct(i){
    let product=event.target;
    product.parentElement.parentElement.remove();
    //substract from the car counter
    if (count > 0){
        count--;
        carCount.textContent=count;
    }

    updateProductPositions();
    deleteProductFromLocalStorage(i);
}


//function to get the number of rows that the car got
function updateProductPositions() {
    let rows = cartList.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
    });
}

//saving products on local storage
function saveProductLocalStorage(product){
    
    let products = JSON.parse(localStorage.getItem("productCar")) || [];

    // Agregar el nuevo producto al array
    products.push(product);

    // Guardar el array actualizado en localStorage
    localStorage.setItem("productCar", JSON.stringify(products));
    //let previousProducts=JSON.parse(localStorage.getItem("productCar"))
    //if(previousProduct != null){
    //   products=Object.values(previousProduct)
    //}
    
}

//delete products from the local storage
function deleteProductFromLocalStorage(i){
    let products = JSON.parse(localStorage.getItem("productCar")) || [];
    if (i > 0) {
        i = i - 1; // Adjust index because table starts at 1 but array at 0
    }

    if (i >= 0 && i < products.length) {
        products.splice(i, 1); // Remove only 1 item at the given index
    }
    localStorage.setItem("productCar", JSON.stringify(products));

}

//update products from ghe local storage
function updateLocalStorageCar(){
    //call the array
    let products = JSON.parse(localStorage.getItem("productCar")) || [];

    //update the array
    localStorage.setItem("productCar", JSON.stringify(products));
    // Clear the cart visually before re-adding the items
    cartList.innerHTML = "";

    // Update the cart counter
    count = products.length;
    carCount.textContent = count;

    //show each of the products on the function that put that on the car
    products.forEach((product)=>{
       addProduct(product)
    })
}