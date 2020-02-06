import React, {Component} from 'react';
import {Avatar, Text} from 'react-native-elements';
import Header from "./Header";
import {StyleSheet, View} from "react-native";

class HomeScreen extends Component {

    static navigationOptions = {
        header:()=><Header
            title='HOME PAGE'
        />
    };

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.circlesContainer}>
                    <View style={styles.centerContainer}>
                        <Avatar
                            icon={{name: 'camera-retro', type: 'font-awesome',color:'#f5f5f5'}}
                            overlayContainerStyle={{backgroundColor: '#292f45'}}
                            size="xlarge"
                            rounded
                            onPress={() => this.props.navigation.navigate('WarehouseSearchPage')}
                            activeOpacity={0.7}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
    },
    circlesContainer: {
        flex: 1,
        flexWrap:'wrap',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:'10%',
        width:'80%',
        marginLeft:'10%',
    },
    leftRightContainer:{
        width:'100%',
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    centerContainer:{
        width:'100%',
        marginTop: '15%',
        flexDirection: 'row',
        justifyContent:'center',
    },
    title:{
        fontSize:20
    }

});

export default HomeScreen
