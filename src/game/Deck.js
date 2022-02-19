import Card from './Card'


export default class Deck{
    constructor() {
        this.cards = []
        for(let num = 1; num <= 13; num++){
            for(let kind = 0; kind < 4; kind++){
                this.cards.push(new Card(num, kind))
            }
        }
    }

    draw(amount = 0){
        let result = []
        for(let i = 0; i < amount; i++){
            result.push(this.cards.pop())
        }
        return result
    }

    pick(cards){
        let result = []
        let deck = this
        cards.forEach(cardWanted => {
            result.push(deck.cards.find(card => card.compareStr(cardWanted)))
            deck.cards = deck.cards.filter(card => !card.compareStr(cardWanted))
        })
        return result
    }

    shuffle(){
        let currentIndex = this.cards.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] = [
                this.cards[randomIndex], this.cards[currentIndex]];
        }

        return this.cards;
    }

    toString(){
        return this.cards.map(card => card.toString())
    }
}
