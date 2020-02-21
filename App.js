import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import store from './store';
import Routing from './src/routing/SecurityRoute';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
console.disableYellowBox = true;

async function loadApplication() {
    await Font.loadAsync({
        'Roboto_medium': require('./assets/fonts/3964.ttf')
    })
}

export default function App() {
    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadApplication}
                onError={err => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        )
    }

    return (
        <Provider store={store}>
            <Routing/>
        </Provider>
    )
}


