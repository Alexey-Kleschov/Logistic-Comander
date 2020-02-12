import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DriverHome from '../../../components/driver/DriverHome';

const AppNavigator = createStackNavigator({
    DriverHome: {
        screen: DriverHome,
    }
});

export default createAppContainer(AppNavigator);