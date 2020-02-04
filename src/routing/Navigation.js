import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "../../components/HomeScreen";
import ScanTable from "../../components/scaner/responceComponents/ScanResponceContainer";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ScanTable: {
        screen: ScanTable,
    },
});

export default createAppContainer(AppNavigator);
