import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const START_TIME = 'startTime'
const END_TIME = 'endTime'

const Dictaphone1 = () => {
    const [message, setMessage] = useState('');
    const [time, setTime] = useState({ [START_TIME]: '00:00', [END_TIME]: '00:00' })

    const handleChange = (e, key) => {
        setTime({ ...time, [key]: e.target.value })
    }

    const savePunch = () => {
        alert(`Punch saved from: ${time.startTime} - ${time.endTime}`)
    }

    const extractPunchFromText = (text, punchType) => {
        const event = { target: { value: text }}
        handleChange(event, punchType)
    }

 const commands = [
    {
        command: '* punch *',
        callback: (command, time) => {
            if (command === 'start' || command === 'in') {
                extractPunchFromText(time, START_TIME)
            } else if (command === 'out' || command === 'end'){
                extractPunchFromText(time, END_TIME)
            } else if (command === 'save' || command === 'create') {
                savePunch()
            }
        }
    },
   {
     command: 'reset',
     callback: () => resetTranscript()
   },
   {
     command: 'shut up',
     callback: () => setMessage('I wasn\'t talking.')
   },
   {
     command: 'Hello',
     callback: () => setMessage('Hi there!')
   },
 ]
 const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition({ commands });

 useEffect(() => {
   if (finalTranscript !== '') {
     console.log('Got final result:', finalTranscript);
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }
 const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'en-GB',
   });
 };
 return (
   <div>
     <div>
       <span>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
            <input type='text' value={time.startTime} onChange={ (e) => handleChange(e, START_TIME) }/>
            <input type='text' value={time.endTime} onChange={ (e) => handleChange(e, END_TIME) }/>
            <button type="button" onClick={savePunch}>Save punch</button>
            <hr />
            <button type="button" onClick={resetTranscript}>Reset</button>
            <button type="button" onClick={listenContinuously}>Listen</button>
            <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
       </div>
     </div>
     <div>
       {message}
     </div>
     <div>
       <span>{transcript}</span>
     </div>
   </div>
 );
};

export default Dictaphone1;