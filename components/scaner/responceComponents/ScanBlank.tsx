import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import BlankSubData from "./BlankSubData";

type elemType = {
    id: string,
    name: string,
    amount: string,
    package: string
}

type scanDataType = {
    cargo: Array<elemType>,
    id: string,
    carNumber: string,
    ownerInfo: string,
    warehouseLicense: string,
    service: string,
}

export interface Props {
    scanData: scanDataType
} 

const ScanBlank = ({ scanData }: Props) => {
    const {
        cargo, id, carNumber, ownerInfo, warehouseLicense, service
    } = scanData
    const tableHead = ['Name', 'Amount', 'Package type']
    const __tableRows = cargo.map((elem: elemType) => (
        <Row
            data={[elem.name, elem.amount, elem.package]}
            key={elem.id}
            textStyle={styles.text}
        />
    ))

    return (
        <ScrollView>
            <View style={styles.blankTitleWrapper}>
                <Text style={styles.blankTitle}>TTN №{id}</Text>
            </View>
            <View>
                <BlankSubData
                    number={id}
                    carNumber={carNumber}
                    ownerInfo={ownerInfo}
                    warehouseLicense={warehouseLicense}
                    service={service}
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
