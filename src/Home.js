import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        description: 'Cloudy',
        image: '/Images/clouds.png'
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9d614f1ef1bc29985ef9baaa2d514cb3&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main === "Clouds") {
                        imagePath = "/Images/clouds.png";
                    } else if (res.data.weather[0].main === "Clear") {
                        imagePath = "/Images/clear.png";
                    } else if (res.data.weather[0].main === "Rain") {
                        imagePath = "/Images/rain.png";
                    } else if (res.data.weather[0].main === "Drizzle") {
                        imagePath = "/Images/drizzle.png";
                    } else if (res.data.weather[0].main === "Mist") {
                        imagePath = "/Images/mist.png";
                    } else {
                        imagePath = "/Images/clouds.png";
                    }
                    console.log(res.data);
                    setData({
                        ...data,
                        celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        description: res.data.weather[0].description,
                        image: imagePath
                    });
                    setError('');
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        setError("Invalid City Name");
                    } else {
                        setError('');
                    }
                    console.log(err);
                });
        }
    };

    return (
        <div className='container'>
            <div className='info'>
                <h1>React.js Case Study</h1>
                <h2>Weather Dashboard Application</h2>
            </div>
            <div className='weather'>
                <div className='search'>
                    <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src="/Images/search.png" alt="Search" /></button>
                </div>
                <div className='error'>
                    <p>{error}</p>
                </div>
                <div className='winfo'>
                    <img src={data.image} alt="" className='icon' />
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <h3>{data.description}</h3> 
                    <div className='details'>
                        <div className='col'>
                            <img src="/Images/humidity.png" alt="Humidity" />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src="/Images/wind.png" alt="Wind" style={{ width: "90px" }} />
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
