import Scorer from './Scorer'
import Deck from './Deck'

 export default class Board {
    constructor(players) {
        this.players = players
        this.pot = 0
        this.bet = 0
        this.displayCards = []
        this.deck = new Deck()
        this.blind = [0, 1]
    }

    deal(selectedCards = [], hand = []){
        this.refreshDeck()

        if(hand.length === 0){
            this.displayCards = this.deck.pick(selectedCards).concat(this.deck.draw(5 - selectedCards.length))
            this.players.forEach(player => {
                if(!player.isOut) {
                    player.join(this.deck.draw(2))
                }
            })
        } else {
            this.players[0].join(this.deck.pick(hand))
            this.displayCards = this.deck.pick(selectedCards).concat(this.deck.draw(5 - selectedCards.length))
            for(let i = 1; i < this.players.length; i++){
                if(!this.players[i].isOut){
                    this.players[i].join(this.deck.draw(2))
                }
            }

        }

    }

    refreshDeck(){
        this.deck = new Deck()
        this.deck.shuffle()
    }

    moveBlind(){
        this.players.push(this.players.shift())
    }

    getWinner(useBuffer = true, players = this.players){
        if(useBuffer === false) {
            console.log('getting winner...')
        }

        let winnerIndex = 0
        let winner = players[winnerIndex]
        players.forEach((player, index) => {
            if(!player.isOut){
                if(winner.isOut){
                    winner = player
                } else {
                    if(Scorer.comparePlayer(this.displayCards, player, winner, useBuffer) > 0){
                        winner = player
                        winnerIndex = index
                    }
                }
            }

        })
        return {
            index: winnerIndex,
            info: winner
        }
    }

    toString(){
        let cardStr = 'cards: ' + this.displayCards.map(card => card.toString()) + '\n'
        let potStr = 'pot: ' + this.pot + '\n'
        let blindStr = 'blind: ' + this.blind + '\n'
        let playersStr = this.players.map((player, index) => {
            // return '\n' + "player" + index + ": " + player
            return `\nplayer${index}: ${player}`
        })
        return cardStr + blindStr + potStr + playersStr
    }
}