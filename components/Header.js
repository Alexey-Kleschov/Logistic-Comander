import React from 'react';
import {Header} from "react-native-elements";

export default ({title}) => {
    console.log(this)
    return <Header
        leftComponent={{icon: 'arrow-back', color: '#fff'}}
        centerComponent={{text: title, style: {color: '#fff'}}}
        rightComponent={{icon: 'account-circle', color: '#fff'}}
        backgroundColor='#292f45'
    />
};
