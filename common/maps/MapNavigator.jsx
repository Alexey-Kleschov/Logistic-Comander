import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';

const MapNavigator = ({ location, google, zoom=5, mapHeight='50%', speed, altitude }) => {
    return (
        <View>
            <View>
                <Map
                    google={google}
                    zoom={zoom}
                    initialCenter={location}
                    style={{
                        height:`${mapHeight}px`, 
                        border:'#3e43a1 solid 1px', 
                        marginBottom:'5%',
                    }}
                >
                    <Marker
                        name="driverRealtimePosition"
                        position={{
                            lat: location.lat,
                            lng: location.lng,
                        }}
                    />
                </Map>
            </View>
            {speed && (
                <View>
                    <Text>{ speed } km/h</Text>
                </View>
            )}
            {altitude && (
                <View>
                    <Text>{ altitude } m</Text>
                </View>
            )}
        </View>
    )
}

MapNavigator.propTypes = {
    GPS: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired,
    zoom: PropTypes.number,
    mapHeight: PropTypes.string,
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE',
    libraries: ['places'],
})(MapNavigator);