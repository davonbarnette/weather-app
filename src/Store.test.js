import {AppStoreClass} from "./Store";

describe('AppStore', () => {
    test('Instantiates OpenWeather Class correctly', () => {
        let store = new AppStoreClass();
        let testKey = 'test_api_key';
        store.OpenWeather.setApiKey(testKey);
        expect(store.OpenWeather.apiKey).toBe(testKey);
    });
})


