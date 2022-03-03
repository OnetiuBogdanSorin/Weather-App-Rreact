import React from 'react';
import classes from '../Layouts/dailyWeather.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';




function Dailyweather(props) {
    return <div className={classes.cardContainerTemperature}>
        
        <div className={classes.cardTemperature}>
            <div className={classes.temperatureCardImage}>{props.icon}</div>
            <p className={classes.vlTemperature}></p>
            <div className={classes.temperatureCards}>
                <p>{props.name}</p>
                <p>Temperature: {props.temperature} &#8451;</p>
                <p>Minimal temperature: {props.minTemperature} &#8451;</p>
                <p>Maximal temperature: {props.maxTemperature} &#8451;</p>
                <p>Humidity: {props.humidity}%</p>
            </div>
        </div>
        
        <div className={classes.cardContainerInfo}>
            <div className={classes.windCards}>
                <div className={classes.windCardImage}><FontAwesomeIcon icon={faWind} size='3x'/></div>
                <p className={classes.vlWind}></p>
                <div className={classes.windCard}><p>{props.speed} meters/sec</p></div>
            </div>
            {/* <FontAwesomeIcon icon={faWind}/> */}
            
            
            <div className={classes.cardInfo}>
                <div className={classes.fill}></div>
                <p>Feels like: {props.feelsLike} &#8451;</p>
                <p>Pressure: {props.pressure} hPa</p>
                
            </div>
        </div>
    </div>;
}

export default Dailyweather;
