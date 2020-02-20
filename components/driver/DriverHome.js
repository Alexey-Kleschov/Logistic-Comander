import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header';

class DriverHome extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:<Header title='Driver' navigation={navigation} />
    });

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>Driver Homepage</Text>
                <View style={styles.btns}>
                    <Button  title='Navigator' onPress={ () => console.log('Navigator pressed') }></Button>
                </View>
                <View style={styles.btns}>
                    <Button  title='Order List' onPress={() => this.props.navigation.navigate('DriverOrderList')}></Button>
                </View>
            </View>
        );
    }
}
export default DriverHome;

const styles = StyleSheet.create({
    btns: {
        paddingVertical: 10,
        width: '80%'
    },
    container: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#0f4ade',
        height: '100%'
    },
    txt: {
        fontWeight: '700',
        color: 'white',
        fontSize: 30        
    }
});
