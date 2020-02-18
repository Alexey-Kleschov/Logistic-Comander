import React from 'react';
import { View, Alert } from 'react-native'

const ErrAlert = ({ errMsg, errHendler = function(){} }) => {
    return (
        <View>
            {
                Alert.alert(
                    'Hey!',
                    errMsg,
                    [
                        {text: 'OK', onPress: () => errHendler()},
                    ],
                    {cancelable: false},
                )
            }
        </View>
    )
}

export default ErrAlert;