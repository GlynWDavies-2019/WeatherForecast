const api = {
    key: "e67813a77a1e0f0c2536a3421500f79a",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress',setQuery);

function setQuery(event) {
    if(event.keyCode === 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    // console.log(weather);
    let now = new Date();
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let date = document.querySelector('.location .date');
    date.innerText = `${now.toDateString()}`;
    let temperature = document.querySelector('.current .temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`;
    let conditions = document.querySelector('.current .weather');
    conditions.innerText = `${weather.weather[0].main}`;
    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)} / ${Math.round(weather.main.temp_max)}&deg;c`;
}