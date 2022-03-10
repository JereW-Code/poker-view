const Constants = require('../game/Constants.json');
const TYPE = Constants.TYPE
const NUM = Constants.NUM
const CARD_RANK = Constants.CARD_RANK

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
