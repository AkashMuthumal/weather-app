async function getWhether(city) {
  const apiKey = "0303891cbd69c2eb696e641e1a915f74";

  const cityLocator = new URL("https://api.openweathermap.org/geo/1.0/direct");
  const whether = new URL("https://api.openweathermap.org/data/2.5/weather");

  cityLocator.searchParams.set("q", city);
  cityLocator.searchParams.set("appid", apiKey);

  let response = await fetch(cityLocator);

  let data = await response.json();

  let lattitude = data[0].lat;
  let longitude = data[0].lon;

  whether.searchParams.set("lat", lattitude);
  whether.searchParams.set("lon", longitude);
  whether.searchParams.set("units", "metric");
  whether.searchParams.set("appid", apiKey);

  response = await fetch(whether);

  data = await response.json();
  return data;
}

const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");

searchButton.addEventListener("click", () => {
  const city = document.querySelector(".search-bar").value;
  updateData(city);
});

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = document.querySelector(".search-bar").value;
    updateData(city);
    document.querySelector(".search-bar").value = "";
  }
});

async function updateData(city) {
  const whetherData = await getWhether(city);

  const cityName = whetherData.name;
  const wind = whetherData.wind.speed;
  const temp = whetherData.main.temp;
  const humidity = whetherData.main.humidity;
  const whetherStatus = whetherData.weather[0].main;

  console.log(cityName, wind, temp, humidity, whetherStatus);

  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const windElement = document.querySelector(".wind-level");
  const humidityElement = document.querySelector(".humidity-level");
  const imageElement = document.querySelector(".image");

  cityElement.innerHTML = cityName;
  tempElement.innerHTML = `${temp}&#x2103`;
  windElement.innerHTML = `${wind}&nbspkm/h`;
  humidityElement.innerHTML = humidity;
  imageElement.src = `/images/${whetherStatus}.png`;
}
