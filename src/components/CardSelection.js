import * as React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Game from '../game/Game';
import WinTable from './WinTable';


export default function CardSelection() {
    const [cards, setCards] = React.useState(['', '', '', '', ''])
    const [playerNum, setPlayerNum] = React.useState(6)
    const [winTable, setWinTable] = React.useState()

    const handleChange = (event) => {
        setCards(cards.map((c, index) => {
            return (index + 1).toString() === event.target.id[4] ? event.target.value : c
        }))
    }

    const handleSubmit = () => {
        let playerNum = document.getElementById('playerNum').value
        console.log(playerNum)
        console.log(cards)
        setWinTable(Game.getWinRate(playerNum, cards))


    }

    return (
        <div>
            <FormControl>
                <TextField label='Num of Players' id='playerNum' key='playerNum' onChange={setPlayerNum}/>
                {
                    cards.map((c, index) =>
                        <TextField label={'Card' + (index + 1)} id={'Card' + (index + 1)} key={'card' + (index + 1)} onChange={handleChange} />
                    )
                }
                <Button variant="contained" type='submit' onClick={handleSubmit}>Submit</Button>
            </FormControl>
            <WinTable table={winTable}/>
        </div>
    );
}
