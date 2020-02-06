import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import PropTypes from 'prop-types'

/*
*   This component creates a modal window
*   @param {function} childrenCreator - return JSX content of modal window
*   @param {string} width - width of modal window
*   @param {string} height - height of modal window
*   @param {string} bgColor - overlay background color of modal window
*   @param {function} closeAction - some action what you will call on modal close
*   @return {JSX} Modal component
*
*/
const BlankModal = ({ childrenCreator, width='80%', height='90%', bgColor, closeAction }) => {
    const [ isVisible, setModalVisible ] = useState(true);

    return (
        <Overlay
            isVisible={isVisible}
            width={width}
            height={height}
            overlayBackgroundColor={bgColor}
        >
            <View style={styles.modal}>
                <TouchableHighlight onPress={() => {
                    closeAction && closeAction()
                    setModalVisible(!isVisible)
                }}>
                    <View style={styles.closeWrapper}>
                        <Icon style={styles.close} name="close"/>
                    </View>
                </TouchableHighlight>
                {childrenCreator()}
            </View>
        </Overlay>
    )
};

const styles = StyleSheet.create({
    modal: {
        paddingBottom: 45
    },
    closeWrapper: {
        flex: 1, 
        alignItems: 'flex-end',
        marginTop: 10,
        padding: 10
    },
    close: {
        zIndex: 99,
    }
});

BlankModal.propTypes = {
    childrenCreator: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    bgColor: PropTypes.string,
    closeAction: PropTypes.func,
}

export default BlankModal;