"use client"; // Make sure this is the first line
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { UserAnswer } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
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

    console.log(result);
    setFeedbackList(result);

    // Calculate overall rating
    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + parseFloat(item.rating), 0);
      const averageRating = (totalRating / result.length).toFixed(1);
      setOverallRating(averageRating);
    }
  };

  return (
    <div className='p-10'>
      {feedbackList.length === 0 ? (
        <div>
          <h2 className='font-bold text-xl text-gray-500'>No feedback available for this interview.</h2>
          <Button className="mt-4" onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
      ) : (
        <>
          <h2 className='text-2xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

          <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>{overallRating}/10</strong></h2>

          <h2 className='text-sm text-gray-500'>Find asked questions with your answers, preferred answers, and feedbacks below:</h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'> 
                {item.question} <ChevronsUpDown className='h-5 w-5'/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='w-20 text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                  <h2 className='p-2 border rounded-lg bg-red-100 text-sm text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback:</strong> {item.feedback}</h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Suggested Answer:</strong> {item.correctAns}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
          <Button className="mt-4" onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </>
      )}
    </div>
  );
}

export default Feedback;
