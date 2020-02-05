import React, { useState } from 'react'
import { StyleSheet, TouchableHighlight, View } from 'react-native'
import { Overlay, Icon } from 'react-native-elements'

// Create a simple blank modal 
const BlankModal = ({ children, width, height }) => {
    const [ isVisible, setModalVisible ] = useState(true)

    return (
        <Overlay
            isVisible={isVisible}
            width={width}
            height={height}
        >
            <TouchableHighlight onPress={() => setModalVisible(!isVisible)}>
                <View style={styles.closeWrapper}>
                    <Icon name="close"/>
                </View>
            </TouchableHighlight>
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    closeWrapper: {
        flex: 1, 
        flexDirection: 'row',
        marginTop: 10
    },
});

export default BlankModal