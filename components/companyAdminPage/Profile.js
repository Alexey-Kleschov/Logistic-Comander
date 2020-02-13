import React from 'react';
import {Overlay, Button, Card, ListItem, Icon} from 'react-native-elements';
import avatar from '../../resources/greta.jpg';
import moment from 'moment';

const Profile = ({user, isVisible, onClose, onLogout}) => {
    const profileList = [
        {
            avatar: 'home',
            item: `${user.company}`
        },
        {
            avatar: 'wrench',
            item: `company admin`
        },
        {
            avatar: 'envelope',
            item: user.email
        },
        {
            avatar: 'star',
            item: moment(user.createDate).format('MMMM Do YYYY')
        },
    ]

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
                {profileList.map((elem, index) => {
                    return (<ListItem
                        key={elem.avatar + index}
                        title={elem.item}
                        leftIcon={{name: elem.avatar, type: 'font-awesome'}}
                        bottomDivider
                    />)
                })}
                <Button
                    containerStyle={{marginTop: '13%'}}
                    title='SIGN OUT'
                    onPress={onLogout}/>

            </Card>
        </Overlay>
    );
}

export default Profile
