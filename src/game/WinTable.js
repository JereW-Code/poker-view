const NUM = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const TYPE = ['S', 'D', 'H', 'C']

export default class WinTable{
    constructor(isReduced, prebuiltTable = []) {
        this.isReduced = isReduced
        if(prebuiltTable.length === 0){
            this.table = isReduced ? this.createArray(13, 13, 2).map(col => col.map(() => [0, 1])) : this.createArray(13 * 4, 13 * 4, 2).map(col => col.map(() => [0, 1]))
        } else {
            this.table = prebuiltTable
        }
    }

    createArray(length) {
        let arr = new Array(length || 0),
            i = length;

        if (arguments.length > 1) {
            let args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = this.createArray.apply(this, args);
        }

        return arr;
    }

    getHandIndex(hand){
        // a hand is a list of two cards
        let highIndex
        let lowIndex
        if(!this.isReduced){
            highIndex = Math.max((hand[0].getRank() - 2) + 13 * (hand[0].type), (hand[1].getRank() - 2) + 13 * (hand[1].type))
            lowIndex = Math.min((hand[0].getRank() - 2) + 13 * (hand[0].type), (hand[1].getRank() - 2) + 13 * (hand[1].type))
        } else {
            highIndex = Math.max((hand[0].getRank() - 2), (hand[1].getRank() - 2))
            lowIndex = Math.min((hand[0].getRank() - 2), (hand[1].getRank() - 2))
        }

        return {
            high: highIndex,
            low: lowIndex
        }
    }

    record(hand, isWin) {
        isWin = isWin ? 0 : 1
        let index = this.getHandIndex(hand)
        if(this.isReduced){
            if (hand[0].type === hand[1].type) {
                this.table[index.low][index.high][isWin] += 1
            } else {
                this.table[index.high][index.low][isWin] += 1
            }
        } else {
            this.table[index.high][index.low][isWin] += 1
            this.table[index.low][index.high][isWin] += 1
        }

    }

    getWinRateOfHand(hand){
        // hand = Card.strToCard(hand)
        let index = this.getHandIndex(hand)
        let result
        if(this.isReduced){
            if (hand[0].type === hand[1].type) {
                result = this.table[index.low][index.high]
            } else {
                result = this.table[index.high][index.low]
            }
        } else {
            result = this.table[index.high][index.low]
        }
        return result[0] / (result[1] + result[0])
    }

    reduced(type = 'ANY'){
        if(!this.isReduced){
            let reducedTable = this.createArray(13, 13, 2).map(col => col.map(() => [0, 1]))
            this.table.forEach((col, colIndex) => {
                col.forEach((card, cardIndex) => {
                    if(cardIndex < colIndex) {
                        let highIndex = Math.max(colIndex % 13, cardIndex % 13)
                        let lowIndex = Math.min(colIndex % 13, cardIndex % 13)
                        //if type are the same

                        if((type === 'ANY' || Math.floor(colIndex / 13) === TYPE.indexOf(type[0]) || Math.floor(colIndex / 13) === TYPE.indexOf(type[1]))
                            && Math.floor(cardIndex / 13) === Math.floor(colIndex / 13)) {
                            [highIndex, lowIndex] = [lowIndex, highIndex]
                        }
                        reducedTable[highIndex][lowIndex][0] += card[0]
                        reducedTable[highIndex][lowIndex][1] += card[0] !== 0 ? card[1] : 1
                    }
                })
            })
            return new WinTable(true, reducedTable)
        }
        return this
    }

    print(){
        let tableMapped = this.table.map(col => col.map(e => {
            e = (10 * (e[0] / (e[1] + e[0] + 1)).toFixed(1)).toFixed()

            switch (e){
                case '10':
                    e = '*'
                    break
                case '2':
                    e = ':'
                    break
                case '1':
                    e = '.'
                    break
                case '0':
                    e = ' '
                    break
            }
            return e === '10' ? '*' : e
        }))
        if(!this.isReduced) {
            let head = []
            for (let i = 0; i < 52; i++) {
                head.push(TYPE[Math.floor(i / 13)] + NUM[i % 13] + '|')
            }
            console.log(' \\|' + head.reduce((a, b) => a + b))
            tableMapped.forEach((col, index) => console.log(TYPE[Math.floor(index / 13)] + NUM[index % 13] + '| ' + col.reduce((a, b) => a + '| ' + b) + '|'))
            console.log(' /|' + head.reduce((a, b) => a + b))
        } else {
            console.log('\\| ' + NUM.reduce((a, b) => a + ' | ' + b) + ' |')
            tableMapped.forEach((col, index) => console.log(NUM[index] + '| ' + col.reduce((a, b) => a + ' | ' + b) + ' |'))
        }
        console.log('\n\n')
    }

    printMatrix() {
        let tableMapped = this.table.map(col => col.map(e => {
            return e[0] + '/' + (e[1] + e[0] + 1)
        }))
        console.log('[')
        if (!this.isReduced) {

            tableMapped.forEach(col => console.log(col.reduce((a, b) => a + ' ' + b) + ';'))

        } else {
            tableMapped.forEach(col => console.log(col.reduce((a, b) => a + ' ' + b) + ';'))
        }
        console.log(']\n\n')
    }
}
