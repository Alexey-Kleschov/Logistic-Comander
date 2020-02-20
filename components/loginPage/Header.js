import React, {Component} from 'react';
import {Header} from "react-native-elements";
import {Icon} from "react-native-elements";

export default class Head extends Component {
    render() {
        console.log(this.props.navigation);
        
        return (
            <>
                <Header
                    leftComponent={<Icon name='arrow-back' color='#f5f5f5' onPress={ () => this.props.navigation.navigate('Service')}/>}
                    centerComponent={{text: this.props.title, style: {color: '#fff'}}}
                    backgroundColor='#292f45'
                >
                </Header>
            </>
        )
    }
}

