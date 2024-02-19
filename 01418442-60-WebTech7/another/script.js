const inputKey = document.getElementById("inputKey");
const inputValue = document.getElementById("inputValue");
const saveButton = document.querySelector("button:nth-of-type(1)");
const loadButton = document.querySelector("button:nth-of-type(2)");
const clearButton = document.querySelector("button:nth-of-type(3)");
const dataContainer = document.getElementById("data");

saveButton.addEventListener("click", function () {
  const key = inputKey.value;
  const value = inputValue.value;
  localStorage.setItem(key, value);
  inputKey.value = "";
  inputValue.value = "";
});

loadButton.addEventListener("click", function () {
  dataContainer.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    dataContainer.innerHTML += `<p>${key}: ${value}</p>`;
  }
});

clearButton.addEventListener("click", function () {
  localStorage.clear();
  dataContainer.innerHTML = "";
});