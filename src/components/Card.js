import * as React from 'react';
import Box from '@mui/material/Box';

const TYPE_SYMBOL = {
    C: '\u2663',
    H: '\u2665',
    S: '\u2660',
    D: '\u2666',
    N: '?'
}

const TYPE_COLOR = {
    C: 'rgb(255,145,1)',
    H: 'rgb(28,134,255)',
    S: 'rgb(255,50,50)',
    D: 'rgb(74,23,164)',
    N: 'rgb(110,71,0)'
}


export default function Card(props) {
    const face = props.face.length === 2 ? props.face : 'N?'
    const type = face[0]
    const value = face[1]
    return (
        <Box
            sx={{
                width: 70,
                height: 100,
                backgroundColor: TYPE_COLOR[type],
                borderRadius: '8px',
                margin: 'auto'
            }}
        >
            <p style={{
                textAlign:'right',
                fontSize:'20px',
                margin: '0px',
                marginRight: '5px',
                lineHeight: '20px',
                color: type === 'D' || type === 'H' ?
                    'red' : type === 'N' ? 'white' : 'black'
            }}>
                {TYPE_SYMBOL[type]}
            </p>
            <p style={{
                top: '10px',
                textAlign:'center',
                fontSize:'60px',
                margin: '0px',
                lineHeight: '60px',
                color:'white',
                fontWeight:'bold'
            }}>
                {value}
            </p>

        </Box>
    );
}
