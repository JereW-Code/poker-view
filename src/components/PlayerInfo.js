import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Hand from './Hand';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgb(108,108,108)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'

}));


export default function PlayerInfo(props) {
    const player = props.player
    const balance = player.cash
    let hand = player.hand
    while(hand.length < 2){
        hand.push('N?')
    }
    const winRate = props.winRate

    return (

        <div style={{
            maxWidth: '150px',
            margin: '5px',
            padding: '5px',
            borderRadius: '5px',
            background: 'rgba(0,0,0,0.09)'
        }}>
            <Stack spacing={0.5}>
                <Hand hand={player.hand}/>
                <Item>
                    P{player.id + 1} - {(winRate * 99).toFixed()}%
                </Item>
                <Item>Balance: ${balance}</Item>

            </Stack>
        </div>
    );
}
