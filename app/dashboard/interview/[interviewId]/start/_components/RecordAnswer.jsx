"use client";
import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../../../../components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswer() {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.forEach((result) => {
            if (result?.transcript) {
                setUserAnswer(prevAns => prevAns + result.transcript);
            }
        });
    }, [results]);

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button variant='outline' className='my-10'
                onClick={isRecording ? stopSpeechToText : startSpeechToText}
            >
                {isRecording ? (
                    <h2 className='text-red-600 flrx gap-2'>
                        <Mic /> Stop Recording
                    </h2>
                ) : (
                    'Record Answer'
                )}
            </Button>
            <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
        </div>
    );
}

export default RecordAnswer;
