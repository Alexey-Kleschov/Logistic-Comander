import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';

// Create a simple blank modal 
const BlankModal = ({ children, width, height, bgColor }) => {
    const [ isVisible, setModalVisible ] = useState(true);

    return (
        <Overlay
            isVisible={isVisible}
            width={width}
            height={height}
            overlayBackgroundColor={bgColor}
        >
            <TouchableHighlight onPress={() => setModalVisible(!isVisible)}>
                <View style={styles.closeWrapper}>
                    <Icon style={styles.close} name="close"/>
                </View>
            </TouchableHighlight>
            {children}
        </Overlay>
    )
};

const styles = StyleSheet.create({
    closeWrapper: {
        flex: 1, 
        alignItems: 'flex-end',
        marginTop: 10,
    },
    close: {
        zIndex: 99,
    }
});

export default BlankModal;