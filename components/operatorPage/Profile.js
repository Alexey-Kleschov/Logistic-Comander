import React from 'react';
import {Overlay, Button, Card, ListItem, Icon} from 'react-native-elements';
import avatar from '../../resources/yra.jpg'
import moment from 'moment'

const Profile = ({user, isVisible, onClose, onLogout}) => {
    const profileList = [
        {
            avatar: 'user-circle',
            item: `${user.lastName} ${user.firstName} ${user.patronymic}`
        },
        {
            avatar: 'wrench',
            item: `${user.position[0]}`
        },
        {
            avatar: 'envelope',
            item: user.email
        },
        {
            avatar: 'home',
            item: `${user.city}, ${user.street}, ${user.apartment}/${user.house}`
        },
        {
            avatar: 'birthday-cake',
            item: moment(user.dateOfBirth).format('MMMM Do YYYY')
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
                imageStyle={{height:190}}
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
                    containerStyle={{marginTop: '5%'}}
                    title='SIGN OUT'
                    onPress={onLogout}/>

            </Card>

        </Overlay>
    );
}

export default Profile
