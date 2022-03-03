import React from 'react';
import classes from '../Layouts/forecast.module.css'

function Weatherforecast(props) {
    return <div className={classes.ForecastMain}>
        <div className={classes.forecastCard}>
            <div className={classes.imageCard}>{props.image1}</div>
            <p className={classes.hlForecast}></p>
            <div className={classes.imageCard}>{props.temperature1} &#8451;</div>
        </div>
        <div className={classes.forecastCard}>
            <div className={classes.imageCard}>{props.image2}</div>
            <p className={classes.hlForecast}></p>
            <div className={classes.imageCard}>{props.temperature2} &#8451;</div>
        </div>
        <div className={classes.forecastCard}>
            <div className={classes.imageCard}>{props.image3}</div>
            <p className={classes.hlForecast}></p>
            <div className={classes.imageCard}>{props.temperature3} &#8451;</div>
        </div>
        <div className={classes.forecastCard}>
            <div className={classes.imageCard}>{props.image4}</div>
            <p className={classes.hlForecast}></p>
            <div className={classes.imageCard}>{props.temperature4} &#8451;</div>
        </div>
        <div className={classes.forecastCard}>
            <div className={classes.imageCard}>{props.image5}</div>
            <p className={classes.hlForecast}></p>
            <div className={classes.imageCard}>{props.temperature5} &#8451;</div>
        </div>
    </div>;
}

export default Weatherforecast;
