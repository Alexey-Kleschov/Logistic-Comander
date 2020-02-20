import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { getDriverOrders } from '../../src/services/http/driverData-service';
import Header from './Header';
import moment from 'moment';

class DriverOrderList extends Component {

    static navigationOptions = ({ navigation }) => ({
        header:<Header title='Driver' navigation={navigation}/>
    });

    state = {
        tableHead: ['Point ID', 'Date', 'From', 'To'],
        tableData: [
          ['', '', '', '']
        ]
    };
    
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    };

    componentDidMount() {
        (async () => {
           const fetchData = await getDriverOrders(this.props.token, 195);
            this.setState({
                tableData: [[
                    fetchData[0].waybill.arrivedPointId, 
                    moment(fetchData[0].waybill.date).format('MMMM D, YYYY'), 
                    fetchData[0].waybill.start.name, 
                    fetchData[0].waybill.finish.name
                ]]
            });
        })();     
    }

    render() {

        const state = this.state;
        return (
            <View style={styles.wrapper}>
                <Text style={styles.txt}>Order list</Text>
                <View style={styles.container}>
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                        {
                            state.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell key={cellIndex} data={cellData} textStyle={styles.text} onPress={() => this._alertIndex(index)}/>
                                ))
                                }
                            </TableWrapper>
                            ))
                        }
                    </Table>
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    token: state.auth.token
});
  
export default connect(mapStateToProps, null)(DriverOrderList);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 5,
        marginHorizontal: 10
    },
    txt: {
        fontWeight: '700',
        color: 'white',
        fontSize: 30        
    },
    head: { 
        height: 40, 
        backgroundColor: '#808B97',
        width: 'auto'
    },
    text: { 
        margin: 6 
    },
    row: { 
        flexDirection: 'row', 
        backgroundColor: '#FFF1C1' 
    },
    btn: { 
        width: 58, 
        height: 18, 
        backgroundColor: '#78B7BB',  
        borderRadius: 2 
    },
    btnText: { 
        textAlign: 'center', 
        color: '#fff' 
    },
    wrapper: {
        backgroundColor: '#0f4ade',
        height: '100%'
    },
    txt: {
        fontWeight: '700',
        color: 'white',
        fontSize: 30,
        marginLeft: '5%'        
    }
});