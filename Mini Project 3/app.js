const weatherInput = document.querySelector('#weather-input');
const weatherBtn = document.querySelector('#weather-btn');
const weatherResult = document.querySelector('#weather-result');

const movieInput = document.querySelector('#movie-input');
const movieBtn = document.querySelector('#movie-btn');
const movieResult = document.querySelector('#movie-result');

const fetchWeather = async () => {
    const city = weatherInput.value.trim();
    if (!city) {
        weatherResult.innerHTML = `<p class="error-msg">Please enter a valid city name.</p>`;
        return;
    }

    weatherResult.innerHTML = `<p class="loading">Fetching coordinates & metric data...</p>`;

    try {
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
        if (!geoResponse.ok) throw new Error("Geocoding connection failed.");
        
        const geoData = await geoResponse.json();
        if (geoData.length === 0) throw new Error(`Target city "${city}" not found.`);

        const { lat, lon, display_name } = geoData[0];
        const shortCityName = display_name.split(',')[0];


        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        if (!weatherResponse.ok) throw new Error("Weather metrics database unreachable.");
        
        const weatherData = await weatherResponse.json();

        const { temperature_2m, relative_humidity_2m, wind_speed_10m } = weatherData.current;

        weatherResult.innerHTML = `
            <div class="weather-display">
                <h3>${shortCityName}</h3>
                <div class="temp">${temperature_2m}°C</div>
                <div class="weather-details">
                    <div>💧 Humidity<br><strong>${relative_humidity_2m}%</strong></div>
                    <div>💨 Wind Speed<br><strong>${wind_speed_10m} km/h</strong></div>
                </div>
            </div>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p class="error-msg">⚠️ ${error.message}</p>`;
    }
};
const fetchMovie = async () => {
    const query = movieInput.value.trim();
    if (!query) {
        movieResult.innerHTML = `<p class="error-msg">Please type a movie title.</p>`;
        return;
    }

    movieResult.innerHTML = `<p class="loading">Crawling global catalog registries...</p>`;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`);
        if (!response.ok) throw new Error("Catalog registry network dropped.");

        const data = await response.json();
        if (!data.docs || data.docs.length === 0) throw new Error(`No match records found for "${query}".`);

        const record = data.docs[0];
        const title = record.title;
        const releaseYear = record.first_publish_year || "N/A";
        const score = record.ratings_average ? record.ratings_average.toFixed(1) : "N/A";
        
        const posterImg = record.cover_i 
            ? `https://covers.openlibrary.org/b/id/${record.cover_i}-L.jpg` 
            : `https://via.placeholder.com/160x240/1e293b/ffffff?text=No+Poster`;

        movieResult.innerHTML = `
            <div class="movie-display">
                <img class="movie-poster" src="${posterImg}" alt="${title} Art">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0.5rem;">Released: ${releaseYear}</p>
                    <p>⭐ Rating Score: <span class="rating">${score}</span></p>
                </div>
            </div>
        `;
    } catch (error) {
        movieResult.innerHTML = `<p class="error-msg">⚠️ ${error.message}</p>`;
    }
};

weatherBtn.addEventListener('click', fetchWeather);
movieBtn.addEventListener('click', fetchMovie);

weatherInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchWeather(); });
movieInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchMovie(); });