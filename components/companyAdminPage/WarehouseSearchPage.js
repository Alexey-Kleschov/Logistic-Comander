import React, {Component} from 'react';
import {Text, Button, Input} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getWarehouse} from '../../actions/warehouseActions';
import Spinner from 'react-native-loading-spinner-overlay';
import {View} from 'react-native';


const styles = {
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#292f45',
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
    marginTop: '70%',
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
      Actions.warehouseInfoPage();
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
          textContent={'Searching...'}
          animation="fade"
          size="large"
          textStyle={styles.spinner}
        />
          <Text h3 style={styles.h1}> Search warehouse by license </Text>

              <Input
                autoFocus={true}
                autoCorrect={true}
                style={styles.input}
                type="email"
                onChangeText={text => this.setState({license: text})}
              />
            {this.props.errors.warehouse && (
              <Text style={styles.error}>{this.props.errors.warehouse}</Text>
            )}
            <Button block success onPress={this.handleSubmit}>
              <Text>search</Text>
            </Button>
      </View>
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
