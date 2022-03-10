import GameManager from './GameManager'
import WinTable from './WinTable'

const Constants = require('./Constants.json');
const TYPE = Constants.TYPE
const NUM = Constants.NUM

export default function getFutureGM(gm){

    let gmFuture = new GameManager(gm.players.slice(), 0.08)
    let cardsCurr = gm.displayedCards
    let winTableFuture = new WinTable(false)
    for(let i = 0; i < 52; i++){
        let vaild = false
        let cardsFuture = cardsCurr.slice()
        let cardFuture
        while(!vaild) {
            vaild = true
            cardFuture = TYPE[Math.floor(i % 4)] + NUM[Math.floor(i % 13)]
            cardsCurr.forEach(c => {
                vaild = c !== cardFuture && vaild
            })
            if(!vaild) i++;
        }
        cardsFuture.push(cardFuture)
        // console.log(cardsFuture)
        gmFuture.displayedCards = cardsFuture
        gmFuture.refreshWinRates()
        for(let i = 0; i < gm.winTable.table.length; i++){
            for(let j = 0; j < gm.winTable.table[i].length; j++){
                let cell = gm.winTable.table[i][j]
                let cellFuture = gmFuture.winTable.table[i][j]
                let cellWR = cell[0] / (cell[0] + cell[1])
                let cellFutureWR = cellFuture[0] / (cellFuture[0] + cellFuture[1])
                let resultCell = [0, 0.33]
                let e = 0.3
                if(cellWR < cellFutureWR - e || cellFutureWR > 0.6){
                    resultCell = [1, 0]
                }else if(cellWR > cellFuture + e){
                    resultCell = [0, 2]
                }
                gmFuture.winTable.table[i][j] = resultCell
            }
        }
        winTableFuture.add(gmFuture.winTable)
        // gmFuture.winTable.reduced().print()
    }
    gmFuture.winTable = winTableFuture
    return gmFuture

}




