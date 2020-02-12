import React, {Component} from 'react';
import {connect} from 'react-redux';
import OperatorNavigation from './operatorRoutes/Navigation';
import CompanyAdminNavigation from './companyAdminRoutes/Navigation';
import LoginNavigation from './loginRoutes/Navigation';
import DriverNavigation from './driverRoutes/Navigation';

class SecurityRoute extends Component {

    render() {
        if (this.props.auth.isAuthenticated) {
            switch (this.props.auth.user.role) {
                case 'employee':
                    return (<OperatorNavigation/>);
                case 'companyAdmin':
                    return (<CompanyAdminNavigation/>);
                case 'driver':
                    return (<DriverNavigation/>);
            }
        } else return <LoginNavigation/>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SecurityRoute);
