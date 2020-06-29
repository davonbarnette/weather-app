import React, {useEffect, useState} from 'react';
import {AreaChart} from 'react-chartkick';
import ReactMoment from 'react-moment';
import moment from 'moment';
import cx from 'classnames';
import 'chart.js';

import './styles.scss';

const Forecast = (props) => {
    const { list } = props.forecast;

    // We can assume the selectedDay is the first day on the list.
    let startingDay = getISODate(getLocalDateFromDT(list[0].dt), true);
    const [selectedDay, setSelectedDay] = useState(startingDay);
    const [forecastByDay, setForecastByDay] = useState(undefined);

    useEffect(()=> {

        // Upon updating the forecast list, we make a key:value map of the days keyed to the list. This way, we won't
        // have to iterate over the forecast list every time someone clicks a different day.
        let newForecastByDay = {};
        props.forecast.list.forEach((threeHourForecast) => {
            let date = getISODate(getLocalDateFromDT(threeHourForecast.dt), true);
            if (!newForecastByDay[date]) newForecastByDay[date] = {
                list: [],
            };
            newForecastByDay[date].list.push(threeHourForecast);
            if (!newForecastByDay[date].minTemp || threeHourForecast.main.temp < newForecastByDay[date].minTemp){
                newForecastByDay[date].minTemp = threeHourForecast.main.temp;
            }
            if (!newForecastByDay[date].maxTemp || threeHourForecast.main.temp > newForecastByDay[date].maxTemp){
                newForecastByDay[date].maxTemp = threeHourForecast.main.temp;
            }
        })
        setForecastByDay(newForecastByDay);
    }, [props.forecast])

    function getAreaChartData(){
        if (!forecastByDay) return undefined;
        let data = {};
        let list = forecastByDay[selectedDay].list;
        list.forEach(listItem => {
            data[getLocalDateFromDT(listItem.dt).format('h:mm A')] = listItem.main.temp;
        });
        return data;
    }

    function getISODate(date, withoutTime){
        let iso = date.toISOString();
        if (withoutTime) return iso.split('T')[0];
        else return iso;
    }

    function getLocalDateFromDT(dt){
        return moment((dt) * 1000);
    }

    function onDateClick(selectedDay){
        setSelectedDay(selectedDay);
    }

    let libraryConfiguration = {
        scales: {
            gridLines: {
                display:false,
            }
        }
    }

    return (
        <section className='forecast'>
            <div className='chart'>
                <AreaChart library={libraryConfiguration} data={getAreaChartData()} width='100%'/>
            </div>
            <div className='days'>
                {forecastByDay && Object.keys(forecastByDay).map(key => {
                    let day = forecastByDay[key];
                    let firstInterval = day.list[0]
                    if (firstInterval){
                        let date = getLocalDateFromDT(firstInterval.dt)
                        let selected = selectedDay === key;
                        return (
                            <div key={key} className={cx('single-date', {selected})} onClick={()=>onDateClick(key)}>
                                <ReactMoment local date={date} format={'ddd'}/>
                                <div className='temps'>
                                    <div className='min-temp'>{day.minTemp.toFixed(0)}&#8457;</div>
                                    <div className='max-temp'>{day.maxTemp.toFixed(0)}&#8457;</div>
                                </div>
                            </div>
                        )
                    }
                    else return null;
                })}
            </div>
        </section>
    )
}

export default Forecast;