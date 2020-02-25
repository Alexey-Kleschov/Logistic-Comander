import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { getDriverOrders } from '../../src/services/http/driverData-service';
import Header from './Header';
import moment from 'moment';
import List from './List';

class DriverOrderList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableHead: ['Point ID', 'Date', 'From', 'To'],
            tableData: [
              ['', '', '', '']
            ],
            isOrdersFetched: false,
            driverLeadCoords: null,
        };
    }

    static navigationOptions = ({ navigation }) => ({
        header: <Header title='Driver' navigation={navigation}/>
    });  

    componentDidMount() {
        (async () => {
            const fetchData = await getDriverOrders(this.props.token, 195);
            const { start, finish, arrivedPointId, date } = fetchData[0].waybill
            const driverLeadCoords = {
                start: `${start.latitude}, ${start.longitude}`,
                finish: `${finish.latitude}, ${finish.longitude}`
            }

            this.setState({
                tableData: [[
                    arrivedPointId, 
                    moment(date).format('L'), 
                    start.name, 
                    finish.name
                ]],
                isOrdersFetched: true,
                driverLeadCoords,
            });            
        })();     
    }

    render() {        
        const state = this.state;   

        return (
            <View style={styles.container}>
                <View style={styles.txt__wrapper}>
                    <Text style={styles.txt}>ORDER LIST</Text>
                    <View style={styles.styledElem}/>
                </View>
                <View style={styles.table__container}>
                        {state.isOrdersFetched ? (
                            <Table>
                                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>   
                                <List 
                                    tableData={state.tableData}
                                    driverLeadCoords={state.driverLeadCoords}
                                    navigation={this.props.navigation}
                                />
                            </Table>
                        ) : (
                            <ActivityIndicator size="large" color="#292f45" style={styles.loader} />
                        )}
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
        backgroundColor: 'whitesmoke',
        height: '100%',
    },
    table__container: {
        marginHorizontal: 25,
    },
    txt__wrapper: {
        alignItems: 'center',
    },
    txt: {
        marginTop: 75,
        padding: 25,
        fontWeight: '700',
        color: '#292f45',
        fontSize: 30,
    },
    head: { 
        paddingLeft: 6,
        height: 40, 
        backgroundColor: 'lightgray',
        fontWeight: '900'
    },
    btn: { 
        width: 58, 
        height: 18, 
        backgroundColor: '#78B7BB',  
        borderRadius: 2,
    },
    btnText: { 
        textAlign: 'center', 
        color: '#fff',
    },
    styledElem: {
        width: 10,
        height: 10,
        backgroundColor: '#292f45',
        transform: [{ rotate: '45deg'}],
        marginTop: -10,
        marginBottom: 20,
    },
    loader: {
        marginTop: 50,
    }
});