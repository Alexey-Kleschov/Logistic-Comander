import React from 'react';
import { View, Text } from 'react-native';
import ScanerDataModal from './modal/ScanerDataModal';

interface Props {};
interface State {};

class ScanerScrean extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    } 

    render() {
        return (
            <View>
                {/* <Scaner /> */}
                <ScanerDataModal />
            </View>
        )
    }
}

export default ScanerScrean;



