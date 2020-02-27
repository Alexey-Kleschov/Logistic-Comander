import React, { PureComponent } from 'react';
import MapContainer from './MapContainer';
import NoPermitAlert from '../../../common/alerts/ErrAlert';
import * as Location from 'expo-location';
import NavHeader from '../../../common/headers/NavHeader'
import { AsyncStorage } from 'react-native';

class LeadNavigator extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isPermit: null,

        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: <NavHeader title='Navigator' navigation={navigation}/>
    });

    async requestPermissions() {
        const permRes = await Location.requestPermissionsAsync();
        this.setState({ isPermit: permRes.granted });
    }

    async setDriverPath() {
        const pathData = this.props.navigation.state.params;
        
        if(pathData) {
            console.log(1,pathData);
            
            await AsyncStorage.setItem('driverPath', pathData);
        }
    }
    
    componentDidMount() {
        this.requestPermissions();
        this.setDriverPath();
    };

    render() {
        if(this.state.isPermit === true) {
            return <MapContainer />
        } else if (this.state.isPermit === false) {
            return <NoPermitAlert errMsg="You unabled location permissions for this app."/>
        } else {
            return null
        }  
    };
};

export default LeadNavigator;