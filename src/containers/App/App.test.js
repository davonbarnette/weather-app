import React from 'react';
import { render } from '@testing-library/react';
import 'mobx-react-lite/batchingForReactDom'
import App from './App';

describe('App Component Renders', () => {
  test('Snapshot matches', () => {
    const {container} = render(<App/>);
    expect(container.firstChild).toMatchSnapshot();
  });
})
