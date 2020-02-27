import React, { PureComponent } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { Text } from 'react-native';
import { AnimatedRegion } from 'react-native-maps'
import haversine from 'haversine';
import polyline from '@mapbox/polyline';

const options = { 
    enableHighAccuracy: true, 
    timeout: 20000, 
    maximumAge: 10000,
    distanceFilter: 10
};

/*
    GPS Navigator container component
*/
class MapContainer extends PureComponent {
    
    constructor(props) {
        super(props);
    
        this.state = {
            gpsData: {},
            latitude: null,
            longitude: null,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            }),
            coords: [],
            coordsToPath: [],
            initialGpsData: '',
            lastSpeed: 0,
        };
    }
    
    calcDistance = newLatLng => haversine(this.state.prevLatLng, newLatLng) || 0;
    
    geoResolve = (data) => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude, speed } = data.coords;
        const newCoordinate = { latitude, longitude };

        this.setState({
            gpsData: data,
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate,
            lastSpeed: (speed > 0) ? speed : this.state.lastSpeed
        });
    }

    initial_geoResolve = (data) => {
        const { latitude, longitude } = data.coords;
        const initialGpsData = `${latitude}, ${longitude}`;
        this.setState({initialGpsData});
    }

    geoReject = (err) => {
        console.log(err.code, err.message);
    }

    async fetchRoad(start, finish) {
        const APIKEY = 'AIzaSyCOE23d0Sf1mfSLT43SOlLpLRzpBhhSH7A';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${finish}&key=${APIKEY}`;

        try {
            const resp = await fetch(url);
            const respJson = await resp.json();

            const coords = polyline
                .decode(respJson.routes[0].overview_polyline.points)
                .map(point => ({ latitude: point[0], longitude: point[1] }));
            
            return coords;
            
        } catch (e) {
            console.warn(e);
        }
    }

    componentDidMount() {
        const { start, finish } = this.props.driverLeadCoords;

        // Get driver path
        this.fetchRoad(start, finish)
        .then(driverLeadCoords => this.setState({coords: driverLeadCoords}));

        // Get current driver location
        navigator.geolocation.getCurrentPosition(this.initial_geoResolve, this.geoReject, options);

        // Watch driver's movement
        this.watchId = navigator.geolocation.watchPosition(this.geoResolve, this.geoReject, options);
    };

    componentDidUpdate() {
        // Get lead from current driver location to driver path
        const { initialGpsData, coordsToPath } = this.state;
        const { driverLeadCoords } = this.props;
        if(initialGpsData && coordsToPath.length === 0) {
            this.fetchRoad(initialGpsData, driverLeadCoords.start)
            .then(leadToMainPath => this.setState({coordsToPath: leadToMainPath}));
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    
    render() {
        const { latitude, longitude, routeCoordinates, distanceTravelled, coordinate, coords, coordsToPath } = this.state;
        const speed = Math.round(this.state.lastSpeed);
        const distanceTravelledParsed = parseFloat(distanceTravelled).toFixed(2);
        
        const mapProps = {
            speed, 
            latitude, 
            longitude, 
            routeCoordinates,
            coordinate,
            coords,
            coordsToPath,
            distanceTravelled: distanceTravelledParsed,
        };

        if(this.state.gpsData?.coords) {
            return <MapNavigator {...mapProps} />
        } else {
            return <Text>Loading ...</Text>
        };
    }
};

export default MapContainer;