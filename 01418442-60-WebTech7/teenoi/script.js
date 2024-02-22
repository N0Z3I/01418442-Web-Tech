document.addEventListener("DOMContentLoaded", function () {
	getFoodByFirstLetter("f", 3, 80, 0);
	getFoodByFirstLetter("f", 4, 120, 1);
	getFoodByFirstLetter("b", 2, 100, 2);
	getFoodByFirstLetter("b", 28, 60, 3);
	getFoodByFirstLetter("c", 4, 100, 4);
	getFoodByFirstLetter("k", 6, 90, 5);
	getFoodByFirstLetter("i", 0, 100, 6);
	getFoodByFirstLetter("t", 17, 150, 7);
	loadOrder();
});

const getFoodByFirstLetter = function (
	firstLetter,
	idMeal,
	menuPrice,
	menuOrder
) {
	const req = new XMLHttpRequest();
	req.open(
		"GET",
		`https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`
	);
	req.send();

	req.addEventListener("load", function () {
		const data = JSON.parse(this.responseText);
		if (idMeal == -1) {
			console.log(data);
		} else {
			addMenu(
				data.meals[idMeal].strMeal,
				menuPrice,
				data.meals[idMeal].strMealThumb,
				menuOrder
			);
		}
	});
};

let keyId = 0;

if (localStorage.length > 0) {
	let max = 0;
	for (let i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i) >= max) {
			max = localStorage.key(i);
		}
	}
	keyId = parseInt(max) + 1;
	console.log(keyId);
}

function saveData() {
	const key = document.getElementById("inputKey").value;
	const value = document.getElementById("inputValue").value;
	localStorage.setItem(key, value);
	document.getElementById("inputKey").value = "";
	document.getElementById("inputValue").value = "";
	loadOrder();
}

function addMenu(menuName, menuPrice, menyImage, menuOrder) {
	let i = menuOrder;
	const container = document.getElementById("menu");
	const table = document.createElement("table");
	const tablebody = document.getElementById("tbodyMenu");
	let tableTr = [];
	for (var j = 0; j < 4; j++) {
		tableTr[j] = document.createElement("tr");
	}

	let tableTd = [];
	for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
		tableTd[rowIndex] = [];
		for (var columnIndex = 0; columnIndex < 4; columnIndex++) {
			tableTd[rowIndex][columnIndex] = document.createElement("td");
		}
	}

	const image = document.createElement("img");
	image.src = menyImage;
	tableTd[0][0].style = "text-align:center";
	tableTd[0][0].appendChild(image);
	tableTd[0][0].rowSpan = 2;
	tableTd[0][0].colSpan = 2;

	tableTd[2][0].textContent = ` ${menuName}`;
	tableTd[2][0].style = "padding-left: 20px;";
	tableTd[2][1].textContent = ` ราคา : ${menuPrice}`;

	const increaseBtn = document.createElement("button");
	increaseBtn.style.height = "40px";
	increaseBtn.style.width = "40px";
	increaseBtn.textContent = "+";
	increaseBtn.onclick = function () {
		const tmp = document.getElementsByClassName("menuCount" + i)[0];
		tmp.textContent = parseInt(tmp.textContent) + 1;
	};

	tableTd[0][2].style = "text-align:center;";
	tableTd[0][2].appendChild(increaseBtn);

	tableTd[1][2].textContent = 1;
	tableTd[1][2].className = "menuCount" + i;
	tableTd[1][2].style = "text-align:center";

	const decreaseBtn = document.createElement("button");
	decreaseBtn.style.height = "40px";
	decreaseBtn.style.width = "40px";
	decreaseBtn.textContent = "-";
	decreaseBtn.onclick = function () {
		const tmp = document.getElementsByClassName("menuCount" + i)[0];
		if (parseInt(tmp.textContent) > 1) {
			tmp.textContent = parseInt(tmp.textContent) - 1;
		}
	};
	tableTd[2][2].style = "text-align:center";
	tableTd[2][2].appendChild(decreaseBtn);

	const buyBtn = document.createElement("button");
	buyBtn.className = "BuyBtn";
	buyBtn.textContent = "Add";

	buyBtn.onclick = function () {
		const tmp = document.getElementsByClassName("menuCount" + i)[0].textContent;
		let value = [menuName, menuPrice, tmp];
		localStorage.setItem(keyId, JSON.stringify(value));
		keyId++;
		loadOrder();
	};

	tableTd[0][3].appendChild(buyBtn);
	tableTd[0][3].rowSpan = 3;
	tableTd[0][3].style.height = "150px";

	tableTr[0].appendChild(tableTd[0][0]);
	tableTr[0].appendChild(tableTd[0][2]);
	tableTr[0].appendChild(tableTd[0][3]);
	tableTr[1].appendChild(tableTd[1][2]);
	tableTr[2].appendChild(tableTd[2][0]);
	tableTr[2].appendChild(tableTd[2][1]);
	tableTr[2].appendChild(tableTd[2][2]);

	tablebody.appendChild(tableTr[0]);
	tablebody.appendChild(tableTr[1]);
	tablebody.appendChild(tableTr[2]);
}

function loadOrder() {
	const container = document.getElementById("order");
	container.innerHTML = "";

	const table = document.createElement("table");
	const tablebody = document.createElement("tbody");
	let sum = 0;

	const sortOrder = Object.entries(localStorage)
		.map(([key, value]) => ({
			key: parseInt(key),
			value: JSON.parse(value),
		}))
		.sort(({ key: keyA }, { key: keyB }) => keyA - keyB);

	for (let i = 0; i < localStorage.length; i++) {
		let tableTr = [];
		for (var j = 0; j < 3; j++) {
			tableTr[j] = document.createElement("tr");
		}

		let tableTd = [];
		for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
			tableTd[rowIndex] = [];
			for (var columnIndex = 0; columnIndex < 7; columnIndex++) {
				tableTd[rowIndex][columnIndex] = document.createElement("td");
			}
		}

		const key = sortOrder[i].key;
		const value = sortOrder[i].value;
		sum = sum + parseInt(value[1]) * parseInt(value[2]);

		const increaseBtn = document.createElement("button");
		increaseBtn.style.height = "40px";
		increaseBtn.style.width = "40px";
		increaseBtn.textContent = "+";
		increaseBtn.onclick = function () {
			let new_count = parseInt(value[2]) + 1;
			localStorage[key] = JSON.stringify([value[0], value[1], new_count]);
			loadOrder();
		};
		tableTd[0][3].appendChild(increaseBtn);
		tableTd[0][3].style = "text-align:center";
		tableTd[1][0].textContent = `${value[0]}`;
		tableTd[1][0].style = "padding-left: 20px;";
		tableTd[1][1].textContent = `ราคา : ${value[1]}`;
		tableTd[1][2].style = "text-align:center";
		tableTd[1][2].textContent = `x`;
		tableTd[1][3].textContent = `${value[2]} `;
		tableTd[1][3].style = "text-align:center";
		tableTd[1][4].textContent = `=`;
		tableTd[1][5].textContent = parseInt(value[1]) * parseInt(value[2]);
		const decreaseBtn = document.createElement("button");
		decreaseBtn.style.height = "40px";
		decreaseBtn.style.width = "40px";
		decreaseBtn.textContent = "-";
		decreaseBtn.onclick = function () {
			if (parseInt(value[2]) > 1) {
				let new_count = parseInt(value[2]) - 1;
				localStorage[key] = JSON.stringify([value[0], value[1], new_count]);
				loadOrder();
			}
		};
		tableTd[2][3].style = "text-align:center";
		tableTd[2][3].appendChild(decreaseBtn);
		const removeButton = document.createElement("button");
		removeButton.className = "RemoveBtn";
		removeButton.textContent = "Remove";
		removeButton.onclick = function () {
			localStorage.removeItem(key);
			loadOrder();
		};
		tableTd[0][6].appendChild(removeButton);
		tableTd[0][6].rowSpan = 3;
		tableTd[0][6].style.height = "150px";

		tableTr[0].appendChild(tableTd[0][0]);
		tableTr[0].appendChild(tableTd[0][1]);
		tableTr[0].appendChild(tableTd[0][2]);
		tableTr[0].appendChild(tableTd[0][3]);
		tableTr[0].appendChild(tableTd[0][4]);
		tableTr[0].appendChild(tableTd[0][5]);
		tableTr[0].appendChild(tableTd[0][6]);
		tableTr[1].appendChild(tableTd[1][0]);
		tableTr[1].appendChild(tableTd[1][1]);
		tableTr[1].appendChild(tableTd[1][2]);
		tableTr[1].appendChild(tableTd[1][3]);
		tableTr[1].appendChild(tableTd[1][4]);
		tableTr[1].appendChild(tableTd[1][5]);
		tableTr[2].appendChild(tableTd[2][0]);
		tableTr[2].appendChild(tableTd[2][1]);
		tableTr[2].appendChild(tableTd[2][2]);
		tableTr[2].appendChild(tableTd[2][3]);
		tableTr[2].appendChild(tableTd[2][4]);
		tableTr[2].appendChild(tableTd[2][5]);
		tablebody.appendChild(tableTr[0]);
		tablebody.appendChild(tableTr[1]);
		tablebody.appendChild(tableTr[2]);
		table.appendChild(tablebody);
	}
	const div = document.createElement("div");
	div.textContent = `Total : ${sum} Baht`;
	container.appendChild(table);
	container.appendChild(div);
}

function clearBill() {
	localStorage.clear();
	loadOrder();
	keyId = 0;
	alert("All Bills Cleared");
}
