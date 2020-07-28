const docWeather = document.querySelector(".js-weather");

const APIKEY = "e4477edaeda4de89e0f1c1ec47719f0b";
const WEATHER = "weather";

const getWeather = async function (lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
  );
  const result = await res.json();
  docWeather.innerHTML = `${result.main.temp}°C 📍${result.name}`;
};

const saveCoords = (coordObj) => {
  localStorage.setItem(WEATHER, JSON.stringify(coordObj));
};
const successGeo = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordObj = {
    latitude,
    longitude,
  };
  saveCoords(coordObj);
  getWeather(latitude, longitude);
};

const errorGeo = () => {
  docWeather.style.cssText = "font-size : 2rem;";
  docWeather.innerHTML = `Oh, Location not found! 🙊`;
};
const askWeather = function () {
  navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
};

const loadweather = () => {
  const loadedCoord = localStorage.getItem(WEATHER);
  if (loadedCoord === null) {
    askWeather();
  } else {
    const parsedCoords = JSON.parse(loadedCoord);
    const lat = parsedCoords.latitude;
    const lon = parsedCoords.longitude;
    getWeather(lat, lon);
  }
};

const weatherRun = () => {
  loadweather();
};
weatherRun();
