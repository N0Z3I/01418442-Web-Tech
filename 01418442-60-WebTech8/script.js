document.addEventListener('DOMContentLoaded', function () {
    loadMenuItem()
})

function loadMenuItem() {
    console.log('menu is loading');
    fetch('menu.json').then((response)=> response.json())
    .then((menuItem)=> {
        const menuContainer = document.querySelector(".menu");
        menuContainer.innerHTML = "";

        menuItem.forEach(item => {
            const menuItemElement = document.createElement("div")
            menuItemElement.classList.add("menu-item");
            menuItemElement.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" />
            <h2>${item.name}</h2>
            <p>${item.price}</p>`
            menuContainer.appendChild(menuItemElement);

            menuItemElement.addEventListener('click', function() {
                let orders = JSON.parse(localStorage.getItem('customerOrders')) || [];
                console.log(orders);
                const existingOrderIndex = orders.findIndex(
                    (order) => order.name === item.name
                );
                console.log(existingOrderIndex);
                orders.push({ name: item.name, price: item.price});
                console.log(orders);

                localStorage.setItem("customerOrders", JSON.stringify(orders));
            });
        });
    });
}