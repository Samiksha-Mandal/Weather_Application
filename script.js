const apiKey = "f33d39f8757a19d5b8f703fd31248409";

async function getWeather() {
    const city = document.getElementById("city").value;
    const loader = document.getElementById("loader");

    loader.classList.remove("hidden");

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        document.getElementById("error").innerText = "";
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp").innerText = "🌡 " + data.main.temp + "°C";
        document.getElementById("condition").innerText = data.weather[0].main;
        document.getElementById("humidity").innerText = "💧 " + data.main.humidity + "%";
        document.getElementById("wind").innerText = "🌬 " + data.wind.speed + " m/s";

    } catch (err) {
        document.getElementById("error").innerText = "❌ " + err.message;
    }

    loader.classList.add("hidden");
}

function changeBackground(weather) {
    if (weather.includes("Cloud")) {
        document.body.style.background = "#bdc3c7";
    } else if (weather.includes("Rain")) {
        document.body.style.background = "#5f9ea0";
    } else if (weather.includes("Clear")) {
        document.body.style.background = "#f7b733";
    } else {
        document.body.style.background = "#74ebd5";
    }
}

async function getForecast(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    for (let i = 0; i < data.list.length; i += 8) {
        const item = data.list[i];

        const card = `
            <div class="card">
                <p>${new Date(item.dt_txt).toDateString()}</p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                <p>${item.main.temp}°C</p>
            </div>
        `;

        forecastDiv.innerHTML += card;
    }
}
