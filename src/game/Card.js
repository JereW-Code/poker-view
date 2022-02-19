const TYPE = ['S', 'D', 'H', 'C']
const NUM = ['/', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
const CARD_RANK = [0, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export default class Card {
    constructor(num, type) {
        this.num = num
        this.type = type
    }

    static strToCard(arrOfStr){
        arrOfStr = arrOfStr.map(str => new Card(
            NUM.indexOf(str[1]),
            TYPE.indexOf(str[0])
        ))
        return arrOfStr
    }

    compareStr(card){
        return this.toString() === card.toString()
    }

    getRank(){
        return CARD_RANK[this.num]
    }

    toString(){
        let type = TYPE[this.type]
        let num = NUM[this.num]
        return type + num
    }
}
