//global variables
let botonProduct=document.querySelectorAll(".btn-product");
let carCount=document.querySelector(".contar-pro");
let count=0;
let cartList=document.querySelector(".list-cart tbody");
let counterProduct=document.querySelectorAll("tr");


//counter of the car
botonProduct.forEach((btn,i)=>{
    
    btn.addEventListener("click",()=>{
        count++;
        carCount.textContent=count;
        
        //agregar producto al carrito
        infoProduct(i)
    });
});

//add products to the card
function addProduct(product){

    let fila = document.createElement("tr");
    let position = cartList.children.length+1;
    fila.innerHTML=`
        <td> ${position}</td>
        <td><img src="${product.image}" width="70px"></img></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td> <span onclick="deleteProduct()" class="btn btn-danger"">X</span> </td>
    `;
    cartList.appendChild(fila);
}

//function to add info in the car´s table
function infoProduct(position){
    let product=botonProduct[position].parentElement.parentElement.parentElement;
    let infoProductCar={
        name:product.querySelector("h3").textContent ,
        image:product.querySelector("img").src ,
        price:product.querySelector("h5").textContent ,
    }
    
    addProduct(infoProductCar)

}

//function to delete a product from the car
function deleteProduct(){
    let product=event.target;
    product.parentElement.parentElement.remove();
    //substract from the car counter
    if (count > 0){
        count--;
        carCount.textContent=count;
    }

    updateProductPositions();
}


//function to get the number of rows that the car got
function updateProductPositions() {
    let rows = cartList.querySelectorAll("tr");
    rows.forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
    });
}