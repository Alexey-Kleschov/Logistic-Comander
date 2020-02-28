import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "../../../components/operatorPage/HomeScreen";
import ScanTable from "../../../components/scaner/responceComponents/ScanResponceContainer";
import ScannerScreen from '../../../components/scaner/ScannerScreen';
import Service from '../../../components/servicePage/Service';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ScanTable: {
        screen: ScanTable,
    },
    ScannerScreen: {
        screen: ScannerScreen
    },
    Service: {
        screen: Service
    }
});

export default createAppContainer(AppNavigator);
