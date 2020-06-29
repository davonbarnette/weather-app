import {decorate, action} from 'mobx';
import AppStore from "./Store";

export class AppActions {

    static async getCurrentWeather(lat, lon){
        return await AppStore.OpenWeather.getCurrentWeather(lat, lon);
    }

    static async get5DayForecast(lat, lon){
        return await AppStore.OpenWeather.get5DayForecast(lat, lon);
    }

    static async getCurrentWeatherByCity(){

    }

    static async attemptToGetCurrentLocation(){
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                const {latitude, longitude} = position.coords;
                AppStore.location = {latitude, longitude};
                resolve({latitude, longitude});
            }, () => reject(undefined))
        })
    }

}

decorate(AppActions, {
    getCurrentWeather:action,
    get5DayForecast:action,
})