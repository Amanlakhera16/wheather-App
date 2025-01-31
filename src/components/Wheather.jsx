import React from "react";
import "./Wheather.css";
import { useEffect, useRef, useState } from "react";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import search from "../assets/search.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import designer from "../assets/designer.png";

const Weather = () => {
  const [weatherData, setweatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };
  const search = async (city) => {
    if (city == "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon || clear];
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setweatherData(false);
      console.error("Error received");
    }
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="logo">&lt; Weather Wizard /&gt;</h1>
        <div className="wheather">
          <div className="Search">
            <div className="Search-BOx">
              <input
                ref={inputRef}
                type="text"
                className="search-bar"
                placeholder="search City"
              />
              <span className="search-img">
                <lord-icon
                  onClick={() => search(inputRef.current.value)}
                  src="https://cdn.lordicon.com/pagmnkiz.json"
                  trigger="hover"
                ></lord-icon>
              </span>
            </div>
            {weatherData ? (
              <>
                <img className="wheather-icon" src={weatherData.icon} alt="" />
                <p className="temprature">{weatherData.temperature}°C</p>
                <p className="location">{weatherData.location}</p>
                <div className="wheather-data">
                  <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                      <p>{weatherData.humidity}%</p>
                      <span>Humidity</span>
                    </div>
                  </div>
                  <div className="col">
                    <img src={wind} alt="" />
                    <div>
                      <p>{weatherData.windSpeed}km/h</p>
                      <span>wind speed</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
