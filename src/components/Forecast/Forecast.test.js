import React from 'react';
import Forecast from "./Forecast";
import { render } from '@testing-library/react';

describe('Forecast Component', () => {
    test('Snapshot', () => {
        let props = {
            forecast:{
                city: {timezone: -14400},
                list: [
                    {dt: 1593442800, dt_text: "2020-06-29 15:00:00", main: {temp: 80.51}}
                ]
            }
        }
        const {container} = render(<Forecast {...props}/>)
        expect(container.firstChild).toMatchSnapshot();

    })
})