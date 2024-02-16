import React, { useState, useEffect } from 'react';
import Api from '../Api'

const LocationDetails = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    };

    const fetchWeatherData = async (latitude, longitude) => {
      try {
        
        const apiUrl = `${Api.base}weather?lat=${latitude}&lon=${longitude}&appid=${Api.key}&units=metric`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLocation();
  }, []);

  return (
    <div>
      <div className='name'>
        <h2><b>📍{weatherData?.name && weatherData.name}</b></h2>
      
      <div className='name1'>
        <h3>{weatherData?.sys.country && weatherData.sys.country}</h3>
      </div>
      </div>
      
      {location && weatherData ? (
        <div>
    
          <div className='temp'>
          <h1>{Math.ceil(weatherData.main.temp)}°C </h1>
          </div>
         
        </div>
      ) : (
        <p>{error || 'Fetching location and weather details...'}</p>
      )}
    </div>
  );
};

export default LocationDetails;
