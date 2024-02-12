"use strict";

const countries = document.querySelector(".countries");
const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const regionSelect = document.getElementById("regionSelect");

const getCountry = function (country) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  req.send();

  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 300) {
      const [data] = JSON.parse(this.responseText);
      const html = `
        <article class="country">
            <img src="${data.flags.png}" alt="" class="country_img" />
            <div class="country_data">
                <h3 class="country_name">${data.name.common}</h3>
                <h4 class="country_region">${data.region}</h4>
                <p class="country_row">🗣️</span> ${Object.values(
                  data.languages
                )}</p>
                <p class="country_row">💰</span> ${
                  Object.values(data.currencies)[0].name
                }</p>
                <p class="country_row">🧑‍🤝‍🧑</span> ${data.population}</p>
                <p class="country_row">🏡</span> ${data.borders}</p>
                <p class="country_row">🗼</span> ${data.capital}</p>
            </div>
        </article>`;
      countries.insertAdjacentHTML("beforeend", html);
      countries.style.opacity = 1;
    } else {
      console.error("Failed to fetch country data");
    }
  });
};

searchBtn.addEventListener("click", function () {
  const countryName = countryInput.value.trim();
  const region = regionSelect.value.trim();
  if (countryName !== "") {
    countries.innerHTML = "";
    getCountry(countryName);
  } else if (region !== "") {
    countries.innerHTML = "";
    const req = new XMLHttpRequest();
    req.open("GET", `https://restcountries.com/v3.1/region/${region}`);
    req.send();

    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 300) {
        const data = JSON.parse(this.responseText);
        data.forEach((country) => {
          getCountry(country.name.common);
        });
      } else {
        console.error("Failed to fetch countries by region");
      }
    });
  }
});
getCountry("Thailand");
getCountry("USA");
getCountry("Netherlands");
getCountry("Egypt");
getCountry("Australia");