import React, { Component } from 'react'
import { View } from 'react-native'
import BlankModal from '../../../common/modals/BlankModal'
import ScanBlank from './ScanBlank'

/*
*    This component represents scan result data
*    about ttn blanks
*/
class ScanResponceContainer extends Component {
    state = {
        isVisible: true,
    };

    setModalVisible(visible) {
        this.setState({isVisible: visible});
    }

    render() {
        return (
            <View>
                <BlankModal children={<ScanBlank/>}/>
            </View>
        )
    }
}

export default ScanResponceContainer
