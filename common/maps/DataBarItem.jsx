import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataBarItem = ({ title, value, unit }) => {
    const upperCasedTitle = title.toLocaleUpperCase();
    return (
        <View style={styles.bottomBarContent}>
            <Text style={styles.bottomBarContent_text}>{upperCasedTitle}</Text>
            <View style={styles.inlineGroup}>
                <Text style={styles.bottomBarContent_value}>{value}</Text>
                <Text style={[styles.bottomBarContent_text, styles.unit]}>{unit}</Text>
            </View>
        </View>
    )
};

export default memo(DataBarItem);

const styles = StyleSheet.create({
    bottomBarContent: {
        marginRight: 25,
    },
    bottomBarContent_text: {
        color: 'lightblue',
        letterSpacing: 1,
        marginBottom: 10
    },
    bottomBarContent_value: {
        marginRight: 3,
        fontSize: 30,
        lineHeight: 30,
        color: 'lightblue',
    },
    unit: {
        lineHeight: 30
    },
    inlineGroup: {
        flexDirection: 'row',
    },
});