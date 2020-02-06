import React, {Component, Fragment} from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  Body,
  Button,
  CardItem,
  List,
  ListItem,
  Icon,
  Right,
  Left,
  Thumbnail,
} from 'native-base';
import {Image, Linking, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {setProducts} from '../../actions/productsAction';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import warehouseImage from '../../resources/warehouse.png';

const styles = StyleSheet.create({
  icon: {
    marginRight: '2%',
    color: 'white',
  },
  mainContainer: {
    backgroundColor: '#282E29',
    fontFamily: 'arial',
  },
  list: {
    backgroundColor: '#454545',
  },
  text: {
    color: 'white',
  },
});

class WarehouseInfoPage extends Component {
  handleSetAreaInfo = data => {
    this.props.setProducts(data);
    Actions.productsInfoPage();
  };

  render() {
    const currentWarehouseArray = this.props.warehouse.areas.map(elem => {
      return (
        <Fragment key={elem.index}>
          <ListItem onPress={() => this.handleSetAreaInfo(elem.products)}>
            <Left>
              <Icon active style={styles.icon} name="home" />
              <Text style={styles.text}>
                {elem.type.toUpperCase()} (free {elem.freeArea} out of{' '}
                {elem.area})
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" style={styles.icon} />
            </Right>
          </ListItem>
          <ListItem itemDivider style={styles.mainContainer} />
        </Fragment>
      );
    });
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${this.props.warehouse.GPS.lat},${
      this.props.warehouse.GPS.lng
    }`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    return (
      <Container style={styles.mainContainer}>
        <Content>
          <Card>
            <CardItem style={styles.list}>
              <Left>
                <Thumbnail source={warehouseImage} />
                <Body>
                  <Text style={styles.text}>{this.props.warehouse.name}</Text>
                  <Text note>License №{this.props.warehouse.id}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{uri: `${this.props.warehouse.buildImg}`}}
                style={{height: 200, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem style={styles.list}>
              <Left>
                <Button transparent>
                  <Icon active style={styles.text} name="star" />
                  <Text style={styles.text}>
                    Free area: {this.props.warehouse.freeArea}
                  </Text>
                </Button>
              </Left>
              <Right>
                <Button
                  transparent
                  onPress={() => {
                    Linking.openURL(url);
                  }}>
                  <Icon active style={styles.text} name="map" />
                  <Text style={styles.text}>Check on map</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <List style={styles.list}>
            <ListItem itemDivider style={styles.mainContainer} />
            {currentWarehouseArray}
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  warehouse: state.warehouse,
  products: state.products,
});

export default connect(
  mapStateToProps,
  {setProducts},
)(WarehouseInfoPage);
