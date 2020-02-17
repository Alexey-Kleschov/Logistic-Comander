import React from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const LATT_DELTA = 0.0922;
const LONG_DELTA = LATT_DELTA * (width / height);

const MapNavigator = ({ gpsData, leadCoordinates }) => {

    const latitude = parseFloat(gpsData.coords.latitude);
    const longitude = parseFloat(gpsData.coords.longitude);
    const altitude = parseFloat(gpsData.coords.altitude);
    const speed = parseFloat(gpsData.coords.speed) * 1000 / 3600;

    return (
        <View>
            <View style={styles.mapContainer}>
                <MapView
                    showsUserLocation
                    followsUserLocation
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: LATT_DELTA,
                        longitudeDelta: LONG_DELTA,
                    }}
                    style={styles.map}
                >
                    <Polyline
                        coordinates={leadCoordinates}
                        strokeWidth={5}
                    />
                </MapView>
            </View>
            <View>
                <View>
                    <Text>latitude: {latitude}</Text>
                </View>
                <View>
                    <Text>longitude: {longitude}</Text>
                </View>
                <View>
                    <Text>spees: {speed}km/h</Text>
                </View>
                <View>
                    <Text>altitude: {altitude}m</Text>
                </View>
                <View>
                    <Text>requests: {moveCounter}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapNavigator;