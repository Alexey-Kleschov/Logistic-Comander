import React from 'react'
import { Row } from 'react-native-table-component'

const BlankRows = ({ cargo }) => {
    return cargo.map(({id, name, amount, boxing}) => (
        <Row data={[name, amount, boxing]} key={id} />
    ))
}

export default BlankRows
