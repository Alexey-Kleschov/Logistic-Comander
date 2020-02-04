import React from 'react'
import { ListItem } from 'react-native-elements'

const BlankSubData = (props) => {
    const subData = [...props]
    const titles = [
        'TTN number:', 'Driver car number:', 'Owner:', 'Warehouse license:', 'From service:'
    ]

    return subData.map((unit, index) => {
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
