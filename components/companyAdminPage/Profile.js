import React from 'react';
import {Overlay, Button, Card, ListItem, Icon} from 'react-native-elements';
import avatar from '../../resources/tenor.gif'
import moment from 'moment'

const Profile = ({user, isVisible, onClose, onLogout}) => {
    return (
        <Overlay isVisible={isVisible} onBackdropPress={onClose} fullScreen overlayBackgroundColor={'#f5f5f5'}>
            <Icon
                containerStyle={{marginLeft: '85%'}}
                name='close'
                type='material'
                color='#292f45'
                size={30}
                onPress={onClose}/>
            <Card
                image={avatar}
            >
                <Button
                    containerStyle={{marginTop: '13%'}}
                    title='SIGN OUT'
                    onPress={onLogout}/>

            </Card>

        </Overlay>
    );
}

export default Profile
