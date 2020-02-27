import React, { PureComponent } from 'react';
import MapContainer from './MapContainer';
import NoPermitAlert from '../../../common/alerts/ErrAlert';
import * as Location from 'expo-location';
import NavHeader from '../../../common/headers/NavHeader'

class LeadNavigator extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isPermit: null
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: <NavHeader title='Navigator' navigation={navigation}/>
    });

    async requestPermissions() {
        const permRes = await Location.requestPermissionsAsync();
        this.setState({ isPermit: permRes.granted });
    }
    
    componentDidMount() {
        this.requestPermissions()
    };

    render() {
        if(this.state.isPermit === true) {
            return <MapContainer driverLeadCoords={this.props.navigation.state.params}/>
        } else if (this.state.isPermit === false) {
            return <NoPermitAlert errMsg="You unabled location permissions for this app."/>
        } else {
            return null
        }  
    };
};

export default LeadNavigator;