import React, { memo } from 'react';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MapNavigator = (props) => {
    const { 
        speed, 
        latitude, 
        longitude,
        distanceTravelled,
        coordinate,
        coords,
    } = props;

    // this.mapRef.animateCamera({center: temp_cordinate,pitch: 2, heading: 20,altitude: 200, zoom: 40},duration)

    return (
        <View>
            <View style={styles.mapContainer}>
                <MapView
                    showsUserLocation
                    tracksViewChanges
                    followsUserLocation={false}
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    showsTraffic
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009,
                    }}
                    style={styles.map}
                >
                    <Polyline 
                        coordinates={coords}
                        strokeWidth={10}
                        strokeColor="#91cfff"
                    />
                    <Marker.Animated
                        coordinate={coordinate}
                    />
                </MapView>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.bubble, styles.button]}>
                    <Text style={styles.bottomBarContent}>
                        Total path: {parseFloat(distanceTravelled).toFixed(2)} km
                    </Text>
                    <Text style={styles.bottomBarContent}>
                        Speed: {speed} km/h
                    </Text>
                </TouchableOpacity>
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
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
      },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    }
});

export default memo(MapNavigator);