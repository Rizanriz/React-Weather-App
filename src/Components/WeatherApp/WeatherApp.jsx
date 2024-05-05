import React, { useState } from 'react';
import "./WeatherApp.css";
import search_icon from "./../../assets/search.png";
import cloud_icon from "./../../assets/cloud.png";
import wind_icon from "./../../assets/wind.png";
import humidity_icon from "./../../assets/humidity.png";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({
        main: { temp: '24', humidity: '64' },
        name: 'London',
        wind: { speed: '84' }
    });

    const search = async () => {
        if (!city.trim()) return;

        const api_key = "01799963ecb2128258c2a8c74841c315";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className='cityInput'
                    placeholder='search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
            <div className='weather-img'>
                <img src={cloud_icon} alt="weather" />
            </div>
            <div className="weather-temp">{weatherData.main.temp}°C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.main.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind" />
                    <div className="data">
                        <div className="wind-speed">{weatherData.wind.speed}km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
