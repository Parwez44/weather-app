const Input = document.querySelector('.Input');
const searchBtn = document.querySelector('.search-icon');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const cityEl = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');

async function weather(city){
  const apiKey="49a01200bf6939d95961e545ccae312b";
  try{
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if(!result.ok){
      throw new Error(`Http error! status: ${result.status}`);
    }
    const data = await result.json();
    console.log(data);

    cityEl.textContent = data.name;
    wind.innerHTML = `${Math.round(data.wind.speed)}  km/h<br>Wind Speed`;
    humidity.innerHTML = `${data.main.humidity}%<br>Humidity`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;

    
    const condition = data.weather[0].main;
    console.log(condition);
    if (condition === "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "clear.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "rain.png";
    } else if (condition === "Snow") {
      weatherIcon.src = "snow.png";
    } else {
      weatherIcon.src = "default.png";
    }

  } catch(error){
    console.error("Error fetching data:", error);
  }
}


searchBtn.addEventListener("click", () => {
  const city = Input.value.trim();
  if(city){
    weather(city);
  } else {
    console.log("Please enter a city name");
  }
});

Input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = Input.value.trim();
    if (city) {
      weather(city);
    } else {
      console.log("Please enter a city name");
    }
  }
});


