import React, {Component} from 'react';
import {Input, Text, Button} from 'react-native-elements'
import {StyleSheet, View} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from 'react-redux';
import {getWarehouse} from '../../actions/warehouseActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from "./Header";

class WarehouseSearchPage extends Component {
  static navigationOptions = {
    header:()=><Header
        title='WAREHOUSE SEARCH'
    />
  };

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
        <View style={styles.mainView}>
          <Spinner
              visible={this.state.spinner}
              animation="fade"
              size="large"
          />
          <Text h3 style={styles.head}>Search by warehouse license number</Text>
          <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.label}
                onChangeText={e => this.setState({license: e})}
                errorMessage={this.props.errors.warehouse}
                placeholder='License number'
                leftIcon={
                  <Icon
                      name='search'
                      size={20}
                      color='white'
                  />
                }
            />
            <Button
                containerStyle={styles.button}
                title="Submit"
                type="solid"
                onPress={this.handleSubmit}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#292f45',
  },
  head: {
    marginTop: '15%',
    marginLeft: '10%',
    color: '#f5f5f5'
  },
  headTwo:{
    marginLeft: '10%',
    color: '#f5f5f5'
  },

  form: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '10%',
    width: '80%',
    marginTop: '25%',
  },
  input: {
    marginTop: '8%',
  },
  inputStyle: {
    marginLeft: '8%',
    color: 'white',
  },
  label: {
    color: '#f5f5f5'
  },
  button: {
    marginTop: '60%'
  },

});

const mapStateToProps = state => ({
  warehouse: state.warehouse,
  auth: state.auth,
  errors: state.errors,
});

export default connect(
    mapStateToProps,
    {getWarehouse},
)(WarehouseSearchPage);
