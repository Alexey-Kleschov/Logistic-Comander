import React, {Component, Fragment} from 'react';
import {Container, Content, Accordion, H1, Text} from 'native-base';
import {connect} from 'react-redux';
import Header from "./Header";

const styles = {
    mainContainer: {
        backgroundColor: '#292f45',
    },
    text: {
        width: '100%',
        marginTop: '22%',
        textAlign: 'center',
        color: 'white',
    },
    h1: {
        marginTop: '7%',
        marginBottom: '7%',
        width: '100%',
        textAlign: 'center',
        color: 'white',
    },
    header: {
        backgroundColor: '#292f45',
        borderBottomWidth: 2,
        borderColor: '#f5f5f5',
        marginTop: 3
    },
    accordion: {
        marginTop: '5%',
        borderBottomWidth: 0,
    },
};

class ProductsInfoPage extends Component {
    static navigationOptions = ({navigation}) => ({
        header: <Header title='PRODUCTS INFORMATION' navigation={navigation} profile={true}/>
    });

    render() {
        const products = this.props.products.map(elem => {
            return {
                title: <Text style={styles.text}>{elem.name} (id: {elem.id})</Text>,
                content: `Amount: ${elem.amount} (${
                    elem.package
                })\n\nAvailable amount: ${elem.availableAmount} (${
                    elem.package
                })\n\nFootprint: ${elem.size}\n\nSerial number: ${
                    elem.id
                } \n\nFrom TTN №${elem.ttnNumber}`,
            };
        });
        return (
            <Container style={styles.mainContainer}>
                <Content padder>
                    <H1 style={styles.h1}> Cargo list </H1>
                    <Accordion
                        dataArray={products}
                        icon="add"
                        animation={true}
                        expandedIcon="remove"
                        iconStyle={{color: 'white'}}
                        style={styles.accordion}
                        headerStyle={styles.header}
                        contentStyle={{backgroundColor: '#f5f5f5'}}
                        expandedIconStyle={{color: 'white'}}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products,
});

export default connect(mapStateToProps)(ProductsInfoPage);
