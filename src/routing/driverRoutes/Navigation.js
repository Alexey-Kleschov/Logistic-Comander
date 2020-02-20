import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DriverHome from '../../../components/driver/DriverHome';
import DriverOrderList from '../../../components/driver/DriverOrderList';
import LoginPage from '../../../components/loginPage/LoginPage';

const AppNavigator = createStackNavigator({
    DriverHome: {
        screen: DriverHome,
    },
    DriverOrderList: {
        screen: DriverOrderList
    },
    Login: {
        screen: LoginPage,
    },
});

export default createAppContainer(AppNavigator);