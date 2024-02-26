document.addEventListener("DOMContentLoaded", function () {
	LoadMenuItems();
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

					if (existingOrderIndex == -1) {
						orders.push({ name: item.name, price: item.price, quantity: 1 });
					} else {
						orders[existingOrderIndex].quantity += 1;
					}
					console.log(orders);

					localStorage.setItem("customerOrders", JSON.stringify(orders));
				});
			});
		});
}