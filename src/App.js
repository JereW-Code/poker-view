import './App.css';
import React from 'react';
import CardSelectionLite from './components/CardSelectionLite'
import Help from './components/Help'

import { Button, Grid } from '@mui/material';

const lang = require('./lang.json')


function App() {

    const [language, setLanguage] = React.useState(1)



    return (
        <div className="App" id='app'>
            <h3>{lang["title"][language]}</h3>
            <CardSelectionLite language={language}/>
            <Grid container spacing={2} style={{maxWidth:'100px', margin:'auto'}}>
                    <Grid item xs={6}>
                        <Help language={language}/>
                    </Grid>
                    <Grid item xs={4}>
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

export default App;
