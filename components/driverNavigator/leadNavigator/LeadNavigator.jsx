import React, { Component } from 'react';
import { View } from 'react-native';
import MapContainer from './MapContainer';
import * as Location from 'expo-location';

class LeadNavigator extends Component {

    componentDidMount() {
        (async () => {
            const resp = await Location.requestPermissionsAsync();
            if(resp === 'android') {
                console.log(resp);
                
            } else {
                console.log(resp);
            }
        })()
    };

    render() {
        return (
            <View>
                <MapContainer />
            </View>
        )
    }
};

export default LeadNavigator;