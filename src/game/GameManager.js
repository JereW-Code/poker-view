import WinTable from './WinTable'
import Board from './Board'
import Deck from './Deck'

export default class GameManager{
    constructor(players, winTableAccuracy = 1) {
        this.players = players
        this.numOfRemainingPlayers = players.length
        this.board = new Board(players)
        this.displayedCards = []
        this.winTable = new WinTable()
        this.testTime = 100000 * winTableAccuracy
        this.leastBet = 10
        this.deck = new Deck()
        this.deck.shuffle()
        this.running = false
        this.maxRaiseTime = 2
    }

    restart(){

        this.players.forEach(player => player.isOut = false)
        this.board = new Board(this.players)
        this.displayedCards = []
        this.numOfRemainingPlayers = this.players.length
        this.deck = new Deck()
        this.deck.shuffle()
        this.running = false
        this.winTable = new WinTable()
    }

    run(){
        if(this.players.length === 1){
            return
        }

        this.running = true
        // this.bet(true)

        console.log('\n>> Dealing cards')
        this.deal()
        console.log('\n>> Blind bet')
        this.bet(true)
        if(!this.running) return

        this.reveal(3)
        this.board.bet = this.leastBet

        console.log('\n>> 1st bet')
        this.bet()
        if(!this.running) return
        this.reveal(1)
        this.board.bet = this.leastBet

        console.log('\n>> 2nd bet')
        this.bet()
        if(!this.running) return
        this.reveal(1)
        this.board.bet = this.leastBet

        console.log('\n>> 3rd bet')
        this.bet()
        if(!this.running) return
        this.win(this.board.getWinner(false, this.players).info)
    }

    moveBlind(){
        this.players.push(this.players.shift())
    }

    reveal(amount){
        this.deck.draw(amount).forEach(card => {
            this.displayedCards.push(card)
        })
        console.log('reveal card ' + this.displayedCards)
    }

    deal(){
        this.players.forEach(player => {
            if(player.cash !== 0){
                player.hand = this.deck.draw(2)
            }
        })
        console.log('Cards dealt: ' + this.players.map(p => '(p' + p.id + ': '+ p.hand + ')  '))
    }

    refreshWinRates(){
        console.log('refreshing win rates...')
        this.winTable = new WinTable()
        for(let t = 0; t < this.testTime; t++) {
            this.board.refreshDeck()
            this.board.deal(this.displayedCards)

            let winnerIndex = this.board.getWinner().index
            this.players.forEach((player, index) => {
                if(!player.isOut) {
                    this.winTable.record(player.handBuffer, index === winnerIndex)
                }
            })
        }
        // this.winTable.reduced().print()
    }

    refreshPlayerBets(){
        this.players.forEach(player => player.bet = 0)
    }

    win(player){
        console.log('\n>>>>p' + player.id + ' wins<<<<')
        this.running = false
        player.cash += this.board.pot
        this.board.pot = 0

        console.log('>> player quit: ' + this.players.filter(p => p.cash < this.leastBet).map(p => '<' + p.id + ': ' + p.cash + '>'))
        this.players = this.players.filter(p => p.cash >= this.leastBet)

        this.moveBlind()
        let totalCash = 0
        this.players.forEach(p => totalCash += p.cash)
        console.log('total cash: ' + totalCash + ' -> '
            + this.players.map((a) => '<' + a.id + ': ' + a.cash + '$> '))
    }

    bet(isBlind = false){
        this.refreshWinRates()
        this.refreshPlayerBets()
        let numOfChecks = 0
        if(isBlind) {
            this.players[0].raise(this.board, this.leastBet / 2)
            this.players[1].raise(this.board, this.leastBet)
        }
        for(let i = 0; i < this.maxRaiseTime && numOfChecks !== this.numOfRemainingPlayers - 1 && this.numOfRemainingPlayers > 1; i++) {

            this.players.forEach((player, index) => {
                if(isBlind){
                    if(index >= 1) isBlind = false;
                    return;
                }
                if(!player.isOut) {
                    let winRate = this.winTable.getWinRateOfHand(player.hand)
                    let action = player.decide(this.board, winRate)
                    if (action.isFold) {
                        this.refreshWinRates()
                        this.numOfRemainingPlayers -= 1
                    } else if (action.isCheck) {
                        numOfChecks += 1
                    }
                }
            })
            console.log('current pot: ' + this.board.pot + '\n-------------\n')
            console.log(this.players.map((a) => '<' + a.id + ': ' + a.cash + ' $> ').reduce((a, b) => a + b))
        }
        if(numOfChecks === this.numOfRemainingPlayers - 1 || this.numOfRemainingPlayers === 1){
            this.win(this.players.find(player => !player.isOut))
        }
    }
}