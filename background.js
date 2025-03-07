chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "saveOrders") {
        console.log("Comenzi salvate:", request.data);
        chrome.storage.local.set({ orders: request.data });
    }
});

fetch("http://localhost:3000/saveOrder", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ orderData: "datele_comenzii" })
})
.then(response => response.json())
.then(data => console.log("Răspuns server:", data))
.catch(error => console.error("Eroare:", error));
