const docWeather = document.querySelector('.js-weather');

const APIKEY = 'e4477edaeda4de89e0f1c1ec47719f0b'
const WEATHER = 'weather';

const getWeather = function(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
    .then((res) =>{
        return res.json()
    })
    .then((json) =>{
        docWeather.innerHTML = `${json.main.temp}°C 🌏${json.name}`;
    })
}

const saveCoords = (coordObj) =>{
    localStorage.setItem(WEATHER, JSON.stringify(coordObj));
}
const successGeo = (position) =>{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj =  {
        latitude,
        longitude
    }
    saveCoords(coordObj);
    getWeather(latitude,longitude);
}

const errorGeo = () =>{
    console.error('Can\' access Loaction');
}
const askWeather = function() {
     navigator.geolocation.getCurrentPosition(successGeo, errorGeo)
}

const loadweather = () =>{
    const loadedCoord = localStorage.getItem(WEATHER)
    if(loadedCoord === null){
        askWeather()
    }else{
        const parsedCoords = JSON.parse(loadedCoord);
        const lat = parsedCoords.latitude;
        const lon = parsedCoords.longitude;
        getWeather(lat,lon);
    }
}

const weatherRun = () =>{
    loadweather()
}
weatherRun()