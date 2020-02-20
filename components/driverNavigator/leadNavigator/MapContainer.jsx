import React, { PureComponent } from 'react';
import MapNavigator from '../../../common/maps/MapNavigator';
import { Platform, Text } from 'react-native';
import { AnimatedRegion } from 'react-native-maps'
import haversine from 'haversine';
// import getDirections from 'react-native-google-maps-directions'

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

function decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


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
        const { start, finish } = this.state.driverRouteCoordsData.waybill
        const options = { 
            enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 1000,
            distanceFilter: 10
        };
        
        this.watchId = navigator.geolocation.watchPosition(this.geoResolve, this.geoReject, options);

        const mode = 'driving'; // 'walking';
        const origin = '37.3822,-122.01';
        const destination = '37.2297,-121.786';
        const APIKEY = 'AIzaSyCCqDJQC4lVsw4pDBHE9D7NbPnlLtqO4yE';
        // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}`;

        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                
                if (responseJson.routes.length) {
                    this.setState({
                        coords: decode(responseJson.routes[0].overview_polyline.points)
                    });
                }
            }).catch(e => {console.warn(e)});
        // this.setState({
        //     driverRouteCoordsData: [
        //         {
        //             "latitude": start.latitude,
        //             "longitude": start.longitude,
        //         },
        //         {
        //             "latitude": finish.latitude,
        //             "longitude": finish.longitude,
        //         }
        //     ]
        // })
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