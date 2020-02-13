import React, {Component} from 'react';
import {Header} from "react-native-elements";
import {Icon} from "react-native-elements";
import OperatorProfile from "../operatorPage/Profile";
import CompanyAdminProfile from "../companyAdminPage/Profile";
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
        console.log(this.props.navigation.goBack)
        return (
            <>
                <Header
                    leftComponent={<Icon name='arrow-back' color='#f5f5f5' onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{text: this.props.title, style: {color: '#fff'}}}
                    rightComponent={<Icon name='account-circle' color='#f5f5f5' onPress={this.handleSwitch}/>}
                    backgroundColor='#292f45'
                >
                    {(this.props.profile && this.props.user.role==='employee')&& <OperatorProfile
                        user={this.props.user}
                        isVisible={this.state.isVisible}
                        onClose={this.handleSwitch}
                        onLogout={this.props.logoutUser}
                    />}
                </Header>
            </>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser},)(Head);

