import React, { PureComponent } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { Platform, Text } from 'react-native';
import { AnimatedRegion } from 'react-native-maps'
import haversine from 'haversine';
import polyline from '@mapbox/polyline';

// For test
const LATITUDE = 37.3822;
const LONGITUDE = -122.01;

const LATT_DELTA = 0.001;
const LONG_DELTA = 0.001;

/*
    GPS Navigator container component
*/
const testData = {
    waybill: {
        arrivedPointId: 871,
        date: '2034-02-11T21:00:00.000Z',
        departurePointId: 872,
        driverId: 195,
        finish: {
          id: 871,
          latitude: 37.2297,
          longitude: -121.786,
          name: 'Минск, Беларусь',
        },
        id: 469,
        start: {
          id: 872,
          latitude: 37.3822,
          longitude: -122.01,
          name: 'Гомель, Беларусь',
        },
        vehicleId: 102,
    },
    waybillId: 469,
}

class MapContainer extends PureComponent {

    constructor(props) {
        super(props);
    
        this.state = {
            gpsData: {},
            latitude: LATITUDE,
            longitude: LONGITUDE,
            driverRouteCoordsData: testData, 
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            }),
            coords: []
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

    async fetchRoute() {
        // For test
        const origin = '37.3822,-122.01';
        const destination = '37.2297,-121.786';
        const APIKEY = 'AIzaSyCOE23d0Sf1mfSLT43SOlLpLRzpBhhSH7A';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}`;

        try {
            const resp = await fetch(url);
            const respJson = await resp.json();
            let points = polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))
            this.setState({ coords })
        } catch (e) {
            console.warn(e);
        }
    }

    componentDidMount() {
        this.fetchRoute()
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
        const speed = this.state.gpsData?.coords && Math.round(this.state.gpsData.coords.speed)
        const mapProps = {
            speed: speed || 0, 
            latitude: this.state.latitude, 
            longitude: this.state.longitude, 
            routeCoordinates: this.state.routeCoordinates,
            distanceTravelled: this.state.distanceTravelled,
            coordinate: this.state.coordinate,
            driverRouteCoordsData: this.state.driverRouteCoordsData,
            changeMarker: this.changeMarker,
            coords: this.state.coords
        }

        if(this.state.gpsData?.coords) {
            return <MapNavigator {...mapProps} />
        } else {
            return <Text>Loading ...</Text>
        }
    }
};

export default MapContainer;