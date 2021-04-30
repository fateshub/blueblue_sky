import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import "./App.scss";
import Logo from "./Assets/Logo.svg";
import ReactAnimatedWeather from "react-animated-weather";
import Jump from "react-reveal/Jump";
import Fade from 'react-reveal/Fade';

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
  const [cityPick, updateCityPick] = useState();
  const [weather, getWeather] = useState([]);
  const [empty, changestate] = useState( false
  );
  const [, ] = useDebounce(
    () => {
      setDebouncedValue(city);

    },
    2000,
    [city]
  );

  useEffect(() => {
    if (debouncedValue) {
     let url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_CITY}=${debouncedValue}`
      axios
        .get(url)
        .then((response) => {
          let list = response.data
          console.log(list)
          updateCityPick(list.slice(0,3))
          console.log(list[0].LocalizedName)

         /* let data = {
            show: true,
            name: response.data.name,
            icon: response.data.weather[0].main,
            description: response.data.weather[0].description,
            temp: Math.round(response.data.main.temp),
          };*/

  //list = [...weather, data]
         // getWeather(list);
         // changestate(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, [debouncedValue]);
  

  useEffect(() => {
   
  }, [])


    function apicall(city){
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${process.env.REACT_APP_KEY}`;
            axios
              .get(url)
              .then((response) => {
                let list = []
                let data = {
                  show: true,
                  name: response.data.name,
                  icon: response.data.weather[0].main,
                  description: response.data.weather[0].description,
                  temp: Math.round(response.data.main.temp),
                };
      
        list = [...weather, data]
                getWeather(list);
                changestate(true)
              })
              updateCityPick([])
            }
 




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
          {cityPick ? (<div className="Sugg">{cityPick.map((city) => (  
            <Fade top>
            <div  onClick={()=>{apicall(city.LocalizedName)}} className="cities">{city.LocalizedName} , {city.Country.LocalizedName}</div></Fade>
          ))}</div>): <h1> </h1>}
        </div>
        {empty ? (
        <section className="card-list">
       { weather.map((data) => (  <Jump>
            <div className="card">
           <ReactAnimatedWeather
                icon={data.icon === "Clear" ? "CLEAR_DAY"
                : data.icon === "Rain" ? "RAIN"  
                : data.icon === "Drizzle" ? "RAIN"  
                : data.icon === "Thunderstorm" ? "RAIN"  
                 : data.icon === "Clouds" ? "CLOUDY"  : data.icon === "Snow" ? "SNOW"  : "FOG"}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              /> 
              <div className="cardinfo">
                <h1>{data.name} </h1>
                <p>{data.description}</p>
                <h2> {data.temp}F</h2>
              </div>
            </div>
          </Jump>))}
          </section>
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
