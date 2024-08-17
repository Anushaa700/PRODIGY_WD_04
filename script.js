async function getWeather() {
    const apiKey = "a5922b04ecbfd4f34401386a4c8fc89c";
    const city = document.getElementById("city-input").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const dataR = await response.json();

        if (dataR.cod === 200) {
            const weatherDesc = dataR.weather[0].description;
            const weatherI = getWeatherIcon(dataR.weather[0].main);

            document.getElementById("weather-info").innerHTML = `
                <div class="weather-icon ${weatherI.class}"><i class="fas ${weatherI.icon}"></i></div>
                <h2>${dataR.name}, ${dataR.sys.country}</h2>
                <p>Temperature: ${dataR.main.temp}°C</p>
                <p>Weather: ${weatherDesc}</p>
                <p>Humidity: ${dataR.main.humidity}%</p>
                <p>Wind Speed: ${dataR.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById("weather-info").innerHTML = `<p>${dataR.message}</p>`;
        }
    } catch (error) {
        document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data</p>`;
    }
}

function getWeatherIcon(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case "rain":
            return { icon: "fa-cloud-showers-heavy", class: "rainy" };
        case "sleet":
            return { icon: "fa-cloud-meatball", class: "rainy" };
        case "wind":
            return { icon: "fa-wind", class: "windy" };
        case "snow":
            return { icon: "fa-snowflake", class: "snowy" };
        case "clear":
            return { icon: "fa-regular fa-sun", class: "sunny" };
        case "fog":
            return { icon: "fa-smog", class: "foggy" };
        case "clouds":
            return { icon: "fa-cloud", class: "cloudy" };
        default:
            return { icon: "fa-cloud", class: "cloudy" };
    }
}
