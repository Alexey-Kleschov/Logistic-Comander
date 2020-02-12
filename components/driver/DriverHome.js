import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class DriverHome extends Component {
    render() {
        return (
            <View >
                <Text>DriverHome</Text>
                <Button title='Navigator' onPress={ () => console.log('Navigator pressed') }></Button>
                <Button title='Order List' onPress={ () => console.log('Order list pressed') }></Button>
            </View>
        );
    }
}
export default DriverHome;
