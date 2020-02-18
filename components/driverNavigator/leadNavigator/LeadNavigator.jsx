import React, { Component } from 'react';
import { View } from 'react-native';
import MapContainer from './MapContainer';

class LeadNavigator extends Component {
    render() {
        return (
            <View>
                <MapContainer />
            </View>
        )
    }
};

export default LeadNavigator;