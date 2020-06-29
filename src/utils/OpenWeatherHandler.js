import axios from 'axios';

export const OpenWeatherEndpoints = {
    CURRENT_WEATHER:'weather',
    FIVE_DAY_FORECAST:'forecast',
}

export class OpenWeatherHandler {
    apiKey;
    baseApiUrl = 'https://api.openweathermap.org/data/2.5';
    units = 'imperial'

    constructor(apiKey, units) {
        this.setApiKey(apiKey);
        if (units) this.units = units;
    }

    setApiKey(apiKey){
        this.apiKey = apiKey;
    }

    buildEndpointURL(openWeatherEndpoint){
        return `${this.baseApiUrl}/${openWeatherEndpoint}`;
    }

    static getIconUrl(iconName){
        return `https://openweathermap.org/img/w/${iconName}.png`
    }

    async getWeatherDataByGeoLocation(lat, lon, endpoint){
        if (!this.apiKey) return undefined;
        let url = this.buildEndpointURL(endpoint);
        let params = {
            lat, lon, appid: this.apiKey, units: this.units,
        }
        try{
            let res = await axios.get(url, { params })
            return res.data;
        } catch (e) {
            console.log('Could not retrieve weather data by geolocation', e.message);
            return null;
        }
    }

    async getCurrentWeather(lat, lon){
        return await this.getWeatherDataByGeoLocation(lat, lon, OpenWeatherEndpoints.CURRENT_WEATHER);
    }

    async get5DayForecast(lat, lon){
        return await this.getWeatherDataByGeoLocation(lat, lon, OpenWeatherEndpoints.FIVE_DAY_FORECAST);
    }


}