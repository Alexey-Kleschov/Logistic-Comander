import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DriverHome from '../../../components/driver/DriverHome';
import DriverOrderList from '../../../components/driver/DriverOrderList';
import Navigator from '../../../components/driverNavigator/leadNavigator/LeadNavigator'

const AppNavigator = createStackNavigator({
    DriverHome: {
        screen: DriverHome,
    },
    DriverOrderList: {
        screen: DriverOrderList
    },
    Navigator: {
        screen: Navigator
    }
});

export default createAppContainer(AppNavigator);