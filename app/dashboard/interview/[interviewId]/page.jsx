"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '../../../../components/ui/button'

//params contains interview id to get dynamic interview id
function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
  }, [params.interviewId]);

  // Getting interview details by mockId 
  const GetInterviewDetails = async () => { 
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]); 
    setLoading(false); // Set loading to false once data is fetched
  }

  return (
    <div className='my-10 flex justify-center flex-col items-center'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-5'>
          {/* Render loading state or interview data */}
          {loading ? (
            <p>Loading interview details...</p> // Loading message
          ) : (
            <>
              <h2><strong>Job Role/Position:</strong> {interviewData?.jobPosition}</h2>
              <h2><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc}</h2>
              <h2><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
            </>
          )}
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam 
              mirrored={true} // Mirror view in camera
              style={{
                height: 300,
                width: 300
              }} 
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
              <Button className="w-full" onClick={() => setWebcamEnabled(true)}>
                Enable Web cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Interview;
