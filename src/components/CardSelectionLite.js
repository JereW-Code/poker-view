import * as React from 'react';
import getWinRate from '../game/getWinRate';
import WinTableReduced from './WinTableReduced';
import ResultTable from'./ResultTable';
import { Container, Button, TextField, FormControl, ButtonGroup, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');

const lang = require('../lang.json');



export default function CardSelectionLite(props) {

    const [code, setCode] = React.useState('')
    const [winRate, setWinRate] = React.useState('-')
    const [winTable, setWinTable] = React.useState({})
    const [prevWinTable, setPrevWinTable] = React.useState({})
    const [flush, setFlush] = React.useState('ANY')
    const [prevFlush, setPrevFlush] = React.useState('ANY')
    const [playerNum, setPlayerNum] = React.useState('-')
    const [hand, setHand] = React.useState(['/', '/'])
    const [cardsRevealed, setCardsRevealed] = React.useState([])

    const [voiceInput, setVoiceInput] = React.useState('')
    const [codeInput, setCodeInput] = React.useState('')
    const [listening, setListening] = React.useState(false)

    const [isComparing, setIsComparing] = React.useState(false)
    const [situations, setSituations] = React.useState([{
        winTable: {},
        winRate: '-',
        flush: 'ANY',
        playerNum: 6,
        hand: ['/', '/'],
        cardsRevealed: []
    }])
    const [situationIndex, setSituationIndex] = React.useState(0)

    const TYPE = ['S', 'D', 'H', 'C']
    const NUM = ['/', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
    const CARD_RANK = [0, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    let language = props.language

    const pervSituation = () => {
        let index = situationIndex > 1 ? situationIndex - 1 : 1
        console.log(`${situationIndex}->${index}`)
        let s = situations[index]
        let ps = situations[index - 1]
        setSituationIndex(index)
        setPlayerNum(s.playerNum)
        setHand(s.hand)
        setPrevFlush(ps.flush)
        setFlush(s.flush)
        setCardsRevealed(s.cardsRevealed)
        setWinRate(s.winRate)
        setPrevWinTable(ps.winTable)
        setWinTable(s.winTable)
    }

    const nextSituation = () => {
        let index = situationIndex < situations.length - 1 ? situationIndex + 1 : situations.length - 1
        console.log(`${situationIndex}->${index}`)
        let s = situations[index]
        let ps = situations[index - 1]
        setSituationIndex(index)
        setPlayerNum(s.playerNum)
        setHand(s.hand)
        setPrevFlush(ps.flush)
        setFlush(s.flush)
        setCardsRevealed(s.cardsRevealed)
        setWinRate(s.winRate)
        setPrevWinTable(ps.winTable)
        setWinTable(s.winTable)
    }

    const resetSituations = () => {
        console.log('situation reset')
        setSituationIndex(0)
        setSituations([{
            winTable: {},
            winRate: '-',
            flush: 'ANY',
            playerNum: '-',
            hand: ['/', '/'],
            cardsRevealed: []
        }])
        document.getElementById('code').value = ''
        setPlayerNum('-')
        setHand(['/', '/'])
        setPrevFlush('ANY')
        setFlush('ANY')
        setCardsRevealed([])
        setWinRate('-')
        setPrevWinTable({})
        setWinTable({})
        setVoiceInput('')
        setCodeInput('')
    }

    const getVoiceInput = async () => {
        const speechConfig = speechsdk.SpeechConfig.fromSubscription("4d520a20eb2b49299c01bfcd4b887e27", "eastus");
        speechConfig.speechRecognitionLanguage = 'zh-CN';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        console.log('speak into your microphone...')

        setListening(true)

        return await recognizer.recognizeOnceAsync(result => {
            let text;
            if (result.reason === ResultReason.RecognizedSpeech) {
                text = `${result.text}`

                let precode = []
                for(let i = 0; i < text.length; i++){
                    let c = text[i]
                    if(c !== ' ' && c !== '。' && c !== '，'){
                        precode.push(c.toUpperCase())
                    }
                }
                let code = []
                // console.log(precode)
                //模糊处理 voice input
                if(precode[0] === '有') precode[0] = '';
                let usedPass = false
                for(let i = 0; i < precode.length; i++){
                    let c = precode[i]
                    switch (c){
                        case '没':
                        case '梅':
                        case '眉':
                        case '枚':
                        case '媒':
                        case '美':
                            precode[i] = ',[梅花'
                            code.push(' C')
                            break
                        case '方':
                        case '放':
                        case '坊':
                        case '芳':
                        case '翻':
                        case '房':
                            precode[i] = ',[方片'
                            code.push(' D')
                            break
                        case '洪':
                        case '鸿':
                        case '红':
                        case '宏':
                        case '弘':
                            precode[i] = ',[红桃'
                            code.push(' H')
                            break
                        case '黑':
                        case '嗨':
                            precode[i] = ',[黑桃'
                            code.push(' S')
                            break
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                        case 'J':
                        case 'Q':
                        case 'K':
                        case 'A':
                            precode[i] = `${c}]`
                            code.push(c)
                            break
                        case '阿':
                        case '两':
                            precode[i] = '2]'
                            code.push('2')
                            break
                        case '山':
                            precode[i] = '3]'
                            code.push('3')
                            break
                        case '是':
                        case '事':
                        case '式':
                        case '色':
                        case '市':
                        case '泗':
                        case '肆':
                            precode[i] = '4]'
                            code.push('4')
                            break
                        case '我':
                        case '雾':
                        case '武':
                            precode[i] = '5]'
                            code.push('5')
                            break
                        case '留':
                        case 'L':
                        case '利':
                        case '有':
                            precode[i] = '6]'
                            code.push('6')
                            break
                        case '漆':
                            precode[i] = '7]'
                            code.push('7')
                            break
                        case '斑':
                        case '吧':
                        case '包':
                            precode[i] = '8]'
                            code.push('8')
                            break
                        case '酒':
                            precode[i] = '9]'
                            code.push('9')
                            break

                        case '石':
                        case '时':
                        case '使':
                        case '矢':
                        case '史':
                        case '池':
                        case '1':
                            precode[i] = '10]'
                            code.push('T')
                            break
                        case '借':
                        case '结':
                        case '沟':
                        case '钩':
                        case '勾':
                        case '句':
                        case '接':
                        case '街':
                        case '鸡':
                        case '叽':
                            precode[i] = 'J]'
                            code.push('J')
                            break
                        case '圈':
                            precode[i] = 'Q]'
                            code.push('Q')
                            break
                        case '开':
                            precode[i] = 'K]'
                            code.push('K')
                            break
                        case '尖':
                        case '间':
                        case '煎':
                        case '渐':
                        case '笺':
                        case '诶':
                            precode[i] = 'A]'
                            code.push('A')
                            break
                        case '过':
                            if(!usedPass) {
                                precode[i] = ',[过],[过]'
                                code.push(' /')
                                code.push(' /')
                                usedPass = true
                            } else {
                                precode[i] = ''
                                console.log(c)
                            }
                            break
                        default:
                            precode[i] = ''
                            console.log(c)
                            break
                    }
                }
                // process precode for voice input display

                precode.unshift('[人数')
                precode = precode.reduce((a, b) => a + b).split(',')
                // console.log(precode)
                let voiceInputDisplay = []
                for(let i = 0; i < precode.length; i++){
                    let pc = precode[i]
                    switch(i) {
                        case 0:
                            voiceInputDisplay.push(pc)
                            break
                        case 1:
                            voiceInputDisplay.push(` 手牌: ${pc}`)
                            break
                        case 3:
                            voiceInputDisplay.push(` 场牌: ${pc}`)
                            break
                        default:
                            voiceInputDisplay.push(` , ${pc}`)
                            break
                    }
                }
                voiceInputDisplay = voiceInputDisplay.reduce((a, b) => a + b)
                // console.log(voiceInputDisplay)
                //check if input valid
                let inputIsValid = true
                let count = 0
                for(let i = 0; i < voiceInputDisplay.length; i++){
                    let c = voiceInputDisplay[i]
                    if(c === '['){
                        count += 1
                    } else if(c === ']'){
                        count -= 1
                    }
                    if(count > 1 || count < 0){
                        inputIsValid = false
                        break
                    }
                }
                inputIsValid = inputIsValid ? count === 0 : false
                if(inputIsValid) {
                    // process code for win rate calculation
                    code = code.reduce((a, b) => a + b)
                    // console.log(code)
                    document.getElementById('code').value = code

                    setVoiceInput(voiceInputDisplay)
                    setCodeInput(code)
                    setCode(code)
                    setListening(false)
                    handleSubmit()
                } else {
                    text = lang["invalid-voice-input"][language];
                    setVoiceInput(`${text}: ${voiceInputDisplay}`)
                    setListening(false)
                }
            } else {
                text = lang["invalid-voice-input"][language];
                setVoiceInput(text)
                setListening(false)
            }


        });
    }

    const getMostOccurance = (cards) => {
        let typeOccurence = [0, 0, 0, 0]
        cards.forEach(c => typeOccurence[TYPE.indexOf(c[0])] += 1)
        let result = typeOccurence.filter(t => t >= 2)
        if(result.length === 1){
            result.push(result[0])
        }
        if(result.length === 2){
            if(result[0] === 2 && result[1] === 2){
                return TYPE.filter((_,i) => typeOccurence[i] === 2)
            } else if(result[0] === 3 || result[1] === 3){
                return [TYPE[typeOccurence.indexOf(3)], TYPE[typeOccurence.indexOf(3)]]
            }
            return result.map(r => TYPE[typeOccurence.indexOf(r)])
        } else {
            return 'ANY'
        }
    }

    const getCode = (codeUnprocessed) => {

        codeUnprocessed += ' '
        let code = []
        for(let i = 0; i < codeUnprocessed.length - 1; i++){
            let c = codeUnprocessed[i]
            let cNext = codeUnprocessed[i+1]
            if(!(c === ' ' && cNext === ' ')){
                code.push(c)
            }
        }
        // console.log(code)
        if(code.length !== 0) {
            code = code.reduce((a, b) => a + b).split(' ')
            // console.log(code)
            if (code.length < 3) {
                code = [code.length === 0 ? 6 : code[0], '/', '/']
            }
            return code
        } else {
            return [[6], '/', '/']
        }
    }

    const handleSubmit = () => {

        let code = getCode(document.getElementById('code').value.toUpperCase())
        let playerNum = code.shift()
        playerNum = playerNum > 1 ? playerNum : 6

        let yourCard = [code.shift(), code.shift()]

        let yourCardIndex = yourCard.map(c => 13 * TYPE.indexOf(c[0]) + CARD_RANK[NUM.indexOf(c[1])] - 2)
        let cards = code

        let prevFls = flush
        let prevWTable = winTable
        let wTable = getWinRate(playerNum, cards)

        let wRate
        try {
            // wTable.reduced().print()
            wRate = wTable.table[yourCardIndex[0]][yourCardIndex[1]]
        } catch (e) {
            wRate = [0, 1]
        }
        wRate = (100 * wRate[0] / (wRate[0] + wRate[1])).toFixed()

        // save this situation
        let flsh = getMostOccurance(cards)
        let sttnIndex = situationIndex + 1
        let sttns = situations
        sttns.push({
            winTable: wTable,
            winRate: wRate,
            flush: flsh,
            playerNum: playerNum,
            hand: yourCard,
            cardsRevealed: cards
        })
        console.log(sttns)

        // put all 'set' functions at the end of a 'handle' function
        setSituationIndex(sttnIndex)
        setSituations(sttns)
        setPlayerNum(playerNum)
        setHand(yourCard)
        setPrevFlush(prevFls)
        setFlush(flsh)
        setCardsRevealed(cards)
        setWinRate(wRate)
        setPrevWinTable(prevWTable)
        setWinTable(wTable)

    }

    return (
        <Container style={{width: '300px'}} >
            <p style={{margin: '5px', fontSize:'16px'}}>{lang["board-title"][language]}</p>
            <WinTableReduced
                table={winTable}
                flush={flush}
                pTable={prevWinTable}
                pFlush={prevFlush}
                compare={isComparing}
                style={{margin: 'auto'}}/>
            <ResultTable
                code={code}
                playerNum={playerNum}
                hand={hand}
                winRate={winRate}
                cardsRevealed={cardsRevealed}
                language={language}
               />
            <ButtonGroup style={{marginTop: '5px'}}>
                <IconButton onClick={pervSituation} disabled={situationIndex <= 1} >
                    <ArrowBackIcon/>
                </IconButton>
                <IconButton onClick={resetSituations} >
                    <RestartAltIcon />
                </IconButton>
                <IconButton
                    onClick={() => setIsComparing(!isComparing)}
                    color={isComparing ? 'info' : 'default'}
                >
                    <CompareArrowsIcon />
                </IconButton>
                <IconButton onClick={nextSituation} disabled={situationIndex >= situations.length - 1} >
                    <ArrowForwardIcon/>
                </IconButton>
            </ButtonGroup>
            <FormControl  style={{marginTop: '5px'}}>

                <TextField
                    id="outlined-multiline-flexible"
                    disabled
                    multiline
                    maxRows={4}
                    value={voiceInput}
                    placeholder={lang["voice-input-hint"][language]}

                />

                <TextField
                    multiline
                    placeholder={lang["code"][language]}
                    id='code'
                    key='code'
                    value={codeInput.value}
                    onChange={setCodeInput}
                    style={{marginTop:'5px'}}
                />
                <ButtonGroup style={{margin: 'auto', marginTop:'5px'}}>
                    {
                        listening ? (
                            <Button
                                disabled
                                variant="contained"
                                aria-label="voice-input-listening"
                            >{lang["voice-input-listening"][language]}</Button>
                        ) : (
                            <Button
                                variant="outlined"
                                aria-label="voice-input"
                                onClick={getVoiceInput}
                            >{lang["voice-input"][language]}</Button>
                        )
                    }



                    <Button
                        variant="contained"
                        type='submit'
                        onClick={handleSubmit}
                        // style={{margin: '7px'}}
                    >{lang["submit"][language]}</Button>
                </ButtonGroup>
            </FormControl>
        </Container>
    );
}
