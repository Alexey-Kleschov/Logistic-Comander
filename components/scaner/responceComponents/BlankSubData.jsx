import React from 'react'
import {ListItem} from 'react-native-elements'

const BlankSubData = ({number, carNumber, ownerInfo, warehouseLicense, service}) => {
    const titles = [
        'TTN number:', 'Driver car number:', 'Owner:', 'Warehouse license:', 'From service:'
    ]
    const items = [
        number, carNumber, ownerInfo, warehouseLicense, service
    ]
    return items.map((unit, index) => {
        return (
            <ListItem
                key={index}
                title={titles[index]}
                subtitle={unit}
                bottomDivider
            />
        )
    })
}

export default BlankSubData
