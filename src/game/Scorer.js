export default class Scorer{

    static sortCards(cards){
        return cards.sort((a, b) => {
            return a.getRank() - b.getRank()
        })
    }
    static classifyCards(cards){
        let result = [[], [], [], []]
        cards.forEach(card => result[card.type].push(card))
        return result
    }


    // 5
    static flush(cardsClassified){
        let result = cardsClassified.find(cardsOfKind => cardsOfKind.length >= 5) || false
        return result ? Scorer.sortCards(result) : false
    }

    //6
    static straight(cardsSorted){
        let count = 1
        if(cardsSorted[0].num === 2 && cardsSorted[cardsSorted.length - 1].num === 1){
            count = 2
        }

        let highIndex = null
        for(let i = 0; i < cardsSorted.length - 1; i++){
            if(cardsSorted[i].getRank() + 1 === cardsSorted[i + 1].getRank()){
                count += 1
                highIndex = i + 1
            } else {
                if(count >= 5) break
                else count = 1
            }
            if(count + cardsSorted.length - 1 - i < 5) break
        }
        return count >= 5 ? cardsSorted[highIndex] : false
    }

    // 9 7 8 3 4
    static pair(cardSorted){
        let result = [[], [], []]
        let success = false
        for(let i = 0; i < cardSorted.length - 1; i++){
            let count = 1
            while(i < cardSorted.length - 1 && cardSorted[i].num === cardSorted[i + 1].num){
                count += 1
                i++
            }
            if(count >= 2){
                result[count - 2].push(cardSorted[i])
                success = true
            }
        }
        if(success){

            if(result[2].length > 0) {
                result[0] = []
                result[1] = []
            }
            while(result[1].length > 1) result[1].shift()
            while(result[0].length + result[1].length > 2) result[0].shift()

            return result
        } else {
            return false
        }
    }

    static compareScore(aScore, bScore){
        let result = 0
        if(aScore[0] === bScore[0]){
            if(aScore[1].length === 1){
                result = aScore[1][0] - bScore[1][0]
            } else if (aScore[1].length === 0 && bScore[1].length === 0){
                result = 0
            } else {
                for(let i = aScore[1].length - 1; result === 0 && i > 0; i--){
                    result += aScore[1][i] - bScore[1][i]
                }
            }
        } else {
            result = bScore[0] - aScore[0]
        }
        return result
    }

    static comparePlayer(boardCards, aPlayer, bPlayer, useBuffer = true){

        let handA = useBuffer ? aPlayer.handBuffer : aPlayer.hand
        let handB = useBuffer ? bPlayer.handBuffer : bPlayer.hand
        let scoreA = Scorer.getScore(boardCards.concat(handA))
        let scoreB = Scorer.getScore(boardCards.concat(handB))
        let result = Scorer.compareScore(scoreA, scoreB)
        if (result === 0){
            scoreA = Scorer.getScore(handA)
            scoreB = Scorer.getScore(handB)
            result = Scorer.compareScore(scoreA, scoreB)
        }
        return result
    }

    static getScore(cards){
        let result = [10, null]  //type, value
        let cardsSorted = Scorer.sortCards(cards)
        let cardsClassified = Scorer.classifyCards(cards)

        //5 - flush
        let cardsScored = Scorer.flush(cardsClassified)
        if(cardsScored){
            //2 - straight flush
            let buffer = Scorer.straight(cardsScored)
            if(buffer){
                //1 - royal flush
                if(buffer.getRank() === 14){
                    //1
                    result = [1, []]
                } else {
                    //2
                    result = [2, [buffer.getRank()]]
                }
            }
            else{
                //5
                cardsScored = cardsScored.slice(cardsScored.length - 5, cardsScored.length)
                result = [5, cardsScored.map(card => card.getRank())]
            }
        } else {
            //6 - straight
            cardsScored = Scorer.straight(cardsSorted)
            if(cardsScored){
                //6
                result = [6, [cardsScored.getRank()]]
            } else {
                cardsScored = Scorer.pair(cardsSorted)
                if(cardsScored){
                    let switchCode = cardsScored[0].length * 100 + cardsScored[1].length * 10 + cardsScored[2].length
                    switch(switchCode){
                        //3 - four of a kind
                        case 1:
                            result = [3, [cardsScored[2][0].getRank()]]
                            break
                        //4 - full house
                        case 110:
                            result = [4, [cardsScored[0][0].getRank(), cardsScored[1][0].getRank()]]
                            break
                        //7 - three of a kind
                        case 10:
                            result = [7, [cardsScored[1][0].getRank()]]
                            break
                        //8 - two pairs
                        case 200:
                            result = [8, [cardsScored[0][0].getRank(), cardsScored[0][1].getRank()]]
                            break
                        //9 - pair
                        case 100:
                            result = [9, [cardsScored[0][0].getRank()]]
                            break
                        default:
                            break
                    }
                } else {
                    //10 - high card
                    result = [10, [cardsSorted[cardsSorted.length - 1].getRank()]]
                }

            }
        }

        return result
    }

    static scoreToSting(score){
        const TYPE = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight',
            'Flush', 'Full House', 'Four of a Kind', 'Straight Flush', 'Royal Flush']
        let type = TYPE[10 - score[0]]
        let value = score[1].map(card => card.toString())

        return '<' + (10 - score[0]) + ' ' + type + '> ' + value

    }
}