import React from 'react';
import { render } from '@testing-library/react';
import CurrentWeather from "./CurrentWeather";

Date.now = jest.fn(() => new Date("2020-05-13T12:33:37.000Z"));

describe('Forecast Component', () => {
    test('Snapshot', () => {
        let props = {
            currentWeather:{
                main: {temp: 80.51},
                name: 'test_city',
                weather:[
                    {icon: '01d', description: 'clear sky'}
                ]
            }
        }

        const {container} = render(<CurrentWeather {...props}/>)
        expect(container.firstChild).toMatchSnapshot();
    })
})