document.addEventListener("DOMContentLoaded", () => {
    let resumen = JSON.parse(localStorage.getItem("proSummary"));

    if (!resumen) {
        console.log("No hay datos en localStorage");
        return;
    }

    let subtotalElement = document.querySelector(".res-sub-total");
    let discountElement = document.querySelector(".promo");
    let deliveryElement = document.querySelector(".valor-domi");
    let totalElement = document.querySelector(".total");
    let orderSummaryElement = document.querySelector(".order-summary tbody");
    let paymentMethods = document.querySelectorAll("input[name='radio']");
    let btnSummary = document.querySelector(".btn-checkout");

    if (!subtotalElement || !discountElement || !deliveryElement || !totalElement) {
        console.error("Algunos elementos del resumen no existen en checkout.html");
        return;
    }

    subtotalElement.textContent = `$${resumen.subtotal}`;
    discountElement.textContent = `$${resumen.discount}`;
    deliveryElement.textContent = `$${resumen.delivery}`;
    totalElement.textContent = `$${resumen.total}`;

    if (orderSummaryElement) {
        orderSummaryElement.innerHTML = "";
        resumen.productos.forEach(producto => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${producto.name}</td>
                <td>${producto.quantity}</td>
                <td>$${(producto.price * producto.quantity).toFixed(2)}</td>
            `;
            orderSummaryElement.appendChild(row);
        });
    } else {
        console.error("El contenedor del resumen de orden no existe en checkout.html");
    }

    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener("change", () => {
                let extraCharge = 0;
                let totalBase = parseFloat(resumen.total) || 0; 

                if (method.value === "1") {
                    extraCharge = totalBase * 0.05;
                } else if (method.value === "2") {
                    extraCharge = totalBase * 0.03;
                }

                let newTotal = totalBase + extraCharge;
                totalElement.textContent = `$${newTotal.toFixed(2)}`;
            });
        });
    } else {
        console.error("No se encontraron métodos de pago en checkout.html");
    }
    if (btnSummary) {
        btnSummary.addEventListener("click", () => {
            console.log("Guardando en localStorage:", resumen);
            localStorage.setItem("finalOrder", JSON.stringify(resumen));
            location.href = "thankyou.html";
        });
    } else {
        console.error("El botón de finalizar compra no existe en checkout.html");
    }
});

