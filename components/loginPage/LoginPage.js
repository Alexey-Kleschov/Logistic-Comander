import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {Input, Text, Button} from 'react-native-elements'
import {StyleSheet, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        spinner: false,
    };

    handleSubmit = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        const spinner = () => {
            this.setState({spinner: !this.state.spinner});
        };

        spinner();
        this.props.loginUser(user, spinner);
    };

    render() {
        return (
            <View style={styles.mainView}>
                <Spinner
                    visible={this.state.spinner}
                    animation="fade"
                    size="large"
                />
                <Text h2 style={styles.head}> WAREHOUSING</Text>
                <View style={styles.form}>
                    <Input
                        containerStyle={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.label}
                        onChangeText={e => this.setState({email: e})}
                        errorMessage={this.props.errors.email}
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={20}
                                color='white'
                            />
                        }
                    />
                    <Input
                        containerStyle={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.label}
                        secureTextEntry={true}
                        onChangeText={e => this.setState({password: e})}
                        errorMessage={this.props.errors.password}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={20}
                                color='white'
                            />
                        }
                    />
                    <Button
                        containerStyle={styles.button}
                        title="Submit"
                        type="solid"
                        onPress={this.handleSubmit}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#292f45',
    },
    head: {
        marginTop: '25%',
        marginLeft: '10%',
        color: '#f5f5f5'
    },
    headTwo:{
        marginLeft: '10%',
        color: '#f5f5f5'
    },

    form: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: '10%',
        width: '80%',
        marginTop: '25%',
    },
    input: {
        marginTop: '8%',
    },
    inputStyle: {
        marginLeft: '8%',
        color: 'white',
    },
    label: {
        color: '#f5f5f5'
    },
    button: {
        marginTop: '65%'
    },

});

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, {loginUser},)(LoginPage);
