import React, {Component, Fragment} from 'react';
import {Container, Content, Accordion, H1, Text} from 'native-base';
import {connect} from 'react-redux';

const styles = {
  mainContainer: {
    backgroundColor: '#282E29',
  },
  text: {
    width: '100%',
    marginTop: '22%',
    textAlign: 'center',
    color: 'white',
  },
  h1: {
    marginTop: '5%',
    marginBottom: '7%',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
};

class ProductsInfoPage extends Component {
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
            headerStyle={{backgroundColor: '#454545'}}
            contentStyle={{backgroundColor: '#A4A3A3'}}
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
