import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from "../../../components/companyAdminPage/HomePage";
import WarehouseSearchPage from "../../../components/companyAdminPage/WarehouseSearchPage";
import WarehouseInfoPage from "../../../components/companyAdminPage/WarehouseInfoPage";
import ProductsPage from "../../../components/companyAdminPage/ProductsInfoPage";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    WarehouseSearchPage: {
        screen: WarehouseSearchPage,
    },
    WarehouseInfoPage: {
        screen: WarehouseInfoPage,
    },
    ProductsPage: {
        screen: ProductsPage,
    },
});

export default createAppContainer(AppNavigator);
