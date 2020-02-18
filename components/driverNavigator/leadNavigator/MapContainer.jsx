import React, { PureComponent } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { Platform, Text } from 'react-native';
import { AnimatedRegion } from 'react-native-maps'
import haversine from "haversine";

// For test
const LATITUDE = 52.4339;
const LONGITUDE = 31.0089;

const LATT_DELTA = 0.009;
const LONG_DELTA = 0.009;

/*
    GPS Navigator container component
*/
class MapContainer extends PureComponent {

    constructor(props) {
        super(props);
    
        this.state = {
            gpsData: {},
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            }),
        };
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    geoResolve = (data) => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = data.coords;

        const newCoordinate = { latitude, longitude };

        if (Platform.OS === "android") {
            this.marker && this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
        } else {
            coordinate.timing(newCoordinate).start();
        }

        this.setState({
            gpsData: data,
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate,
        });
    }

    geoReject = (err) => {
        console.log(err.code, err.message);
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATT_DELTA,
        longitudeDelta: LONG_DELTA
      });

    componentDidMount() {
        const options = { 
            enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 1000,
            distanceFilter: 10
        };
        this.watchId = navigator.geolocation.watchPosition(this.geoResolve, this.geoReject, options);
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    changeMarker(mark) {
        this.marker = mark;
    }
    
    render() {
        const mapProps = {
            speed: this.state.gpsData.state, 
            latitude: this.state.latitude, 
            longitude: this.state.longitude, 
            routeCoordinates: this.state.routeCoordinates,
            distanceTravelled: this.state.distanceTravelled,
            coordinate: this.state.coordinate,
            changeMarker: this.changeMarker,
        }

        if(this.state.gpsData?.coords) {
            return <MapNavigator {...mapProps} />
        } else {
            return <Text>Loading ...</Text>
        }
    }
};

export default MapContainer;