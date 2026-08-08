// ===============================
// Weather & Movie Search App
// ===============================

// Weather Elements
const weatherInput = document.getElementById("weather-input");
const weatherBtn = document.getElementById("weather-btn");
const weatherResult = document.getElementById("weather-result");

// Movie Elements
const movieInput = document.getElementById("movie-input");
const movieBtn = document.getElementById("movie-btn");
const movieResult = document.getElementById("movie-result");

const API_KEY = "YOUR_API_KEY";

// -------------------------------
// Weather Icon
// -------------------------------

function getWeatherIcon(temp) {
    if (temp >= 35) return "☀️";
    if (temp >= 28) return "🌤️";
    if (temp >= 20) return "⛅";
    if (temp >= 10) return "🌥️";
    return "❄️";
}

// -------------------------------
// Weather App
// -------------------------------

async function fetchWeather() {

    const city = weatherInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML =
        `<p class="error-msg">Please enter a city name.</p>`;
        return;
    }

    weatherResult.innerHTML = `
    <div class="loading">
        <div class="loader"></div>
        <p>Loading Weather...</p>
    </div>
    `;

    try {

        const geoResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
        );

        if (!geoResponse.ok)
            throw new Error("Unable to fetch location.");

        const geoData = await geoResponse.json();

        if (geoData.length === 0)
            throw new Error("City not found.");

        const { lat, lon, display_name } = geoData[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!weatherResponse.ok)
            throw new Error("Weather API Error.");

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        weatherResult.innerHTML = `
        <div class="weather-display">

            <div class="weather-icon">
                ${getWeatherIcon(current.temperature_2m)}
            </div>

            <h3>${display_name.split(",")[0]}</h3>

            <div class="temp">
                ${current.temperature_2m}°C
            </div>

            <div class="weather-details">

                <div>
                    💧
                    <br>
                    Humidity
                    <br>
                    <strong>${current.relative_humidity_2m}%</strong>
                </div>

                <div>
                    💨
                    <br>
                    Wind
                    <br>
                    <strong>${current.wind_speed_10m} km/h</strong>
                </div>

            </div>

        </div>
        `;

    }

    catch (error) {

        weatherResult.innerHTML =
        `<p class="error-msg">⚠️ ${error.message}</p>`;

    }

}

// -------------------------------
// Movie Search
// -------------------------------

async function fetchMovie() {

    const movieName = movieInput.value.trim();

    if (!movieName) {

        movieResult.innerHTML =
        `<p class="error-msg">Please enter a movie name.</p>`;

        return;
    }

    movieResult.innerHTML = `
        <div class="loading">
            <div class="loader"></div>
            <p>Searching Movie...</p>
        </div>
    `;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
        );

        const data = await response.json();

        if (data.Response === "False") {

            throw new Error(data.Error);

        }

        const poster =
            data.Poster !== "N/A"
                ? data.Poster
                : "https://via.placeholder.com/220x320?text=No+Poster";

        movieResult.innerHTML = `

        <div class="movie-display">

            <img
                src="${poster}"
                class="movie-poster"
                alt="${data.Title}">

            <div class="movie-info">

                <h3>${data.Title}</h3>

                <p><strong>📅 Year:</strong> ${data.Year}</p>

                <p><strong>🎭 Genre:</strong> ${data.Genre}</p>

                <p><strong>⭐ IMDb:</strong>
                    <span class="rating">${data.imdbRating}</span>
                </p>

                <p><strong>🎬 Director:</strong> ${data.Director}</p>

                <p><strong>⏱ Runtime:</strong> ${data.Runtime}</p>

                <p><strong>🌍 Language:</strong> ${data.Language}</p>

                <p style="margin-top:15px;">
                    ${data.Plot}
                </p>

            </div>

        </div>

        `;

    }

    catch(error){

        movieResult.innerHTML =
        `<p class="error-msg">⚠️ ${error.message}</p>`;

    }

}



// -------------------------------
// Events
// -------------------------------

weatherBtn.addEventListener("click", fetchWeather);

movieBtn.addEventListener("click", fetchMovie);

weatherInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter")
        fetchWeather();

});

movieInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter")
        fetchMovie();

});

// -------------------------------
// Auto Focus
// -------------------------------

window.onload = () => {

    weatherInput.focus();

};