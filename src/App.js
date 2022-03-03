import React, { useState,useEffect } from 'react'; 
import './App.css';
import axios from 'axios';
//import useFetch from './app/useFecth';
import classes from "./Layouts/mainWeather.module.css";
import Dailyweather from './components/dailyWeather';
import Weatherforecast from './components/weatherForecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloudSunRain, faMoon, faCloudMoon, faCloudMoonRain, faCloud, faSnowflake, faFog} from '@fortawesome/free-solid-svg-icons';

const API_KEY = '18f1e0ececcfc884b88a6d44fa764963';	

const icons = {
	'01d': <FontAwesomeIcon icon={faSun} size='6x' />,
	'01n': <FontAwesomeIcon icon={faMoon} size='6x'/>,
	'02d': <FontAwesomeIcon icon={faCloudSun} size='6x'/>,
	'02n': <FontAwesomeIcon icon={faCloudMoon} size='6x'/>,
	'03d': <FontAwesomeIcon icon={faCloud} size='6x'/>,
	'10d': <FontAwesomeIcon icon={faCloudSunRain} size='6x'/>,
	'10n': <FontAwesomeIcon icon={faCloudMoonRain} size='6x'/>,
	'13d': <FontAwesomeIcon icon={faSnowflake} size='6x' />
}

const icons2 = {
	'01d': <FontAwesomeIcon icon={faSun} size='3x' />,
	'01n': <FontAwesomeIcon icon={faMoon} size='3x'/>,
	'02d': <FontAwesomeIcon icon={faCloudSun} size='3x'/>,
	'02n': <FontAwesomeIcon icon={faCloudMoon} size='3x'/>,
	'03d': <FontAwesomeIcon icon={faCloud} size='3x'/>,
	'10d': <FontAwesomeIcon icon={faCloudSunRain} size='3x'/>,
	'10n': <FontAwesomeIcon icon={faCloudMoonRain} size='3x'/>,
	'13d': <FontAwesomeIcon icon={faSnowflake} size='3x'/>
}
const checkWeatherImage = (value) => {
	if (value.substr(0,2) === "03" || value.substr(0,2) === "04") {
		return icons['03d'];
	} else if (value.substr(0,2) === "13") {
		return icons['13d'];
	} 
	return icons[value];
}

const checkWeatherImageForecast = (value) => {	
	if (value.substr(0,2) === "03" || value.substr(0,2) === "04") {
		return icons2['03d'];
	} else if (value.substr(0,2) === "13") {
		return icons2['13d'];
	} 
	return icons2[value];
}

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
			const temperature = tempk - 273.15;
			return Math.trunc(temperature);
		}
	} 

	// const cprop = {
	// 	'image1': { data.daily[1] ?checkWeatherImage(data.daily[0].weather[0].icon) : "Loading...." },
	// 	'temperature1': '',
	// 	'image2': checkWeatherImage(data.daily[2].weather[0].icon),
	// 	'temperature2':'',
	// 	'image3': checkWeatherImage(data.daily[3].weather[0].icon),
	// 	'temperature3':'',
	// 	'image4': checkWeatherImage(data.daily[4].weather[0].icon),
	// 	'temperature4':'',
	// 	'image5': checkWeatherImage(data.daily[5].weather[0].icon),
	// 	'temperature5': '',
	// }
	console.log(data.daily)

	

	return (
		<div className={classes.weather}>
			<Dailyweather
				name={data.name}
				temperature={data.daily ? kelvintocelsius(data.daily[0].temp.day) : "Loading...."}
				minTemperature={data.daily ? kelvintocelsius(data.daily[0].temp.min) : "Loading...."}
				maxTemperature={data.daily ? kelvintocelsius(data.daily[0].temp.max) : "Loading...."}
				icon={data.daily ? checkWeatherImage(data.daily[0].weather[0].icon) : "Loading...."}
				speed={data.daily ? data.daily[0].wind_speed : "Loading...."}
				feelsLike={data.daily ? kelvintocelsius(data.daily[0].feels_like.day) : "Loading...."}
				pressure={data.daily ? data.daily[0].pressure : "Loading...."}
				humidity={data.daily ? data.daily[0].humidity : "Loading...."}
			/>
			
			<Weatherforecast
				image1={data.daily ? checkWeatherImageForecast(data.daily[1].weather[0].icon) : "Loading...."}
				temperature1 = {data.daily ? kelvintocelsius(data.daily[1].temp.day) : "Loading...."}
				image2={data.daily ? checkWeatherImageForecast(data.daily[2].weather[0].icon) : "Loading...."}
				temperature2 = {data.daily ? kelvintocelsius(data.daily[2].temp.day) : "Loading...."}
				image3={data.daily ? checkWeatherImageForecast(data.daily[3].weather[0].icon) : "Loading...."}
				temperature3 = {data.daily ? kelvintocelsius(data.daily[3].temp.day) : "Loading...."}
				image4={data.daily ? checkWeatherImageForecast(data.daily[4].weather[0].icon) : "Loading...."}
				temperature4 = {data.daily ? kelvintocelsius(data.daily[4].temp.day) : "Loading...."}
				image5={data.daily ? checkWeatherImageForecast(data.daily[5].weather[0].icon) : "Loading...."}
				temperature5 = {data.daily ? kelvintocelsius(data.daily[5].temp.day) : "Loading...."}
			/>
    	</div>
  	);
}

export default App;