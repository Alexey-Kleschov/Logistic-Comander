import React, { Component } from 'react';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import { scannerAction, scannerResetAction } from '../actions/scannerAction.js';
import ScanResponceContainer from '../components/scaner/responceComponents/ScanResponceContainer'

class ScannerScreen extends Component {
  
  state = {
    hasPermission: null,
    scanned: false
  };

  componentDidMount() {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
          this.setState({
            hasPermission: true 
          });
        }        
      })(); 
  };

  handleBarCodeScanned = ({ data }) => {
    this.setState(() => {
      return {
        scanned: true
      };
    });
    const parseData = JSON.parse(data);
    this.props.scannerAction(parseData);
  };

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (!this.state.hasPermission) {
      return <Text>No access to camera</Text>;
    }

    return this.props.scannerData
    ? (
      <ScanResponceContainer 
        scanResponce={this.props.scannerData}
        scannerResetAction={this.props.scannerResetAction}
      />
    )
    : (
      <View style={styles.view}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }  
});

const mapStateToProps = (state) => ({
  scannerData: state.scanner
});

export default connect(mapStateToProps, { scannerAction, scannerResetAction })(ScannerScreen);