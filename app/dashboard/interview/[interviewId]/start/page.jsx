"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswer from './_components/RecordAnswer'
import { Button } from '../../../../../components/ui/button';

function StartInterview({params}) {

    const [interviewData, setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion ]= useState();
    const[activeQuestionIndex,setActiveQuestionIndex]= useState(0);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);
    const GetInterviewDetails = async () => { 
        const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
          const jsonMockResp=JSON.parse(result[0].jsonMockResp);
          console.log(jsonMockResp)
          setMockInterviewQuestion(jsonMockResp);
          setInterviewData(result[0]);
      }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions*/}    
        <QuestionsSection
         mockInterviewQuestion={mockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex} />
        {/*Video/Audio Recording */}
        <RecordAnswer 
         mockInterviewQuestion={mockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex} 
         interviewData={interviewData}
        />
     </div>
     <div className='flex justify-end gap-6'>
      {activeQuestionIndex>0 && <Button>Previous Question</Button>}
      {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button>Next Question</Button>}
      {activeQuestionIndex==mockInterviewQuestion?.length-1 && <Button>End Interview</Button>}
     </div>
    </div>
  )
}

export default StartInterview
