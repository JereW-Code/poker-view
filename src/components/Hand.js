import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from './Card'



export default function Hand(props){
    let hand = props.hand
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0.1}>
                {hand.map((c, i) => (
                    <Grid item xs={6} key={i}>
                        <Card face={c.toString()}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}