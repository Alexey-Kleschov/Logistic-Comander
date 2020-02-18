import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { connect } from "react-redux";
import BarcodeService from "../../src/services/http/barCode-service";
import { scannerAction, scannerResetAction } from "../../actions/scannerAction";
import ScanResponceContainer from "../../components/scaner/responceComponents/ScanResponceContainer";
import ErrorAlert from '../../common/alerts/ErrAlert'

class ScannerScreen extends Component {
  state = {
    hasPermission: null,
    scanned: false,
    animationLineHeight: 0,
    focusLineAnimation: new Animated.Value(0),
    isAsyncScanErr: false,
  };

  componentDidMount() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === "granted") {
        this.setState({
          hasPermission: true,
          isAsyncScanErr: false
        });
      }
    })();

    const animateLine = () => {
      Animated.sequence([
        Animated.timing(this.state.focusLineAnimation, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.state.focusLineAnimation, {
          toValue: 0,
          duration: 1000
        })
      ]).start(animateLine);
    };
    animateLine();
  }

  handleBarCodeScanned = ({ data }) => {
    try {
      this.setState(() => {
        return {
          scanned: true
        };
      });
      const parseData = JSON.parse(data);
      if (typeof parseData === "number") {
        (async () => {
          const barCodeService = new BarcodeService();
          const fetchData = await barCodeService.getInvoiceFromWarehouse(
            this.props.token,
            parseData
          );
          await this.props.scannerAction(fetchData);
        })();
      } else {
        this.props.scannerAction(parseData);
      }
    } catch (error) {
      this.setState({
        isAsyncScanErr: true
      })
    }
  };

  errHendler = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (!this.state.hasPermission) {
      return <Text>No access to camera</Text>;
    }
    if(this.state.isAsyncScanErr) {
      return <ErrorAlert 
        errMsg="Invalid scaned code. Try other one."
        errHendler={this.errHendler}
    />;
    }

    return (
      this.props.scannerData ? (
        <ScanResponceContainer
          scanResponce={this.props.scannerData}
          scannerResetAction={this.props.scannerResetAction}
        />
      ) : (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={
              this.state.scanned ? undefined : this.handleBarCodeScanned
            }
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.description}>Scan your code</Text>
          <View style={styles.overlay}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.middleContainer}>
              <View style={styles.unfocusedContainer}></View>
              <View
                onLayout={e =>
                  this.setState({
                    animationLineHeight: e.nativeEvent.layout.height
                  })
                }
                style={styles.focusedContainer}
              >
                {!this.state.scanned && (
                  <Animated.View
                    style={[
                      styles.animationLineStyle,
                      {
                        transform: [
                          {
                            translateY: this.state.focusLineAnimation.interpolate(
                              {
                                inputRange: [0, 1],
                                outputRange: [
                                  0,
                                  this.state.animationLineHeight
                                ]
                              }
                            )
                          }
                        ]
                      }
                    ]}
                  />
                )}
                {this.state.scanned && (
                  <TouchableOpacity
                    onPress={() => this.setState({ scanned: false })}
                    style={styles.rescanIconContainer}
                  >
                    <Image
                      source={require("../../assets/images/scanner/scan.png")}
                      style={{ width: 70, height: 70 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.unfocusedContainer}></View>
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
        </View>
      )
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5
  },
  focusedContainer: {
    flex: 6
  },
  animationLineStyle: {
    height: 7,
    width: "100%",
    backgroundColor: "green",
    shadowColor: "yellow",
    shadowOpacity: 0.5,
    shadowRadius: 25.7,
    shadowOffset: {
      width: 0,
      height: 20
    },
    elevation: 1
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontSize: width * 0.09,
    marginTop: "20%",
    textAlign: "center",
    width: "100%",
    color: "white"
  }
});

const mapStateToProps = state => ({
  scannerData: state.scanner,
  token: state.auth.token
});

export default connect(mapStateToProps, { scannerAction, scannerResetAction })(
  ScannerScreen
);
