import React, {Component} from 'react'
import {Modal, TouchableHighlight, View, Alert} from 'react-native'
import {Overlay, Text} from 'react-native-elements'
import ScanBlank from './ScanBlank'

/*
*    This component represents scan result data
*    about ttn blanks
*/
class ScanResponceContainer extends Component {
    state = {
        modalVisible: true,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <ScanBlank/>
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableHighlight>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default ScanResponceContainer
