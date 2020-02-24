import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header';

class DriverHome extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: <Header title='Driver' navigation={navigation}/>
    });

    render() {
        return (
            <View style={styles.driverHome__container}>
                <View style={styles.design__square} />
                <Text style={styles.txt}>DRIVER HOMEPAGE</Text>
                <View style={styles.buttonGroup__container}>
                    <View style={styles.buttonGroup}>
                        <Button title='Navigator' color="#292f45" onPress={() => this.props.navigation.navigate('Navigator')}></Button>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button title='Order List' color="#292f45" onPress={() => this.props.navigation.navigate('DriverOrderList')}></Button>
                    </View>
                </View>
            </View>
        );
    }
}

export default DriverHome; 

const styles = StyleSheet.create({
    driverHome__container: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        height: '105%',
    },
    buttonGroup__container: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonGroup: {
        paddingVertical: 20,
        width: '50%'
    },
    design__square: {
        position: 'absolute',
        width: 130,
        height: '100%',
        backgroundColor: 'lightgray',
        borderRightWidth: 65,
        borderRightColor: '#c7c7c7'
    },
    txt: {
        marginTop: 75,
        padding: 25,
        fontWeight: '700',
        color: '#292f45',
        fontSize: 30,
        backgroundColor: 'whitesmoke',
    }
});
