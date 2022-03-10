import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from './Card'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CardDisplay(props) {
    const cards = props.cards.map(c => c.toString())
    while(cards.length < 5){
        cards.push('N?')
    }
    return (
        <Box sx={{
            flexGrow: 1,
            maxWidth: '400px',
            margin: '5px',
            padding: '5px',
            borderRadius: '5px',
            background: 'rgba(0,0,0,0.09)'
        }}>
            <Grid container spacing={0.2}>
                {
                    cards.map((c, i) =>
                        <Grid item xs={2.4} key={i}>
                            <Card face={c}/>
                        </Grid>
                    )
                }
                
                
            </Grid>
        </Box>
    );
}
