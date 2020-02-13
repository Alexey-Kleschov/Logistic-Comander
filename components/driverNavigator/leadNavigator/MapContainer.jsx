import React, { useState, useEffect } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { View, Text } from 'react-native';
import {GetLocation} from 'react-native-geolocation-service';

const NavigatorMap = () => {
    const [ gpsData, setGpsData ] = useState();

    useEffect(() => {
        const LOCATION_RECIVE_TIMEOUT = 30000;
        const MAX_LOCATION_RECIVE_TIMEOUT = 30000;
        const options = { 
            // enableHighAccuracy: true, 
            timeout: LOCATION_RECIVE_TIMEOUT, 
            maximumAge: MAX_LOCATION_RECIVE_TIMEOUT 
        }

        GetLocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setGpsData(position)
            },
            (error) => {
                console.log('ERRR');
                console.log(error.code, error.message);
            },
            options
        )
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, []);
    
    if(gpsData) {
        const { latitude, longitude, altitude, speed } = gpsData
        const FORMATED_DRIVR_SPEED = speed * 1000 /3600
        const location = { 
            lat: latitude, 
            lng: longitude 
        };

        return (
            <View>
                <MapNavigator 
                    location={location}
                    zoom={1}
                    mapHeight='45%'
                    speed={FORMATED_DRIVR_SPEED}
                    altitude={altitude}
                />
            </View>
        )
    } else {
        console.log(gpsData);
        
        return <Text>Loading ...</Text>
    }
}

export default NavigatorMap;