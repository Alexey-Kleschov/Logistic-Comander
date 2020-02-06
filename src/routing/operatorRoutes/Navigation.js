import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "../../../components/operatorPage/HomeScreen";
import Scan from "../../../components/operatorPage/Scanner";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Scan: {
        screen: Scan,
    },
});

export default createAppContainer(AppNavigator);
