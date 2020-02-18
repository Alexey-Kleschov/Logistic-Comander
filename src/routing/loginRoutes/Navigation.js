import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ServiceScreen from "../../../components/servicePage/Service";
import LoginScreen from "../../../components/loginPage/LoginPage";

const LoginNavigator = createStackNavigator({
    Service: {
        screen: ServiceScreen,
    },
    Login: {
        screen: LoginScreen,
    },
});

export default createAppContainer(LoginNavigator);
