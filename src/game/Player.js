export default class Player{
    constructor(id, cash) {
        this.id = id
        this.cash = cash
        this.hand = []
        this.handBuffer = []
        this.isOut = false
        this.bet = 0
        this.isAllIn = false
    }

    join(hand){
        this.handBuffer = hand
        this.isOut = false
    }

    decisionFunction(board, winRate){
        return winRate
    }

    decide(board, winRate){
        let decisionFactor = this.decisionFunction(board, winRate)
        console.log('p' + this.id + ' deciding...  (' + decisionFactor.toFixed(2) + ')')

        let result = {
            isFold: null,
            isCheck: null,
            bet: null
        }

        if(decisionFactor > 0.2 && this.cash >= 2 * board.bet && board.bet !== 0 && board.bet !== 0){
            result.bet = this.raise(board, 2 * board.bet)
        } else if(decisionFactor > 0.15 && this.cash >= board.bet){
            result.bet = this.call(board, board.bet)
        } else {
            if(this.bet === board.bet){
                this.check()
                result.isCheck = true
            } else {
                this.fold(board)
                result.isFold = true
            }
        }

        return result
    }

    fold(){
        console.log('player' + this.id + ' folds (' + this.bet + ')')
        this.handBuffer = []
        this.isOut = true
    }

    raise(board, bet){
        console.log('player' + this.id + ' raises to ' + bet)
        let cost = bet - this.bet
        this.cash -= cost
        board.pot += cost
        board.bet = bet
        this.bet = bet
        return bet
    }

    call(board){
        console.log('player' + this.id + ' calls (' + board.bet + ')')
        let cost = board.bet - this.bet
        this.cash -= cost
        board.pot += cost
        this.bet = board.bet
        return board.bet
    }

    check(){
        console.log('player' + this.id + ' checks (' + this.bet + ')')
    }

    allIn(board){
        console.log('player' + this.id + ' all in (' + this.bet + ')')
        this.isAllIn = true
        let cost = this.cash
        this.cash = 0
        board.pot += cost
        this.bet = cost
        return cost
    }

    toString(){
        return 'bet: ' + this.bet + ' cash: ' + this.cash + ' card: ' + this.handBuffer
    }
}
