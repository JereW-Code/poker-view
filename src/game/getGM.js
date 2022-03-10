import Player from "./Player"
import GameManager from './GameManager'

const Constants = require('./Constants.json');
const TYPE = Constants.TYPE
const NUM = Constants.NUM

export default function getGM(playerNum, cards){
    const ACCURACY = 1

    let players = Array.apply(null, Array(parseInt(playerNum !== '' ? playerNum : 6 + ''))).map((index) => { return new Player(index, 500) })
    let gm = new GameManager(players, ACCURACY)
    gm.displayedCards = cards.filter(c => c.toUpperCase() !== '')
    gm.refreshWinRates()

    return gm
}