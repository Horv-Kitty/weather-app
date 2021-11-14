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
  "December",
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
];

let month = months[currentTime.getMonth()];
let day = currentTime.getDate();
if (day < 10) {
  day = `0${day}`;
}
let dateMonthAndDay = document.querySelector("#current-date");
dateMonthAndDay.innerHTML = `${month} ${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatDate(timestamp) {
  date = new Date(timestamp * 1000);
  let months = [
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Sep",
    "Oct",
    "Nov",
  ];

  let month = months[date.getMonth()];
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  let dates = `${month} ${day}`;

  return dates;
}

function getForecast(coordinates) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemperature(response) {
  celsiusLink = response.data.main.temp;
  let temperature = Math.round(celsiusLink);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  if (response.data.main.humidity >= 55 && response.data.main.humidity <= 100) {
    document.querySelector(
      ".rainAndSnowIcons"
    ).innerHTML = `<p class="rain-icon" id="rain-icon">
            <i class="fas fa-umbrella"></i>
          </p>`;
  }

  if (
    response.data.main.humidity >= 55 &&
    response.data.main.humidity <= 100 &&
    temperature <= 0
  ) {
    document.querySelector(
      ".rainAndSnowIcons"
    ).innerHTML = `<p class="snow-icon" id="snow-icon">
            <i class="fas fa-snowflake"></i>
          </p>`;
  }

  if (response.data.main.humidity <= 54) {
    document.querySelector(".rainAndSnowIcons").innerHTML = "";
  }

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

  getForecast(response.data.coord);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahreinheitTemperature = (celsiusLink * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusLink);
}

let celsiusLink = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLinkB = document.querySelector("#celsius-link");
celsiusLinkB.addEventListener("click", convertToCelsius);

search("Rotterdam");

function displayForecast(response) {
  let forecast = response.data.daily;

  document.querySelector("#uv-index").innerHTML = Math.round(
    response.data.current.uvi
  );

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-body"><div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let weatherIcon = forecastDay.weather[0].icon;

    if (weatherIcon === "01d") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-sun"></i>`;
    }

    if (weatherIcon === "01n") {
      weatherIcon = innerHTML = `<i class="fas fa-moon"></i>`;
    }

    if (weatherIcon === "02d") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-sun"></i>`;
    }

    if (weatherIcon === "02n") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-moon"></i>`;
    }

    if (
      weatherIcon === "03d" ||
      weatherIcon === "03n" ||
      weatherIcon === "04d" ||
      weatherIcon === "04n"
    ) {
      weatherIcon = innerHTML = `<i class="fas fa-cloud"></i>`;
    }

    if (weatherIcon === "09d" || weatherIcon === "09n") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-rain"></i>`;
    }

    if (weatherIcon === "10d") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
    }

    if (weatherIcon === "10n") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
    }

    if (weatherIcon === "11d" || weatherIcon === "11n") {
      weatherIcon = innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
    }

    if (weatherIcon === "13d" || weatherIcon === "13n") {
      weatherIcon = innerHTML = `<i class="far fa-snowflake"></i>`;
    }

    if (weatherIcon === "50d" || weatherIcon === "50n") {
      weatherIcon = innerHTML = `<i class="fas fa-smog"></i>`;
    }

    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecastDays">${formatDay(forecastDay.dt)} </div>
                <div class="forecastDates">${formatDate(forecastDay.dt)}</div>
                <div id="forecastIcon">${weatherIcon}</div>
                <div class="forecastTemperatures">
                <span class="forescastTemperatureDay">${Math.round(
                  forecastDay.temp.day
                )}°</span>
                <span class="forescastTemperatureNight">${Math.round(
                  forecastDay.temp.night
                )}°</span>
                </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayIcon(response) {
  let weatherIcon = response.weather[0].icon;

  if (weatherIcon === "01d") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  }

  if (weatherIcon === "01n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-moon"></i>`;
  }

  if (weatherIcon === "02d") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  }

  if (weatherIcon === "02n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-moon"></i>`;
  }

  if (
    weatherIcon === "03d" ||
    weatherIcon === "03n" ||
    weatherIcon === "04d" ||
    weatherIcon === "04n"
  ) {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud"></i>`;
  }

  if (weatherIcon === "09d" || weatherIcon === "09n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-rain"></i>`;
  }

  if (weatherIcon === "10d") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
  }

  if (weatherIcon === "10n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  }

  if (weatherIcon === "11d" || weatherIcon === "11n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  }

  if (weatherIcon === "13d" || weatherIcon === "13n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="far fa-snowflake"></i>`;
  }

  if (weatherIcon === "50d" || weatherIcon === "50n") {
    document.querySelector(
      "#forecastIcon"
    ).innerHTML = `<i class="fas fa-smog"></i>`;
  }

  return weatherIcon;
}
