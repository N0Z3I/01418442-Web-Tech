const form = document.getElementById('food-form');
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
    return data.meals.map(food => ({
      name: food.strMeal,
      image: food.strMealThumb,
      price: parseFloat(food.idMeal)
    }));
  } catch (error) {
    console.error('Error fetching food data:', error);
  }
}

function createFoodItem(food) {
  const tr = document.createElement('tr');
  tr.classList.add('food-item');
  tr.innerHTML = `
    <td class="food-image"><img src="${food.image}" alt="${food.name}" width="100"></td>
    <td class="food-name">${food.name}</td>
    <td class="food-price">${food.price || ''}</td>
    <td class="remove-food"><button data-index="${foodList.indexOf(food)}">Remove</button></td>
  `;
  return tr;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!foodName.value || !foodPrice.value) return;
  const food = { name: foodName.value, price: parseFloat(foodPrice.value) };
  foodList.push(food);
  renderFoodList(foodList);
  foodName.value = '';
  foodPrice.value = '';
  calculateTotal();
});

function renderFoodList(foods) {
  foodTable.querySelector('tbody').innerHTML = '';
  foods.forEach(food => {
    foodTable.querySelector('tbody').appendChild(createFoodItem(food));
  });

  // Add event listener to remove buttons
  const removeButtons = document.querySelectorAll('.remove-food button');
  removeButtons.forEach((button, index) => button.addEventListener('click', () => removeFood(index)));
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
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

clearBill.addEventListener('click', () => {
  foodList = [];
  renderFoodList(foodList);
  calculateTotal();
});