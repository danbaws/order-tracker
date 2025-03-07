document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("orders", function (data) {
        let orderList = document.getElementById("orderList");
        orderList.innerHTML = "";
        if (data.orders && data.orders.length > 0) {
            data.orders.forEach(order => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="${order.orderLink}" target="_blank">${order.orderNumber} - ${order.orderDate} - ${order.orderTotal}</a>`;
                orderList.appendChild(li);
            });
        } else {
            orderList.innerHTML = "<li>Nicio comandă găsită.</li>";
        }
    });
});
