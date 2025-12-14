const Input = document.querySelector(".Input");
const searchBtn = document.querySelector(".search-icon");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const cityEl = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const timeOfDayEl = document.querySelector(".time-of-day");
const localTimeEl = document.querySelector(".local-time");
const errorEl = document.querySelector(".error");

async function weather(city) {
  const apiKey = "49a01200bf6939d95961e545ccae312b";

  try {
    errorEl.classList.add("hide");

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    cityEl.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.innerHTML = `${data.main.humidity}%<br>Humidity`;
    wind.innerHTML = `${Math.round(data.wind.speed)} km/h<br>Wind Speed`;

    setWeatherImageAndTheme(data.weather[0]);
    setLocalTime(data.timezone);

  } catch (error) {
    errorEl.classList.remove("hide");
  }
}



function setWeatherImageAndTheme(weatherData) {
  const id = weatherData.id;
  const isDay = weatherData.icon.includes("d");

  timeOfDayEl.textContent = isDay ? "🌞 Day" : "🌙 Night";
  document.body.classList.toggle("night", !isDay);

  if (id >= 200 && id <= 232) weatherIcon.src = "rain.png";
  else if (id >= 300 && id <= 321) weatherIcon.src = "drizzle.png";
  else if (id >= 500 && id <= 531) weatherIcon.src = "rain.png";
  else if (id >= 600 && id <= 622) weatherIcon.src = "snow.png";
  else if (id >= 701 && id <= 781) weatherIcon.src = "mist.png";
  else if (id === 800) weatherIcon.src = "clear.png";
  else weatherIcon.src = "clouds.png";
}



function setLocalTime(timezoneOffset) {
  const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
  const local = new Date(utc + timezoneOffset * 1000);

  localTimeEl.textContent =
    "🕒 " +
    local.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}



function handleSearch() {
  const city = Input.value.trim();
  if (city) weather(city);
}

searchBtn.addEventListener("click", handleSearch);

Input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
