var searchBtn = document.querySelector("#search-btn")
var currentForecastEl = document.querySelector("#current-forecast")
var futureForecastEl = document.querySelector("#future-forecast")


searchBtn.addEventListener("click", function(event) {
    var searchQuery = document.querySelector("#search-bar").value.split(' ').join('');
    var cityData = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchQuery + "&limit=5&appid=096c6b1c200b27403244ac76a0e8bd2d";
    event.preventDefault()

    fetch(cityData).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                localStorage.setItem("lat", data[0].lat)
                localStorage.setItem("lon", data[0].lon)
                localStorage.setItem("cityState", data[0].name + ", " + data[0].state);
                getWeatherData();
            })
        }
    });
});

var getWeatherData = function() {
    var lat = localStorage.getItem("lat")
    var lon = localStorage.getItem("lon")
    var dataURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=096c6b1c200b27403244ac76a0e8bd2d";

    fetch(dataURL).then(function (response) {
        if (response.ok) {
            response.json().then( function(data) {
                console.log(data);
                localStorage.setItem("currentIcon", data.current.weather[0].icon)
                localStorage.setItem("currentMain", data.current.weather[0].main)
                localStorage.setItem("currentTemp", JSON.stringify(data.current.temp))
                localStorage.setItem("currentFeel", JSON.stringify(data.current.feels_like))
                localStorage.setItem("currentHumid", JSON.stringify(data.current.humidity))
                localStorage.setItem("currentUVI", JSON.stringify(data.current.uvi))
                localStorage.setItem("forecast-1", JSON.stringify(data.daily[1]))
                localStorage.setItem("forecast-2", JSON.stringify(data.daily[2]))
                localStorage.setItem("forecast-3", JSON.stringify(data.daily[3]))
                localStorage.setItem("forecast-4", JSON.stringify(data.daily[4]))
                displayCurrent(), displayForecast();
            });
        } else {
            console.log("error");
        }
    })
    .catch(function (error) {
        console.log("unable to connect to openweather");
    });
}

function displayCurrent() {
    // CLEAR OLD
    currentForecastEl.textContent = "";

    // SHOW CURRENT WEATHER FOR SEARCH QUERY
    var cityState = localStorage.getItem("cityState")
    var cityStateEl = document.createElement("h3")
    cityStateEl.textContent = "Showing current weather for: " + cityState
    currentForecastEl.appendChild(cityStateEl)

    // IMG
    var currentImg = document.createElement("img")
    var iconID = localStorage.getItem("currentIcon")
    currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + iconID + ".png")
    currentForecastEl.appendChild(currentImg)

    // WEATHER HEADER
    var currentMain = localStorage.getItem("currentMain")
    var currentMainEl = document.createElement("h1")
    currentMainEl.textContent = currentMain
    currentForecastEl.appendChild(currentMainEl)

    // TEMP
    var currentTemp = localStorage.getItem("currentTemp")
    var currentTempEl = document.createElement("h4")
    currentTempEl.classList = "col-4 row"
    currentTempEl.textContent = "Temp: " + currentTemp + "\u00B0 F"
    currentForecastEl.appendChild(currentTempEl)

    // FEEL
    var currentFeel = localStorage.getItem("currentFeel")
    var currentFeelEl = document.createElement("h4")
    currentFeelEl.classList = "col-4 row"
    currentFeelEl.textContent = "Feels like: " + currentFeel + "\u00B0 F"
    currentForecastEl.appendChild(currentFeelEl)

    // HUMIDITY
    var currentHumid = localStorage.getItem("currentHumid")
    var currentHumidEl = document.createElement("h4")
    currentHumidEl.classList = "col-4 row"
    currentHumidEl.textContent = "Humidity: " + currentHumid + "%"
    currentForecastEl.appendChild(currentHumidEl)

    // UVI
    var currentUvi = localStorage.getItem("currentUVI")
    var currentUviEl = document.createElement("h4")
    currentUviEl.classList = "col-4 row"
    currentUviEl.textContent = "UV Index: " + currentUvi
    currentForecastEl.appendChild(currentUviEl)

}

function displayForecast() {

}


// api key = 096c6b1c200b27403244ac76a0e8bd2d