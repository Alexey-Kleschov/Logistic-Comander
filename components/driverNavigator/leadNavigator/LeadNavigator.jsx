import React, { Component } from 'react';
import { View } from 'react-native';
import MapContainer from './MapContainer';
import * as Location from 'expo-location';

class LeadNavigator extends Component {
    state = {
        isPermit: true
    }

    setPermitionStatus = (isPermit) => {
        this.setState({ isPermit });
    }

    componentDidMount() {
        (async () => {
            const permRes = await Location.requestPermissionsAsync();
            
            if(permRes.scope === 'fine') {
                this.setPermitionStatus(true)
            } else {
                this.setPermitionStatus(false)
            }
        })()
    };

    render() {
        return this.state.isPermit && (
            <View>
                <MapContainer />
            </View>
        )
    }
};

export default LeadNavigator;