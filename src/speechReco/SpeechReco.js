import React, { Component } from 'react';
import { Container, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


export default class SpeechReco extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayText: 'INITIALIZED: ready to test speech...'
        }
    }


    async sttFromMic() {
        const speechConfig = speechsdk.SpeechConfig.fromSubscription("4d520a20eb2b49299c01bfcd4b887e27", "eastus");
        speechConfig.speechRecognitionLanguage = 'zh-CN';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            displayText: 'speak into your microphone...'
        });

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: displayText
            });
        });
    }

    render() {
        return (
            <Container className="app-container">
                <div className="row main-container">
                    <div className="col-6">
                        <IconButton aria-label="delete" className="fas fa-microphone fa-lg mr-2" onClick={() => this.sttFromMic()}>
                            <MicIcon/>
                        </IconButton>

                    </div>
                    <div className="col-6 output-display rounded">
                        <code>{this.state.displayText}</code>
                    </div>
                </div>
            </Container>
        );
    }
}