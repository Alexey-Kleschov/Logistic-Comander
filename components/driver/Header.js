import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class Head extends Component {

    render() {
        return (
            <>
                <Header
                    leftComponent={<Icon name='arrow-back' color='#f5f5f5' onPress={() => this.props.navigation.goBack()}/> }
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

export default connect(mapStateToProps, null )(Head);

