import { Lightbulb, Volume2, HelpCircle } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        } else {
            alert('Sorry, your browser does not support text to speech')
        }
    }

    return mockInterviewQuestion && (
        <div className='bg-white shadow-lg rounded-xl p-6 my-10'>
            <h2 className='text-2xl font-bold mb-6 text-primary'>Interview Questions</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8'>
                {mockInterviewQuestion.map((question, index) => (
                    <button 
                        key={index}
                        className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                        ${activeQuestionIndex === index 
                            ? 'bg-primary text-white shadow-md transform scale-105' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Q{index + 1}
                    </button>
                ))}
            </div>
            <div className='bg-gray-50 rounded-lg p-6 mb-6'>
                <div className='flex justify-between items-start mb-4'>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {mockInterviewQuestion[activeQuestionIndex]?.question}
                    </h3>
                    <button 
                        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                        className='text-primary hover:text-primary-dark transition-colors duration-200'
                        title="Listen to question"
                    >
                        <Volume2 className='w-6 h-6' />
                    </button>
                </div>
                <p className='text-gray-600 italic'>
                    Click the speaker icon to hear the question read aloud.
                </p>
            </div>
            <div className='bg-blue-50 rounded-lg p-6'>
                <h3 className='flex items-center text-lg font-semibold text-blue-700 mb-3'>
                    <Lightbulb className='w-5 h-5 mr-2'/>
                    Important Note
                </h3>
                <p className='text-blue-600'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</p>
            </div>
        </div>
    )
}

export default QuestionsSection
