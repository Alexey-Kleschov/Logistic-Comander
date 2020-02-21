import React, { Component } from 'react';
import { View } from 'react-native';
import MapContainer from './MapContainer';
import * as Location from 'expo-location';

class LeadNavigator extends Component {

    componentDidMount() {
        console.log('NAV_PROPS_COORDS',this.props.navigation.state.params);
        
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