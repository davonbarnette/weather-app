import {OpenWeatherHandler} from "./OpenWeatherHandler";

describe('OpenWeatherHandler', () => {
    test('Instantiates correctly', () => {
        let testKey = 'test_api_key';
        let units = 'imperial';

        let OpenWeather = new OpenWeatherHandler(testKey, units);

        expect(OpenWeather.apiKey).toBe(testKey);
        expect(OpenWeather.units).toBe(units);
    });
})


