import React, { Component } from 'react'
import { View } from 'react-native'
import BlankModal from '../../../common/modals/BlankModal'
import ScanBlank from './ScanBlank'

/*
*    This component represents scan result data
*    about ttn blanks
*/
class ScanResponceContainer extends Component {
    render() {
        return (
            <View>
                <BlankModal 
                    childrenCreator={() => <ScanBlank scanData={this.props.scanResponce}/>}
                    width="90%"
                    height="90%"
                    bgColor="#f5f5f5"
                    closeAction={this.props.scannerResetAction}
                />
            </View>
        )
    }
}

export default ScanResponceContainer
