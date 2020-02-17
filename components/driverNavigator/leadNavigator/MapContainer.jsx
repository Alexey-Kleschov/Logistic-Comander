import React, { useState, useEffect } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { View } from 'react-native';

/*
    GPS-Navigator component
*/
const MapContainer = () => {
    const [ gpsData, setGpsData ] = useState();
    const [ moveCounter, setmoveCounter ] = useState(0);
    const [ leadCoordinates, addLeadCoordinate ] = useState([]);

    const geoResolve = (data) => {
        setGpsData(data);
        setmoveCounter(moveCounter + 1);
        const leadDot = {
            latitude: parseFloat(data.coords.latitude),
            longitude: parseFloat(data.coords.longitude),
        }
        addLeadCoordinate([...leadCoordinates, leadDot]);
    }

    const geoReject = (err) => {
        console.log(err.code, err.message);
    }

    useEffect(() => {
        const options = { 
            enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 1000,
            distanceFilter: 10
        }
        const watchId = navigator.geolocation.watchPosition(geoResolve, geoReject, options);

        return () => {
            navigator.geolocation.clearWatch(watchId)
        }
    }, []);
    
    if(gpsData?.coords) {
        return (
            <View>
                <MapNavigator 
                    gpsData={gpsData}
                    leadCoordinates={leadCoordinates}
                />
            </View>
        )
    } else {
        return <Text>Loading ...</Text>
    }
};

export default MapContainer;