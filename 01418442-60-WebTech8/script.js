document.addEventListener("DOMContentLoaded", function () {
	LoadMenuItems();
	setupPayBillButton();
	updateOrdersDisplay();
});

function LoadMenuItems() {
	console.log("menu is loading");
	fetch("menu.json")
		.then((response) => response.json())
		.then((menuItems) => {
			const menuContainer = document.querySelector(".menu");
			menuContainer.innerHTML = "";

			menuItems.forEach((item) => {
				const menuItemElement = document.createElement("div");
				menuItemElement.classList.add("menu-item");
				menuItemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}" srcset="" />
				<h2>${item.name}</h2>
				<p>${item.price}</p>
                `;
				menuContainer.appendChild(menuItemElement);

				menuItemElement.addEventListener("click", function () {
					let orders = JSON.parse(localStorage.getItem("customerOrders")) || [];
					const existingOrderIndex = orders.findIndex(
						(order) => order.name === item.name
					);

					if (existingOrderIndex > -1) {
						orders[existingOrderIndex].quantity += 1;
					} else {
						orders.push({ name: item.name, price: item.price, quantity: 1 });
					}
					// console.log(orders);

					localStorage.setItem("customerOrders", JSON.stringify(orders));
					updateOrdersDisplay();
				});
			});
		});
}

function updateOrdersDisplay() {
	const ordersPanel = document.querySelector(".orders-panel");
	const orderList = document.getElementById("orders-list");
	const totalCostElement = document.getElementById("total-cost");
	let orders = JSON.parse(localStorage.getItem("customerOrders"));
	let totalCost = 0;

	orderList.innerHTML = "";
	if (orders != null) {
		orders.forEach((order) => {
			const li = document.createElement("li");
			li.textContent = `${order.name} - Quantity: ${order.quantity} - Price: ${order.price}`;
			orderList.appendChild(li);

			const price = parseFloat(order.price.replace("$", ""));

			totalCost += price * order.quantity;
		});
	}

	totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

function setupPayBillButton() {
	const payBillButton = document.getElementById("pay-bill-btn");
	payBillButton.addEventListener("click", function () {
		// localStorage.clear();
		localStorage.removeItem("customerOrders");
		updateOrdersDisplay();
	});
}