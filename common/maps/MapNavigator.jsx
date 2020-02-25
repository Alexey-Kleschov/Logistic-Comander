import React, { memo } from 'react';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import DataBarItem from './DataBarItem';

const MapNavigator = (props) => {
    const { 
        speed, 
        latitude, 
        longitude,
        distanceTravelled,
        coordinate,
        coords,
    } = props;

    return (
        <View style={styles.mapEnv}>
            {/* Map */}
            <View style={styles.mapContainer}>
                <MapView
                    showsUserLocation
                    tracksViewChanges
                    followsUserLocation
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    showsIndoors
                    showsBuildings
                    zoomEnabled
                    showsCompass
                    showsMyLocationButton
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    style={styles.map}
                >
                    <Polyline 
                        coordinates={coords}
                        strokeWidth={5}
                        strokeColor="lightblue"
                        style={{zIndex: 999}}
                    />
                    <Marker.Animated
                        coordinate={coordinate}
                    />
                </MapView>
            </View>
            {/* Data bar  */}
            <View style={styles.bottomDataBar__container}>
                <DataBarItem title='Distance' value={distanceTravelled} unit='km' />
                <DataBarItem title={'Speed'} value={speed} unit='km/h' />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mapEnv: {
        height: '100%',
        width: '100%',
        ...StyleSheet.absoluteFillObject
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bottomDataBar__container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: "row",
        backgroundColor: '#292f45',
        borderTopWidth: 2,
        borderTopColor: '#202536',
        paddingHorizontal: 60,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
});

export default memo(MapNavigator);