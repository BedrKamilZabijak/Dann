const apiKey = "xxxx";
const main = document.querySelector("#main");
const button = document.querySelector("#button");
const input = document.querySelector("#input");

button.addEventListener("click", async () => {
    const city = input.value.trim();
    if (city) {
        try {
            const weather = await getWeatherData(city);
            displayWeather(weather);
        } catch (error) {
            console.error(error);
            main.innerHTML = "<p>Failed to fetch weather data. Please try again.</p>";
        }
    } else {
        main.innerHTML = "<p>Please enter a city name.</p>";
    }
});

const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data.");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

const displayWeather = (weather) => {
    main.innerHTML = `
        <h2>Weather in ${weather.name}</h2>
        <p>Temperature: ${(weather.main.temp - 273.15).toFixed(2)} °C</p>
    `;
};