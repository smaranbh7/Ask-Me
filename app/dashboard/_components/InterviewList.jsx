"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard'

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
 
    useEffect(() => {
       if (user?.primaryEmailAddress) {
           GetInterviewList();
           

       }
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))    
            .orderBy(desc(MockInterview.id));
        
        setInterviewList(result);
        console.log(result);
        
    };

    return (
        <div>
            <h2 className='font-medium text-xl mb-4'>Previous Mock Interviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 my-3'>
                {interviewList.map((interview, index) => (
                    <InterviewItemCard key={interview.id} interview={interview} />
                    
                ))}
            </div>
        </div>
    )
}

export default InterviewList;
