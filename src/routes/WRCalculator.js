import React from 'react';
import CardSelection from '../components/CardSelection'
import Help from '../components/Help'

import { Button, Grid } from '@mui/material';

const lang = require('../lang.json')

export default function WRCalculator() {
    const [language, setLanguage] = React.useState(1)


    return (
        <div style={{textAlign: 'center'}}>
            <h3>{lang["title"][language]}</h3>
            <CardSelection language={language}/>
            <Grid container spacing={2} style={{maxWidth:'100px', margin:'auto'}}>
                <Grid item xs={6}>
                    <Help language={language}/>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="text"
                        onClick={() => {
                            setLanguage((language + 1) % 2)
                        }}
                    >{lang["lang-change"][language]}</Button>
                </Grid>
            </Grid>
        </div>
    );
}