import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


export default async function speechToText(){
    const speechConfig = speechsdk.SpeechConfig.fromSubscription("4d520a20eb2b49299c01bfcd4b887e27", "eastus");
    speechConfig.speechRecognitionLanguage = 'zh-CN';

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    console.log('speak into your microphone...')

    return await recognizer.recognizeOnceAsync(result => {
        let text;
        if (result.reason === ResultReason.RecognizedSpeech) {
            text = `RECOGNIZED: Text=${result.text}`
        } else {
            text = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
        }
        console.log(text)
        return text
    });
}