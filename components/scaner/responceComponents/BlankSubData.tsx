import React from 'react'
import {ListItem} from 'react-native-elements'

interface Props {
    number: string,
    carNumber: string,
    ownerInfo: string,
    warehouseLicense: string,
    service: string,
}

const BlankSubData = ({ number, carNumber, ownerInfo, warehouseLicense, service }: Props): React.ReactElement => {
    const titles: Array<string> = [
        'TTN number:', 'Driver car number:', 'Owner:', 'Warehouse license:', 'From service:'
    ]

    const items: Array<string> = [
        number, carNumber, ownerInfo, warehouseLicense, service
    ]
    
    return <>
        {items.map((unit: string, index: number) => (
            <ListItem
                key={index}
                title={titles[index]}
                subtitle={unit}
                bottomDivider
            />
        ))}
    </>
    
}

export default BlankSubData
