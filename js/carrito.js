//global variables
let botonProduct=document.querySelectorAll(".btn-product");
let carCount=document.querySelector(".contar-pro");
let count=0;
let cartList=document.querySelector(".list-cart tbody")

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
    fila.innerHTML=`
        <td> 1 </td>
        <td><img src="${product.image}" width="70px"></img></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td> <span class="text-danger">X</span> </td>
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
