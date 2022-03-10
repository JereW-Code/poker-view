import React from 'react';
import Button from '@mui/material/Button';
import GameManager from '../game/GameManager'
import Player from '../game/Player'
import Board from '../components/Board'
// const lang = require('../lang.json')


const PLAYER_NUM = 6



export default function AIDisplay() {
    // const [language, setLanguage] = React.useState(1)
    
    const [gameManager, setGameManager] = React.useState(new GameManager(Array.apply(null, Array(PLAYER_NUM)).map((p, index) => { return new Player(index, 500) })))
    const deal = () => {
        let GM = new GameManager(Array.apply(null, Array(PLAYER_NUM)).map((p, index) => { return new Player(index, 500) }))
        GM.deal()
        GM.refreshWinRates()
        setGameManager(GM)
    }
    
    const reveal = () => {
        if(gameManager.displayedCards.length < 5){
            let GM = gameManager.copy()
            GM.reveal(GM.displayedCards.length === 0 ? 3 : 1)
            GM.refreshWinRates()

            setGameManager(GM)
        } else {
            console.log('all cards have revealed')
        }
    }

    return (
        <div>
            <h3>AI Display</h3>
            <Button variant="text" onClick={deal}>deal</Button>
            <Button variant="text" onClick={reveal}>reveal</Button>
            <Board gameManager={gameManager}/>
        </div>
    );
}