import React from 'react';
import '../App.css';
import Weather from './Weather';
import WeatherWithLocation from './WeatherWithLocation';
import DateTime from './DateTime';

const Content = () => {


  return (
    <div className="opaque-box">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Weather/>
          </div>
        <div className="col-md-6">
          <div className='sky'>
            <WeatherWithLocation/>
            <DateTime />
          </div>
        </div>
      </div>
    </div>
  </div> 
  );
};

export default Content;
