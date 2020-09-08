import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import "./App.scss";
import Logo from "./Assets/Logo.svg";
import ReactAnimatedWeather from "react-animated-weather";
import Jump from "react-reveal/Jump";
const axios = require("axios");
require('dotenv').config()

const defaults = {
  color: "black",
  size: 400,
  animate: true,
};

function App() {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [city, updateCity] = useState();
  const [weather, getWeather] = useState({
    show: false,
    name: "Llanfairpwllgwyngyll",
    main: "da",
    description: " looks god",
    temp: 100,
  });

  const [, ] = useDebounce(
    () => {
      setDebouncedValue(city);
    },
    2000,
    [city]
  );

  useEffect(() => {
    if (debouncedValue) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${debouncedValue}&units=imperial&APPID=${process.env.REACT_APP_KEY}`;
      axios
        .get(url)
        .then((response) => {
          let data = {
            show: true,
            name: response.data.name,
            main: response.data.weather.main,
            description: response.data.weather.description,
            temp: Math.round(response.data.main.temp),
          };
          getWeather(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedValue]);

  return (
    <>
      <div className="App">
        <img className="Logo" src={Logo} alt="Logo"></img>
        <div className="container">
          <input
            type="text"
            placeholder="Search For City..."
            onChange={(e) => updateCity(e.target.value)}
          />
          <div className="search"></div>
        </div>
        {!weather.show ? (
          <Jump>
            <div className="card">
              <ReactAnimatedWeather
                icon="CLEAR_DAY"
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />{" "}
              <div className="cardinfo">
                <h1>{weather.name} </h1>
                <p>{weather.description}</p>
                <h2> {weather.temp}F</h2>
              </div>
            </div>
          </Jump>
        ) : (
          <>
            <h1>Click + do add a city</h1>
          </>
        )}
      </div>
    </>
  );
}

export default App;
