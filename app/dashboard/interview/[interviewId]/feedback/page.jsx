"use client"; // Make sure this is the first line
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { UserAnswer } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../components/ui/collapsible";
import { ChevronsUpDown, Star, ThumbsUp, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { useRouter } from 'next/navigation'; 

function Feedback({ params }) {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState('X');

  useEffect(() => {
    GetFeedback();
  }, [params]);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);

    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + parseFloat(item.rating), 0);
      const averageRating = (totalRating / result.length).toFixed(1);
      setOverallRating(averageRating);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
      {feedbackList.length === 0 ? (
        <div className="text-center py-20">
          <h2 className='font-bold text-2xl text-gray-700 mb-4'>No feedback available for this interview.</h2>
          <Button className="mt-4" onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className='text-3xl font-bold text-green-600 mb-2'>Congratulations!</h2>
            <h3 className='text-xl font-semibold text-gray-700 mb-4'>Here's your interview feedback</h3>
            <div className="flex items-center justify-center bg-blue-50 p-4 rounded-lg">
              <Star className="text-yellow-400 w-8 h-8 mr-2" />
              <h2 className='text-2xl font-bold text-blue-600'>Overall Rating: <span className="text-3xl">{overallRating}/10</span></h2>
            </div>
          </div>

          <h2 className='text-lg font-semibold text-gray-600 mb-4'>Detailed Feedback:</h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mb-4 bg-white rounded-lg shadow-sm overflow-hidden'>
              <CollapsibleTrigger className='p-4 w-full text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200'> 
                <span className="font-medium text-gray-800">{item.question}</span>
                <ChevronsUpDown className='h-5 w-5 text-gray-500'/>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <div className='grid gap-4'>
                  <div className='flex items-center'>
                    <Star className='h-5 w-5 text-yellow-500 mr-2'/>
                    <span className='font-semibold text-gray-700'>Rating: {item.rating}/10</span>
                  </div>
                  <div className='bg-red-50 p-3 rounded-md'>
                    <h3 className='font-semibold text-red-700 mb-1 flex items-center'>
                      <MessageCircle className='h-4 w-4 mr-2'/>
                      Your Answer:
                    </h3>
                    <p className='text-gray-800'>{item.userAns}</p>
                  </div>
                  <div className='bg-blue-50 p-3 rounded-md'>
                    <h3 className='font-semibold text-blue-700 mb-1 flex items-center'>
                      <ThumbsUp className='h-4 w-4 mr-2'/>
                      Feedback:
                    </h3>
                    <p className='text-gray-800'>{item.feedback}</p>
                  </div>
                  <div className='bg-green-50 p-3 rounded-md'>
                    <h3 className='font-semibold text-green-700 mb-1 flex items-center'>
                      <CheckCircle className='h-4 w-4 mr-2'/>
                      Suggested Answer:
                    </h3>
                    <p className='text-gray-800'>{item.correctAns}</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
          <div className="text-center mt-8">
            <Button className="px-6 py-2" onClick={() => router.replace('/dashboard')}>Return to Dashboard</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
