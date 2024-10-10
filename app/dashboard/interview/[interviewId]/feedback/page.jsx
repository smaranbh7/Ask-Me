"use client"
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { UserAnswer } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';


function Feedback({params}) {
 
  const[feedbackList,setFeedbackList]=useState([]);
  useEffect(()=>{
    GetFeedback();
  },[])

  const GetFeedback=async()=>{
    const result= await db.select()
    .from(UserAnswer)
    //.where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gray-500'>Find asked questions with your answers, preferred answers and feedbacks below: </h2>
      {feedbackList && feedbackList.map((item, index) => {
    return (
      <Collapsible key={index}>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 
        text-left flex justify-between gap-7'> 
        {item.question} <ChevronsUpDown className='h-5 w-5'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='w-20 text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 borded rounded-lg bg-red-100 text-sm text-red-900'><strong>Your Answer:</strong>{item.userAns}</h2>
            <h2 className='p-2 borded rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback :</strong>{item.feedback}</h2>
            <h2 className='p-2 borded rounded-lg bg-green-50 text-sm text-green-900'><strong>Suggested Answer:</strong>{item.correctAns}</h2>
            
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
})}
    </div>
  )
}

export default Feedback

