// Global Variable
let cartTable = document.querySelector(".cart-table tbody");
let subtotalElement = document.querySelector(".res-sub-total");
let discountElement = document.querySelector(".promo");
let totalElement = document.querySelector(".total");
let deliveryElement = document.querySelector(".valor-domi");
let deliverySelect = document.querySelector(".destino");
let deliveryCost = 0; // Permite almacenar el valor del domicilio cada que se realice un cambio event "change"

document.addEventListener("DOMContentLoaded", () => {
    loadProductLocalStorage()
})

// Function to load products saves in LocalStorage
function loadProductLocalStorage(){
    let products = JSON.parse(localStorage.getItem("productCar")) || [];
    cartTable.innerHTML = ""; // Limpiar cart

    products.forEach((product, i) => {
        console.log(product)
        let row = document.createElement("tr");
        row.innerHTML=`
            <td class="d-flex justify-content-evenly align-items-center">
                <span onclick="deleteProduct(${i})" class="btn btn-danger"> X </span>
                <img src="${product.image}" width="70px"></img>
                ${product.name}
            </td>
            <td>
                $${product.price}
            </td>
            <td>
                <div class="quantity quantity-wrap">
                    <div class="decrement" onclick="updateQuantities(${i}, -1)"> <i class="fa-solid fa-minus"></i> </div>
                    <input type="text" class="number" name="quantity" value="${product.quantity}" min="0" maxlength="2" size="1" readonly>
                    <div class="increment" onclick="updateQuantities(${i}, 1)"> <i class="fa-solid fa-plus"></i> </div>
                </div>
            </td>
            <td> $${(product.price * product.quantity).toFixed(3)}</td>
        `;
        cartTable.appendChild(row);
    });

    if(products.length == 0){
        let row = document.createElement("tr");
        row.innerHTML=`
        <td colspan="4">
            <p class="text-center">No hay productos en el carrito</p>
        </td>
        `;
        cartTable.appendChild(row);
    }

    // Summary purchase, Calcula el resumen de compra
    summaryPurchase();

    // Se registra evento de tipo change (cambio) al select del domicilio para extraer su textContent y obtener el valor del domicilio
    deliverySelect.addEventListener("change", (e) => {
        let place = e.target.selectedOptions[0].textContent; // Esta propiedad retorna las opciones seleccionados en una colección de datos, como solo se puede seleccionar una opción accederemos al indice 0 y a su textContent
        let string = place.split("-")[1]; // Divide la cadena en dos partes usando el guion y almacenará los carácteres en un arreglo de forma ordenada (el valor quedará en el indice 1 de este arreglo)
        deliveryCost = +string.split("$")[1] // Se castea el string a entero y se añade a la variable global deliveryCost

        summaryPurchase(); 
    })
}

// Function to update products quantities
function updateQuantities(index, value){
    let products = JSON.parse(localStorage.getItem("productCar")) || [];

    if(products[index]){
        //update quantity
        products[index].quantity = (products[index].quantity || 1) + value;
    
        //validate that quantity doesn´t less a 1
        if(products[index].quantity < 1){
            products[index].quantity = 1;
        }
    }

    // Update localStorage
    localStorage.setItem("productCar", JSON.stringify(products));

    // Load localStorage
    loadProductLocalStorage();
}

// Function to delete details product in shop cart
function deleteProduct(index){
    let products = JSON.parse(localStorage.getItem("productCar")) || [];

    // Delete product according to its index
    products.splice(index, 1);

    localStorage.setItem("productCar", JSON.stringify(products));
    loadProductLocalStorage();
}

function summaryPurchase(){
    let productsCart = JSON.parse(localStorage.getItem("productCar")) || [];
    let counterSummary = 0;

    // Calculate summary
    productsCart.forEach(product => {
        counterSummary += +product.price * +product.quantity;
    })
    
    // Calculate discount 10% if the purchase is greater than 100,000
    let discount = (counterSummary > 100) ? (+counterSummary * 0.10) : 0;
    let total = counterSummary - discount + deliveryCost;

    subtotalElement.textContent = counterSummary.toFixed(3);
    discountElement.textContent = discount == 0 ? discount : discount.toFixed(3);
    deliveryElement.textContent = deliveryCost.toFixed(3);
    totalElement.textContent = total.toFixed(3)
   
}