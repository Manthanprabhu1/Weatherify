import React, { useState, useEffect } from 'react';
import '../App.css'

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const formattedDate = currentDateTime.toLocaleDateString('en-US', dateOptions);
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', timeOptions);

  return (
    <div>
      <div className='date' ><b><p>{formattedDate}</p></b></div>
      <div className='time'><b><p>{formattedTime}</p></b></div>
      
    </div>
  );
};

export default DateTime;
