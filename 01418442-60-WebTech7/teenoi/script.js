const form = document.getElementById('add-food-form');
const foodName = document.getElementById('food-name');
const foodPrice = document.getElementById('food-price');
const foodTable = document.getElementById('food-table');
const totalPrice = document.getElementById('total-price');
const clearBill = document.getElementById('clear-bill');
const foodAPI = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
let foodList = [];
let total = 0;

async function fetchFoodData() {
  try {
    const response = await fetch(foodAPI);
    const data = await response.json();
    return data.meals; // Get the meals array from the data
  } catch (error) {
    console.error('Error fetching food data:', error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!foodName.value || !foodPrice.value) return;
  foodList.push({ name: foodName.value, price: parseFloat(foodPrice.value) });
  renderFoodList(foodList);
  foodName.value = '';
  foodPrice.value = '';
  calculateTotal();
});

function renderFoodList(foods) {
  foodTable.querySelector('tbody').innerHTML = '';
  foods.forEach((food, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><img src="${food.strMealThumb}" alt="${food.strMeal}" width="100"></td><br>
        <td>${food.strMeal}</td>
        <td>${food.strPrice || ''}</td>
      `;
    foodTable.querySelector('tbody').appendChild(tr);
  });
}

fetchFoodData().then((foods) => {
  renderFoodList(foods);
});

function removeFood(index) {
  foodList.splice(index, 1);
  renderFoodList(foodList);
  calculateTotal();
}

function calculateTotal() {
  total = foodList.reduce((acc, cur) => acc + cur.price, 0);
  totalPrice.textContent = total;
}

clearBill.addEventListener('click', () => {
  foodList = [];
  renderFoodList(foodList);
  calculateTotal();
});
