import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import Routing from './src/routing/SecurityRoute';
import * as Font from 'expo-font';

export default function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>
  )
};

