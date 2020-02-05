import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import BlankRows from './BlankRows';
import BlankSubData from "./BlankSubData";

const testData = {
    cargo: [
        {
            name: "apples",
            amount: "4",
            id: "7876785757",
            boxing: "box"
        },
        {
            name: "melons",
            amount: "10",
            id: "1232334231",
            boxing: "box"
        },
        {
            name: "pineapples",
            amount: "30",
            id: "5656678878",
            boxing: "box"
        },
        {
            name: "oranges",
            amount: "5",
            id: "9770987684",
            boxing: "box"
        }
    ],
    number: "5555555555",
    carNumber: "EZ-2454",
    ownerInfo: "E3423434T56",
    warehouseLicense: "5555555555",
    dataOfRegistration: "2020-01-30T09:28:31.320Z",
    service: "express_cargo",
};

const ScanBlank = () => {
    const tableHead = ['Name', 'Amount', 'Package type']

    return (
        <View>
            <View style={styles.blankTitleWrapper}>
                <Text style={styles.blankTitle}>TTN №{testData.number}</Text>
            </View>
                <Table borderStyle={styles.borderStyle}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    <BlankRows cargo={testData.cargo} textStyle={styles.text}/>
                </Table>
            <View>
                <BlankSubData
                    number={testData.number}
                    carNumber={testData.carNumber}
                    ownerInfo={testData.ownerInfo}
                    warehouseLicense={testData.warehouseLicense}
                    service={testData.service}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    blankTitleWrapper: {
        flex: 1, 
        alignItems: 'center',
        paddingVertical: 30,
    },
    blankTitle: {
        fontSize: 24
    },
    head: {
        height: 40, 
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    },
    borderStyle: {
        borderWidth: 2, 
        borderColor: '#c8e1ff'
    },
});

export default ScanBlank;
