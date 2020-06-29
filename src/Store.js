import {decorate, observable} from 'mobx';
import {OpenWeatherHandler} from "./utils/OpenWeatherHandler";

export class AppStoreClass {
    OpenWeather;

    constructor() {
        this.OpenWeather = new OpenWeatherHandler(process.env.REACT_APP_OPEN_WEATHER_API_KEY);
    }

    init(){

    }
}

decorate(AppStoreClass, {
    OpenWeather: observable,
})

const AppStore = new AppStoreClass();
export default AppStore;