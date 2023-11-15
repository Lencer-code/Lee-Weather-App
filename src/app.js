function displaytemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.dt * 1000);
  timeElement.innerHTML = formartDate(date);
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" +
    response.data.weather[0].icon +
    ".png";

  getForecast(response.data.name);
}

function searchCity(city) {
  let apiKey = "324bf5756d5c6887ac717d9d18ca8c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaytemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  return fahrenheitTemperature;
}
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  return celsiusTemperature;
}
let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", showCelsiusTemperature);

function formartDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInputElement.value;
  searchCity(searchInputElement.value);
}
function getForecast(city) {
  let apiKey = "324bf5756d5c6887ac717d9d18ca8c52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=7`;
  axios(apiUrl).then(displayForecast);

  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Wed", "Thur", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${day}</div>
               <div class="weather-forecast-icon">🌤</div>
                <div class="weather-forecast-temperatures">
                  <div class="weather-forecast-temperature"><strong>18</strong>°</div>
                  <div class="weather-forecast-temperature">12°</div>
              </div>
              </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Oyugis");
