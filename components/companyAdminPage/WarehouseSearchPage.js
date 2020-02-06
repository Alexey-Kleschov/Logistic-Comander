import React, {Component} from 'react';
import {
  Container,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  H1,
  Content,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getWarehouse} from '../../actions/warehouseActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {ImageBackground} from 'react-native';
import backImage from '../../resources/pexels-photo-2310642.jpeg';

const styles = {
  mainContainer: {
    backgroundColor: '#E6E6E6',
  },
  text: {
    width: '100%',
    marginTop: '22%',
    textAlign: 'center',
    color: 'white',
  },
  h1: {
    marginTop: '20%',
    width: '100%',
    textAlign: 'center',
    color: 'white',
  },
  card: {
    marginTop: '5%',
    marginLeft: '5%',
    marginBottom: '15%',
    width: '90%',
  },
  form: {
    marginTop: '25%',
    marginRight: '10%',
    marginLeft: '5%',
  },
  button: {
    marginTop: '65%',
    width: '83%',
    marginLeft: '8%',
  },
  spinner: {
    color: 'white',
  },
  label: {
    color: 'white',
  },
  input: {
    color: 'white',
  },
  error: {color: 'red', marginLeft: '4%', marginTop: '2%'},
};

class WarehouseSearchPage extends Component {
  state = {
    license: '',
    spinner: false,
  };

  handleSubmit = () => {
    const spinner = () => {
      this.setState({spinner: !this.state.spinner});
    };
    spinner();
    const nextPage = () => {
      this.props.navigation.navigate('WarehouseInfoPage')
      spinner();
    };
    this.props.getWarehouse(
        this.state.license,
        this.props.auth.token,
        nextPage,
        spinner,
    );
  };

  render() {
    return (
        <Container style={styles.mainContainer}>
          <Spinner
              visible={this.state.spinner}
              textContent={'Searching...'}
              animation="fade"
              size="large"
              textStyle={styles.spinner}
          />
          <ImageBackground
              source={backImage}
              style={{width: '100%', height: '100%'}}>
            <H1 style={styles.h1}> Search warehouse by license </H1>
            <Form style={styles.form}>
              <Item floatingLabel error={this.props.errors.warehouse}>
                <Label style={styles.label}>License number</Label>
                <Input
                    autoFocus={true}
                    autoCorrect={true}
                    style={styles.input}
                    type="email"
                    onChangeText={text => this.setState({license: text})}
                />
              </Item>
              {this.props.errors.warehouse && (
                  <Text style={styles.error}>{this.props.errors.warehouse}</Text>
              )}
            </Form>
            <Content style={styles.button}>
              <Button block success onPress={this.handleSubmit}>
                <Text>search</Text>
              </Button>
            </Content>
          </ImageBackground>
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  warehouse: state.warehouse,
  auth: state.auth,
  errors: state.errors,
});

export default connect(
    mapStateToProps,
    {getWarehouse},
)(WarehouseSearchPage);
