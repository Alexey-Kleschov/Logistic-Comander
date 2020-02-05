import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
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
    const __tableRows = testData.cargo.map(({id, name, amount, boxing}) => (
        <Row 
            data={[name, amount, boxing]} 
            key={id} 
            textStyle={styles.text}
        />
    ))
    
    return (
        <ScrollView>
            <View style={styles.blankTitleWrapper}>
                <Text style={styles.blankTitle}>TTN №{testData.number}</Text>
            </View>
            <View>
                <BlankSubData
                    number={testData.number}
                    carNumber={testData.carNumber}
                    ownerInfo={testData.ownerInfo}
                    warehouseLicense={testData.warehouseLicense}
                    service={testData.service}
                />
            </View>
            <View style={styles.blankTitleWrapper}>
                <Text style={styles.cargoListTitle}>Cargo</Text>
            </View>
            <Table borderStyle={styles.borderStyle} style={styles.table}>
                <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                {__tableRows}
            </Table>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    blankTitleWrapper: {
        flex: 1, 
        alignItems: 'center',
        marginVertical: 20,
    },
    blankTitle: {
        fontSize: 26,
    },
    cargoListTitle: {
        fontSize: 18,
        marginTop: 10,
    },
    head: {
        height: 40, 
        backgroundColor: 'white'
    },
    text: {
        margin: 6,
    },
    borderStyle: {
        borderWidth: 1, 
        borderColor: 'black'
    },
    table: {
        zIndex: 1
    },
});

export default ScanBlank;
