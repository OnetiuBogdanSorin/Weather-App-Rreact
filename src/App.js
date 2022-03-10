import React, { useState,useEffect } from 'react'; 
import './App.css';
import axios from 'axios';
import classes from "./Layouts/mainWeather.module.css";
import Dailyweather from './components/dailyWeather';
import Weatherforecast from './components/weatherForecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudSunRain, faMoon, faCloudMoon, faCloudMoonRain, faCloud, faSnowflake} from '@fortawesome/free-solid-svg-icons';

const API_KEY = 'Your Api Key';	

const checkWeatherImage = (value,size) => {
	let weather;
	switch (value) {
		case '01d':
			weather = <FontAwesomeIcon icon={faSun} size={size} />;
			break;
		case '01n':
			weather = <FontAwesomeIcon icon={faMoon} size={size} />;
			break;
		case '02d':
			weather = <FontAwesomeIcon icon={faCloudSun} size={size} />;
			break;
		case '02n':
			weather = <FontAwesomeIcon icon={faCloudMoon} size={size} />;
			break;
		case '03d' :
		case '03n':
		case '04d':
		case '04n':
			weather = <FontAwesomeIcon icon={faCloud} size={size} />;
			break;
		case '10d':
			weather = <FontAwesomeIcon icon={faCloudSunRain} size={size} />;
			break;
		case '10n':
			weather = <FontAwesomeIcon icon={faCloudMoonRain} size={size} />;	
			break;
		case '13d' :
		case '13n':
			weather = <FontAwesomeIcon icon={faSnowflake} size={size} />;
			break;
		default: <FontAwesomeIcon icon={faSun} size={size} />;
	}

	return weather;
}

// const checkWeatherImageForecast = (value) => {	
// 	if (value.substr(0,2) === "03" || value.substr(0,2) === "04") {
// 		return icons2['03d'];
// 	} else if (value.substr(0,2) === "13") {
// 		return icons2['13d'];
// 	}
// 	return icons2[value];
// }


function App() {
	const [location, setLocation] = useState({lat:null,lng:null})
	const [data, setData] = useState({});
	
	useEffect(( ) => {
		navigator.geolocation.getCurrentPosition((position) => {
			let locationAux = { ...location };
			locationAux.lat = position.coords.latitude;
			locationAux.lng = position.coords.longitude;
			setLocation(locationAux);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);
	
	if (location.lat && !data.daily) {
		axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`)
			.then((response) => {
				setData(response.data);
			});
	}

	const kelvintocelsius = (tempk) => {
		if (tempk) {
			return Math.trunc(tempk - 273.15);
		}
	}

	console.log(data.daily);

	return (
		<div className={classes.weather}>
			<Dailyweather
				name={data.name}
				temperature={data.daily ? kelvintocelsius(data.daily[0].temp.day) : "Loading...."}
				minTemperature={data.daily ? kelvintocelsius(data.daily[0].temp.min) : "Loading...."}
				maxTemperature={data.daily ? kelvintocelsius(data.daily[0].temp.max) : "Loading...."}
				icon={data.daily ? checkWeatherImage(data.daily[0].weather[0].icon,'6x') : "Loading...."}
				speed={data.daily ? data.daily[0].wind_speed : "Loading...."}
				feelsLike={data.daily ? kelvintocelsius(data.daily[0].feels_like.day) : "Loading...."}
				pressure={data.daily ? data.daily[0].pressure : "Loading...."}
				humidity={data.daily ? data.daily[0].humidity : "Loading...."}
			/>

			<Weatherforecast
				image1={data.daily ? checkWeatherImage(data.daily[1].weather[0].icon,'3x') : "Loading...."}
				temperature1 = {data.daily ? kelvintocelsius(data.daily[1].temp.day) : "Loading...."}
				image2={data.daily ? checkWeatherImage(data.daily[2].weather[0].icon,'3x') : "Loading...."}
				temperature2 = {data.daily ? kelvintocelsius(data.daily[2].temp.day) : "Loading...."}
				image3={data.daily ? checkWeatherImage(data.daily[3].weather[0].icon,'3x') : "Loading...."}
				temperature3 = {data.daily ? kelvintocelsius(data.daily[3].temp.day) : "Loading...."}
				image4={data.daily ? checkWeatherImage(data.daily[4].weather[0].icon,'3x') : "Loading...."}
				temperature4 = {data.daily ? kelvintocelsius(data.daily[4].temp.day) : "Loading...."}
				image5={data.daily ? checkWeatherImage(data.daily[5].weather[0].icon,'3x') : "Loading...."}
				temperature5 = {data.daily ? kelvintocelsius(data.daily[5].temp.day) : "Loading...."}
			/>
    	</div>
  	);
}

export default App;