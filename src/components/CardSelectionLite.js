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
import ResultTable from'./ResultTable';


export default function CardSelectionLite() {

    const [code, setCode] = React.useState('')
    const [winRate, setWinRate] = React.useState(0)
    const [winTable, setWinTable] = React.useState({})
    const [flush, setFlush] = React.useState('ANY')
    const [playerNum, setPlayerNum] = React.useState(6)
    const [hand, setHand] = React.useState(['/', '/'])
    const [cardsRevealed, setCardsRevealed] = React.useState([])

    const TYPE = ['S', 'D', 'H', 'C']
    const NUM = ['/', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
    const CARD_RANK = [0, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    const getMostOccurance = (cards) => {
        let typeOccurence = [0, 0, 0, 0]
        cards.forEach(c => typeOccurence[TYPE.indexOf(c[0])] += 1)
        let result = typeOccurence.filter(t => t >= 2)
        if(result.length === 1){
            result.push(result[0])
        }
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
        if(code.length < 3){
            code = [6, '/', '/']
        }
        let playerNum = code.shift()

        let yourCard = [code.shift(), code.shift()]

        let yourCardIndex = yourCard.map(c => 13 * TYPE.indexOf(c[0]) + CARD_RANK[NUM.indexOf(c[1])] - 2)
        let cards = code

        let winTable = Game.getWinRate(playerNum, cards)

        let wRate
        try {
            winTable.reduced().print()
            wRate = winTable.table[yourCardIndex[0]][yourCardIndex[1]]
        } catch (e) {
            wRate = [0, 1]
        }
        // put all 'set' functions at the end of a 'handle' function
        setPlayerNum(playerNum)
        setHand(yourCard)
        setFlush(getMostOccurance(cards))
        setCardsRevealed(cards)
        setWinRate((100 * wRate[0] / (wRate[0] + wRate[1])).toFixed())
        setWinTable(winTable)

        console.log(cardsRevealed + '  ' + winRate)

    }

    return (
        <Container style={{width: '300px'}} >
            <WinTableReduced table={winTable} flush={flush} style={{margin: 'auto'}}/>
            <ResultTable code={code} playerNum={playerNum} hand={hand} winRate={winRate} cardsRevealed={cardsRevealed}
               />
            <FormControl  style={{marginTop: '20px'}}>
                <TextField label='Code' id='code' key='code' onChange={setCode}/>

                <Button variant="contained" type='submit' onClick={handleSubmit}>Submit</Button>
            </FormControl>
        </Container>
    );
}
