import React, { useState, useEffect } from 'react';
import Api from '../Api';
import '../App.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [customApiUrl, setCustomApiUrl] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const generateCustomApiUrl = () => {
    if (city.trim() !== '') {
      const customUrl = `${Api.base}weather?q=${city}&appid=${Api.key}`;
      setCustomApiUrl(customUrl);
    }
  };

  const getWeatherIcon = (description) => {
    // Map weather descriptions to corresponding icons
    const iconMap = {
      'clear sky': '☀️',
      'few clouds': '⛅',
      'scattered clouds': '🌤️',
      'broken clouds': '☁️',
      'shower rain': '🌦️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
    };

    return iconMap[description.toLowerCase()] || '☁️'; // Default to a shrug emoji if not found
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(customApiUrl || `${Api.base}weather?q=Delhi&appid=${Api.key}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set weatherData to null if an error occurs
        setWeatherData(null);
      }
    };

    // Fetch data when component mounts and when customApiUrl changes
    fetchData();
  }, [customApiUrl]);

  return (
    <div className="container2">
      <div className="row">
        <div className="col-md-12">
          <div className='Wicon'>
            {weatherData?.weather?.[0]?.main && getWeatherIcon(weatherData.weather[0].main)}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search any city"
              onChange={handleCityChange}
              value={city}
            />
            <div className="img-box">
              <img
                src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                alt="Search Icon"
                onClick={generateCustomApiUrl}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {weatherData ? (
            <div>
              <h2><b>{weatherData.name}</b>, <b>{weatherData.sys.country}</b></h2>
              <p>Temperature: {Math.ceil(weatherData.main.temp - 273.15)}°C</p>
              <p>Weather: {weatherData.weather[0].description}{' '}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed}Km/h</p>
            </div>
          ) : (
            <p>ERROR: Entered City do not exist!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
