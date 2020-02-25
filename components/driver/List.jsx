import React from 'react';
import { StyleSheet } from 'react-native';
import { TableWrapper, Cell } from 'react-native-table-component';

const List = ({ tableData, driverLeadCoords, navigation }) => {
    return (
        tableData.map((rowData, index) => {
            return (
                <TableWrapper 
                    key={index} 
                    style={styles.row}
                >
                    {rowData.map((cellData, cellIndex) => {
                        return (
                            <Cell 
                                key={cellIndex} 
                                data={cellData} 
                                textStyle={styles.text} 
                                onPress={() => navigation.navigate('Navigator', driverLeadCoords)}
                            />
                        )
                    })}
                </TableWrapper>
            ) 
        })
    )
};

export default List;

const styles = StyleSheet.create({
    text: { 
        margin: 5 
    },
    row: { 
        flexDirection: 'row', 
        backgroundColor: 'white',
    }
});