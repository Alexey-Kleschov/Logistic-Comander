import React from 'react'
import { Text, View } from 'react-native'
import { Table, Row } from 'react-native-table-component'
import BlankRows from './BlankRows'

const testData = {
    "cargo": [
      {
        "name": "apples",
        "amount": "4",
        "id": "7876785757",
        "package": "box"
      },
      {
        "name": "melons",
        "amount": "10",
        "id": "1232334231",
        "package": "box"
      },
      {
        "name": "pineapples",
        "amount": "30",
        "id": "5656678878",
        "package": "box"
      },
      {
        "name": "oranges",
        "amount": "5",
        "id": "9770987684",
        "package": "box"
      }
    ],
    "number": "5555555555",
    "carNumber": "EZ-2454",
    "ownerInfo": "E3423434T56",
    "warehouseLicense": "5555555555",
    "dataOfRegistration": "2020-01-30T09:28:31.320Z",
    "service": "express_cargo",
  }

const ScanBlank = () => {
    const {
        cargo, number, carNumber, ownerInfo, warehouseLicense, dataOfRegistration, service
    } = JSON.parse(testData) 
    const tableHead = ['Name', 'Amount', 'Package type']

    return (
        <View>
            <View>
                <Text>TTN {parsedTtnData.number}</Text>
            </View>
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    <BlankRows cargo={cargo}/>
                </Table>
            </View>
            <View>
                <BlankSubData
                    number={number}
                    carNumber={carNumber}
                    ownerInfo={ownerInfo}
                    warehouseLicense={warehouseLicense}
                    service={service}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});

export default ScanBlank