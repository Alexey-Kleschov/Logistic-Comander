import React from 'react'
import { Row, Rows } from 'react-native-table-component'

const BlankRows = ({ cargo, textStyle }) => {
    return cargo.map(({id, name, amount, boxing}) => (
        <Row 
            data={[name, amount, boxing]} 
            key={id} 
            style={[textStyle, {padding:1}]}
        />
    ))
}

export default BlankRows
