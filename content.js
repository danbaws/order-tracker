window.onload = function () {
    setTimeout(selectAllOrders, 2000);
};

function selectAllOrders() {
    let orderFilter = document.querySelector("#order-filters-from");

    if (orderFilter) {
        let currentValue = orderFilter.value;

        if (currentValue !== "older") {
            orderFilter.value = "older";
            orderFilter.dispatchEvent(new Event("change", { bubbles: true }));

            setTimeout(extractOrders, 3000);
            return;
        }
    }

    extractOrders();
}

function extractOrders() {
    let orders = document.querySelectorAll(".order-hist-box");
    let orderData = [];

    orders.forEach(order => {
        let orderNumber = order.querySelector("h2 span")?.innerText.trim();
        let orderDate = order.querySelector(".order-date")?.innerText.split("•")[0].trim();
        let orderTotal = order.querySelector(".order-date")?.innerText.split("•")[1]?.trim();
        let orderLink = order.querySelector("h2 a")?.href;

        if (orderNumber && orderDate && orderTotal && orderLink) {
            orderData.push({ orderNumber, orderDate, orderTotal, orderLink });
        }
    });

    console.log(orderData);
    chrome.runtime.sendMessage({ action: "saveOrders", data: orderData });
}
