import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';

class NavHeader extends Component {   
    navigate = () => {
        if(this.props.navigation.state.routeName === 'DriverHome'){
            this.props.navigation.navigate('LoginPage');
            this.props.logoutUser();
        } else {
            this.props.navigation.goBack();
        } 
    }
    
    render() {
        const navIcon = <Icon name='arrow-back' color='#f5f5f5' onPress={() => this.navigate()}/>;
        const backgroundColor = '#292f45';
        const title = this.props.title 
            ? {text: this.props.title, style: {color: '#fff', fontSize: 22}}
            : ''
        return (
            <Header
                leftComponent={navIcon}
                backgroundColor={backgroundColor}
                centerComponent={title}
            />
        )
    }
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser} )(NavHeader);

