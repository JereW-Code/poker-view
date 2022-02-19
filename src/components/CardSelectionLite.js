import * as React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Game from '../game/Game';
import WinTableReduced from './WinTableReduced';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


export default function CardSelectionLite() {

    const [code, setCode] = React.useState('')
    const [winRate, setWinRate] = React.useState(0)
    const [winTable, setWinTable] = React.useState({})
    const [flush, setFlush] = React.useState('ANY')

    const TYPE = ['S', 'D', 'H', 'C']
    const NUM = ['/', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
    const CARD_RANK = [0, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    const getMostOccurance = (cards) => {
        let typeOccurence = [0, 0, 0, 0]
        cards.forEach(c => typeOccurence[TYPE.indexOf(c[0])] += 1)
        let result = typeOccurence.filter(t => t >= 2)
        console.log(result)
        if(result.length === 1){
            result.push(result[0])
        }
        console.log('^')
        console.log(result)
        if(result.length === 2){
            if(result[0] === 2 && result[1] === 2){
                return TYPE.filter((_,i) => typeOccurence[i] === 2)
            } else if(result[0] === 3 || result[1] === 3){
                return [TYPE[typeOccurence.indexOf(3)], TYPE[typeOccurence.indexOf(3)]]
            }
            return result.map(r => TYPE[typeOccurence.indexOf(r)])
        } else {
            return 'ANY'
        }
    }

    const handleSubmit = () => {

        let code = document.getElementById('code').value.toUpperCase().split(' ')
        let playerNum = code.shift()
        let yourCard = [code.shift(), code.shift()]
        let yourCardIndex = yourCard.map(c => 13 * TYPE.indexOf(c[0]) + CARD_RANK[NUM.indexOf(c[1])] - 2)
        let cards = code
        setFlush(getMostOccurance(cards))

        setWinTable(Game.getWinRate(playerNum, cards))
        let winRate
        try {
            winRate = winTable.table[yourCardIndex[0]][yourCardIndex[1]]
        } catch (e) {
            winRate = [0, 1]
        }
        setWinRate((100 * winRate[0] / (winRate[0] + winRate[1])).toFixed())


    }

    return (
        <Container style={{width: '300px', marginTop: '50px'}} >
            <WinTableReduced table={winTable} flush={flush} style={{margin: 'auto'}}/>
            <h1>{winRate}</h1>
            <FormControl>
                <TextField label='Code' id='code' key='code' onChange={setCode}/>

                <Button variant="contained" type='submit' onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Container>
    );
}
