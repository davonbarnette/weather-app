import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import './styles.scss';
import {OpenWeatherHandler} from "../../utils/OpenWeatherHandler";

const CurrentWeather = (props) => {
    const {main, name, weather} = props.currentWeather;
    const {temp} = main;

    let weatherDetails = weather[0];

    return (
        <section className='current-weather'>
            <div className='temperature'>
                {temp.toFixed(0)}&#8457;
            </div>
            <div className='details'>
                <div className='city'>{name}</div>
                <Moment format={'dddd hh:mm A'}/>
                {weatherDetails &&
                <div className='description'>
                    <img alt="open-weather-icon" className='icon' src={OpenWeatherHandler.getIconUrl(weatherDetails.icon)}/>
                    {weatherDetails.description
                        .split(' ')
                        .map(t => t.charAt(0).toUpperCase() + t.slice(1))
                        .join(' ')}
                </div>}
            </div>
        </section>
    )
}

export default CurrentWeather;