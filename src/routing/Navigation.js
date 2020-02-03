import React, {Component} from 'react';
import Scanner from '../../screens/ScannerScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppNavigator = createStackNavigator({
    Home: {
        screen: Scanner,
    },
});

export default createAppContainer(AppNavigator);
