"use strict";

const countries = document.querySelector(".countries");
const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const regionSelect = document.getElementById("regionSelect");

document.getElementById("memberBtn").addEventListener("click", function () {
  window.location.href = "member.html";
});

const regionBackgrounds = {
  Africa: "gif/afrising.gif",
  Americas: "gif/snowwww.gif",
  Asia: "gif/animerain.gif",
  Europe: "gif/snowwww.gif",
  Oceania: "gif/stormtunder.gif",
};
const regionSongs = {
  Africa: "sound/africa_song.mp3",
  Americas: "sound/americas_song.mp3",
  Asia: "sound/asia_song.mp3",
  Europe: "sound/europe_song.mp3",
  Oceania: "sound/oceania_song.mp3",
};

function playRegionSong(region) {
  const audio = document.getElementById("backgroundAudio");
  const regionSong = regionSongs[region];
  if (regionSong) {
    audio.src = regionSong;
    audio.play();
  }
}

function changeBackground(region) {
  const background = regionBackgrounds[region];
  if (background) {

    document.body.style.backgroundImage = `url(${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  } else {

    document.body.style.backgroundImage = "none";
  }
}

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
      changeBackground(data.region);
      playRegionSong(data.region);
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

regionSelect.addEventListener("change", function () {
  const selectedRegion = regionSelect.value;
  if (selectedRegion) {
    changeBackground(selectedRegion);
    playRegionSong(selectedRegion);
  } else {

    document.body.style.backgroundImage = "none";

    document.getElementById("backgroundAudio").pause();
  }
});

function playCountrySong(country) {
  ไอ
  const countrySong = "your_country_song.mp3";
  const audio = document.getElementById("backgroundAudio");
  if (countrySong) {
    audio.src = countrySong;
    audio.play();
  }
}
const volumeRange = document.getElementById("volumeRange");
const audio = document.getElementById("backgroundAudio");


volumeRange.addEventListener("input", function () {
  const volume = parseFloat(volumeRange.value) / 100;
  audio.volume = volume;
});