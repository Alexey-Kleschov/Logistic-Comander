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
        return (
            <>
                <Header
                    leftComponent={<Icon name='arrow-back' color='#f5f5f5' onPress={ () => {
                            if(this.props.navigation.state.routeName === 'Home'){
                                this.props.navigation.navigate('Service');
                                this.props.logoutUser();
                            } else {
                                this.props.navigation.goBack();
                            }
                        }
                    }/>}
                    centerComponent={{text: this.props.title, style: {color: '#fff'}}}
                    rightComponent={<Icon name='account-circle' color='#f5f5f5' onPress={this.handleSwitch}/>}
                    backgroundColor='#292f45'
                >
                </Header>
                <ProfileMenu
                    user={this.props.auth.user}
                    isVisible={this.state.isVisible}
                    onClose={this.handleSwitch}
                    onLogout={this.props.logoutUser}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser},)(Head);

