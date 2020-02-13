import React, {Component} from 'react';
import {Header} from "react-native-elements";
import {Icon} from "react-native-elements";
import ProfileMenu from "./Profile";

export default class Head extends Component {
    state = {
        isVisible: false
    };

    handleSwitch = () => {
        this.setState({isVisible: !this.state.isVisible})
    };

    render() {
        return (
            <>
                <Header
                    leftComponent={this.props.navigation && (
                        <Icon name='arrow-back' color='#f5f5f5' onPress={() => this.props.navigation.goBack()}/>)}
                    centerComponent={{text: this.props.title, style: {color: '#fff'}}}
                    backgroundColor='#292f45'
                >
                    {this.props.profile && <ProfileMenu
                        user={this.props.auth.user}
                        isVisible={this.state.isVisible}
                        onClose={this.handleSwitch}
                        onLogout={this.props.logoutUser}
                    />}
                </Header>
            </>
        )
    }
}

