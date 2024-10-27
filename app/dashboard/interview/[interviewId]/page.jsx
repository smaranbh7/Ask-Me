"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon, Briefcase, FileText, Clock } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => { 
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]); 
    setLoading(false);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className='max-w-6xl mx-auto my-10 px-4'>
      <h2 className='font-bold text-3xl mb-8 text-center text-primary'>Prepare for Your Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
            <h3 className='font-semibold text-xl mb-4 text-primary flex items-center'>
              <Briefcase className='w-5 h-5 mr-2' />
              Interview Details
            </h3>
            <div className='space-y-3'>
              <p><strong>Job Role:</strong> {interviewData?.jobPosition}</p>
              <p><strong>Years of Experience:</strong> {interviewData?.jobExperience}</p>
              <p><strong>Job Description:</strong> {interviewData?.jobDesc}</p>
            </div>
          </div>
          <div className='bg-yellow-50 p-6 rounded-xl shadow-md border border-yellow-200'>
            <h3 className='font-semibold text-xl mb-4 flex items-center text-yellow-700'>
              <Lightbulb className='w-5 h-5 mr-2' />
              Important Information
            </h3>
            <p className='text-yellow-800'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
          </div>
        </div>
        <div className='space-y-6'>
          <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
            <h3 className='font-semibold text-xl mb-4 text-primary flex items-center'>
              <WebcamIcon className='w-5 h-5 mr-2' />
              Camera Check
            </h3>
            {webcamEnabled ? (
              <Webcam 
                mirrored={true}
                className='w-full rounded-lg'
                style={{ height: '300px' }}
              />
            ) : (
              <div className='space-y-4'>
                <div className='h-48 w-full flex items-center justify-center bg-gray-100 rounded-lg'>
                  <WebcamIcon className='h-24 w-24 text-gray-400' />
                </div>
                <Button className="w-full" onClick={() => setWebcamEnabled(true)}>
                  Enable Webcam and Microphone
                </Button>
              </div>
            )}
          </div>
          <Link href={`/dashboard/interview/${params.interviewId}/start`} className='block'>
            <Button className="w-full py-6 text-lg font-semibold transition-all duration-300 hover:bg-primary/90 hover:scale-105">
              <Clock className='w-5 h-5 mr-2' />
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview;
