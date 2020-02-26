import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DriverHome from '../../../components/driver/DriverHome';
import DriverOrderList from '../../../components/driver/DriverOrderList';
import Navigator from '../../../components/driverNavigator/leadNavigator/LeadNavigator'
import LoginPage from '../../../components/loginPage/LoginPage';
import Service from '../../../components/servicePage/Service';

const AppNavigator = createStackNavigator({
    DriverHome: {
        screen: DriverHome,
    },
    DriverOrderList: {
        screen: DriverOrderList
    },
    Navigator: {
        screen: Navigator
    },
    Login: {
        screen: LoginPage,
    },
    Service: {
        screen: Service
    }
});

export default createAppContainer(AppNavigator);