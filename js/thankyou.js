document.addEventListener("DOMContentLoaded", () => {
    let resumen = JSON.parse(localStorage.getItem("finalOrder"));

    if (!resumen || Object.keys(resumen).length === 0) {
        console.error("Error: No hay datos de compra en localStorage.");
        return;
    }

    console.log("Datos cargados correctamente:", resumen);

    let orderDetails = document.querySelector(".detalle-orden tbody");

    if (orderDetails && Array.isArray(resumen.productos) && resumen.productos.length > 0) {
        orderDetails.innerHTML = "";
        resumen.productos.forEach(producto => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${producto.name}</td>
                <td>${producto.quantity}</td>
                <td>$${(producto.price * producto.quantity).toFixed(2)}</td>
            `;
            orderDetails.appendChild(row);
        });
    } else {
        console.error("No hay productos en el resumen.");
    }

    document.querySelector(".res-sub-total").textContent = `$${resumen.subtotal || "0.00"}`;
    document.querySelector(".promo").textContent = `$${resumen.discount || "0.00"}`;
    document.querySelector(".valor-domi").textContent = `$${resumen.delivery || "0.00"}`;
    document.querySelector(".total").textContent = `$${resumen.total || "0.00"}`;
});


