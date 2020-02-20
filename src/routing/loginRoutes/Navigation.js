import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ServiceScreen from "../../../components/servicePage/Service";
import LoginPage from "../../../components/loginPage/LoginPage";

const LoginNavigator = createStackNavigator({
    Service: {
        screen: ServiceScreen,
    },
    Login: {
        screen: LoginPage,
    },
});

export default createAppContainer(LoginNavigator);
