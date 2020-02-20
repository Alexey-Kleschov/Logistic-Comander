import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';

class Head extends Component {   

    render() {
        return (
            <>
                <Header
                    leftComponent={<Icon name='arrow-back' color='#f5f5f5' onPress={() => {
                        if(this.props.navigation.state.routeName === 'DriverHome'){
                            this.props.navigation.navigate('LoginPage');
                            this.props.logoutUser();
                        } else this.props.navigation.goBack()                        
                    }}/> }
                    rightComponent={<Icon name='account-circle' color='#f5f5f5' onPress={() => console.log('Header press')}/>}
                    backgroundColor='#292f45'
                >
                </Header>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser} )(Head);

