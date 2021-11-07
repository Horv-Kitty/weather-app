// change time
let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateElement.innerHTML = `${hours}:${minutes}`;

// change month and day
let months = [
  "Januar",
  "Februar",
  "March",
  "April",
  "May",
  "Junius",
  "Julius",
  "September",
  "October",
  "November",
  "December",
];

let month = months[currentTime.getMonth()];
let day = currentTime.getDate();
if (day < 10) {
  day = `0${day}`;
}
let dateMonthAndDay = document.querySelector("#current-date");
dateMonthAndDay.innerHTML = `${month} ${day}`;

// change city
function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  if (temperature >= -30 && temperature <= 0) {
    let img = document.querySelector("#background-img");
    img.src = "images/snow-icon.svg";
  }

  if (temperature >= 1 && temperature <= 17) {
    let img = document.querySelector("#background-img");
    img.src = "images/day-icon.svg";
  }
  if (temperature >= 18 && temperature <= 29) {
    let img = document.querySelector("#background-img");
    img.src = "images/light-sun-icon.svg";
  }

  if (temperature >= 30 && temperature <= 60) {
    let img = document.querySelector("#background-img");
    img.src = "images/sun-icon.svg";
  }
}

function search(city) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#searching-form");

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Budapest");

// change temperature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 14;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// change img
