import React, {Component} from 'react';
import {Header} from "react-native-elements";
import {Icon} from "react-native-elements";
import ProfileMenu from "./Profile";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authAction";

class Head extends Component {
    state = {
        isVisible: false
    };

    handleSwitch = () => {
        this.setState({isVisible: !this.state.isVisible})
    };

    render() {
        return <Header
            leftComponent={<Icon name='arrow-back' color='#f5f5f5'/>}
            centerComponent={{text: this.props.title, style: {color: '#fff'}}}
            rightComponent={<Icon name='account-circle' color='#f5f5f5' onPress={this.handleSwitch}/>}
            backgroundColor='#292f45'
        >
            <ProfileMenu
                user={this.props.auth.user}
                isVisible={this.state.isVisible}
                onClose={this.handleSwitch}
                onLogout={this.props.logoutUser}
            />
        </Header>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser},)(Head);

