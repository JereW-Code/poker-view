import Player from "./Player"
import GameManager from './GameManager'
import WinTable from './WinTable'

const Constants = require('./Constants.json');
const TYPE = Constants.TYPE
const NUM = Constants.NUM

export default function getWinRate(playerNum, cards){
        const ACCURACY = 1

        let players = Array.apply(null, Array(parseInt(playerNum !== '' ? playerNum : 6 + ''))).map((index) => { return new Player(index, 500) })
        let gm = new GameManager(players, ACCURACY)
        gm.displayedCards = cards.filter(c => c.toUpperCase() !== '')
        // console.log(gm.displayedCards)
        gm.refreshWinRates()

        // console.log('\nThe win rate of all hands: ')
        // gm.winTable.print()
        // console.log('Number of players: ' + playerNum)
        // console.log('Cards revealed: ' + gm.displayedCards)



        return gm.winTable
}
