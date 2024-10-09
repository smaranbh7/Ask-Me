"use client";
import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../../../../components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '../../../../../../utils/GeminiAIModel';

function RecordAnswer(mockInterviewQuestion,activeQuestionIndex) {
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

    const SaveUserAnswer=async()=>{
        if(isRecording){
            stopSpeechToText();
            if(userAnswer?.length<10){
                toast('Error while saving your anser. Please record again.')
                 return ;
            }

            const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
            ", User Answer:"+userAnswer+",Depending on question and user answer for the given question"+
            " please give us rating for answer and feedback as area of improvement if any"+
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"

            const result= await chatSession.sendMessage(feedbackPrompt);

            const mockJsonResp=(result.response.text())
            .replace('```json', '')
            .replace('```', '');
            console.log(mockJsonResp)

        }else{
            startSpeechToText();
        }
    }

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
                onClick={SaveUserAnswer}
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
