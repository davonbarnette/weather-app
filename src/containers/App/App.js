import React, {useState} from 'react';
import {observer} from "mobx-react";
import 'moment-timezone';
import cx from 'classnames';

import './styles.scss';

import {AppActions} from "../../Actions";
import AppStore from '../../Store';
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import Forecast from "../../components/Forecast/Forecast";

AppStore.init();

const App = (props) => {

    const [currentWeather, setCurrentWeather] = useState(undefined);
    const [forecast, setForecast] = useState(undefined);
    const [loading, setLoading] = useState(false);

    async function getAllWeather(){
        if (loading) return null;

        setLoading(true);
        let location = await AppActions.attemptToGetCurrentLocation();
        if (location){
            const {latitude, longitude} = location;
            let weatherResponse = await AppActions.getCurrentWeather(latitude, longitude);
            setCurrentWeather(weatherResponse);

            let forecastResponse = await AppActions.get5DayForecast(latitude, longitude);
            setForecast(forecastResponse);
        }
        setLoading(false);
    }

    return (
        <div className="app">
            <div className='app-content'>
                <div className='app-content-subtitle'>
                    Welcome To
                </div>
                <div className='app-content-title'>
                    Davon's Weather
                </div>
                <div className='app-content-description'>
                    <div className='built-with'>
                        This was built with:
                        <ul>
                            <li>React</li>
                            <li>MobX</li>
                        </ul>
                    </div>
                    <div>This app will give you the current weather, and your 5-day forecast as well. If you're running
                        this on the development server, you'll need to create a .env file in your project's root directory
                        that has one entry:</div>
                    <div className='code'>REACT_APP_OPEN_WEATHER_API_KEY=REPLACE_WITH_YOUR_API_KEY</div>
                </div>
                <button className={cx('get-forecast', {loading})} onClick={getAllWeather}>
                    {loading ? 'Loading Weather Data...' : 'Get Forecast'}
                </button>
                {currentWeather && forecast &&
                <div className='data'>
                    <div className='current-weather-wrapper'>
                        <div className='data-title'>Current Weather</div>
                        <CurrentWeather currentWeather={currentWeather}/>
                    </div>
                    <div className='forecast-wrapper'>
                        <div className='data-title'>5-Day Forecast</div>
                        <Forecast forecast={forecast}/>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default observer(App);
