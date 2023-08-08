import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function WeatherApp() {
  const apiKey = "ebad9a347dc2fb618fdf3e23b70f5952";

  const [weatherData, setWeatherData] = useState({
    city: "Jaipur",
    icon: "",
    description: "",
    temp: "",
    humidity: "",
    windSpeed: ""
  });
  const [searchValue, setSearchValue] = useState("");

  const fetchWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          alert("No weather found, Try again!!");
          throw new Error("No weather found");
        }
        return response.json();
      })
      .then(data => displayWeather(data))
      .catch(error => console.error(error));
  };

  const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    setWeatherData({
      city: name,
      icon: icon,
      description: description,
      temp: temp.toFixed(2) + "°C",
      humidity: "Humidity: " + humidity + "%",
      windSpeed: "Wind speed: " + speed + " km/h"
    });

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x800/?landscape,water${name}')`;
  };

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      fetchWeather(searchValue);
    } else {
      alert("Please enter a city name.");
    }
  };

  useEffect(() => {
    fetchWeather("Jaipur");
  }, []);

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={`weather ${weatherData.icon ? "" : "loading"}`}>
        <h2 className="city">Weather in {weatherData.city}</h2>
        <h1 className="temp">{weatherData.temp}</h1>
        <div className="flex">
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="" className="icon" />
          <div className="description">{weatherData.description}</div>
        </div>
        <div className="humidity">{weatherData.humidity}</div>
        <div className="wind">{weatherData.windSpeed}</div>
      </div>
    </div>
  );
}

export default WeatherApp;
