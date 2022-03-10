import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';

import PlayerInfo from '../components/PlayerInfo'
import CardDisplay from '../components/CardDisplay'


export default function Board(props) {
    const GM = props.gameManager
    const playersRenderList = GM.players.map((p, i) =>
        <Badge badgeContent={'SB'} color='success' >
            <PlayerInfo player={p} winRate={p.hand.length === 2 ? GM.winTable.getWinRateOfHand(p.hand) : 0} key={i}/>
        </Badge>
    )
    return (
        <Box sx={{
            flexGrow: 1,
            maxWidth: '1100px',
            margin: 'auto'
        }}>
            <Grid container spacing={2} >
                {/*first row*/}
                <Grid item xs={2.5}></Grid>
                <Grid item xs={2}>
                    {playersRenderList[0]}
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={2.5}>
                    {playersRenderList[1]}
                </Grid>
                <Grid item xs={2}></Grid>
                {/*Second row*/}
                <Grid item xs={2}>
                    {playersRenderList[5]}
                </Grid>
                <Grid item xs={8} style={{
                    display: 'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <CardDisplay cards={GM.displayedCards}/>
                </Grid>
                <Grid item xs={2}>
                    {playersRenderList[2]}
                </Grid>
                {/*Third row*/}
                <Grid item xs={2.5}></Grid>
                <Grid item xs={2}>
                    {playersRenderList[4]}
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={2.5}>
                    {playersRenderList[3]}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Box>
    );
}
