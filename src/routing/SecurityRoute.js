import React, {Component} from 'react';
import {connect} from 'react-redux';
import { AsyncStorage } from 'react-native';
import OperatorNavigation from './operatorRoutes/Navigation';
import CompanyAdminNavigation from './companyAdminRoutes/Navigation';
import LoginNavigation from './loginRoutes/Navigation';
import DriverNavigation from './driverRoutes/Navigation';

class SecurityRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: '' 
        };  
        this.componentDidMount = this.componentDidMount.bind(this);
    };    

    componentDidMount() {
        (async () => {
            const userRole = await AsyncStorage.getItem('role');
            this.setState({ userRole });
        })();
    }

    render() { 

        let routerKey;

        if(this.props.auth.isAuthenticated){
            routerKey = this.props.auth.user.role;
        } else routerKey = this.state.userRole;                            

        switch (routerKey) {
            case 'employee':
                return (<OperatorNavigation/>); 
            case 'companyAdmin':
                return (<CompanyAdminNavigation/>);
            case 'driver':
                return (<DriverNavigation/>);
            default: return (<LoginNavigation/>);  
        };
              
    };
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SecurityRoute);