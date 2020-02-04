import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import LoginPage from '../../components/LoginPage';

class SecurityRoute extends Component {
    render() {
        return (
            <>
                {!this.props.auth.isAuthenticated ? <Navigation/> : <LoginPage/>}
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SecurityRoute);
