import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: ''
  })

  const [name, setName] = useState('')

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=25571b660c2f5af104df8b3a26225b64&units=metric`
      axios.get(apiUrl)
        .then(res => {
          let imagePath = "";
          if (res.data.weather[0].main === "Cloud") {
            imagePath = "https://www.shareicon.net/download/128x128//2016/06/27/787432_cloud_512x512.png"
          }
          else if (res.data.weather[0].main === "Clear") {
            imagePath = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Weather_icon_-_sunny.svg/768px-Weather_icon_-_sunny.svg.png?20171221205138"
          }
          else if (res.data.weather[0].main === "Rain") {
            imagePath = "https://cdn.vectorstock.com/i/1000x1000/65/45/cloud-with-rain-weather-icon-vector-23226545.webp"
          }
          else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "https://www.flaticon.com/free-icon/rain_6142570#"
          }
          else if (res.data.weather[0].main === "Mist") {
            imagePath = ""
          }
          else {
            imagePath = "https://www.shareicon.net/download/128x128//2016/06/27/787432_cloud_512x512.png"
          }
          setData({
            ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity,
            speed: res.data.wind.speed, image: imagePath
          })
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="app">

      {/*  search box */}
      <div className="search" style={{ alignItems: 'center', display: 'flex' }}>
        <InputGroup className="mb-3 custom-width" >
          <Form.Control
            placeholder="Enter Your City"
            aria-label="City"
            aria-describedby="basic-addon2"
            onChange={e => setName(e.target.value)}
          />
          <Button variant="light" id="button-addon2" onClick={handleClick}>
            Search
          </Button>
        </InputGroup>
      </div>
      <div class="card" style={{ width: '25rem', height: '35rem', alignItems: 'center' }}>
        <img src={data.image} alt="" style={{ height: '6rem', width: '6rem' }} />
        <div className="location">
          <p class="Display-1">{data.name}</p>
        </div>
        <div className="container">
          <div className="top">
            <div className="temperature">
              <h1 style={{ fontSize: '5srem', marginTop: '0.5rems' }}>{Math.round(data.celcius)}°C</h1>
            </div>
            <div className="description">
              <p>{data.weather}</p>
            </div>
          </div>
          <div className="Bottom">
            <div className="humidity" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <h5 style={{ fontFamily: 'cursive' }}>humidity</h5>
              <h5>{Math.round(data.humidity)}%</h5>
            </div>
            <div className="wind" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <h5 style={{ fontFamily: 'cursive' }}>wind speed</h5>
              <h5>{Math.round(data.speed)}mp</h5>
              <img src="./wind-icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
