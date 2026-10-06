
import React, { useEffect, useState } from "react";
import "../App.css";

export default function WeatherApp() {
  const [city, setCity] = useState("Rawalakot");
  const [weatherdata, setWeatherData] = useState(null);

  const currentDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const APIKEY = "633f4a2c89294d723f14b34c085a61f2";

  const fetchweatherdata = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
      );

      const data = await response.json();

      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchweatherdata();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchweatherdata();
  };

  return (
    <div className="App">
      <div className="container">
        {weatherdata && (
          <>
            <h1 className="container_date">{formattedDate}</h1>

            <div className="weather_data">
              <h2 className="container_city">{weatherdata.name}</h2>

              <img
                className="container_img"
                src="/images/thunder.png"
                width="150px"
                alt="thunder"
              />

              <h2 className="container_degree">
                {weatherdata.main.temp}°C
              </h2>

              <h2 className="container_para">Rain</h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  onChange={handleInputChange}
                />

                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}