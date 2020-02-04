import React from 'react'
import { Row } from 'react-native-table-component'

const BlankRows = ({ cargo }) => {
    return cargo.map(({id, name, amount, package}) => (
        <Row data={[name, amount, package]} key={id} /> 
    ))
}

export default BlankRows
