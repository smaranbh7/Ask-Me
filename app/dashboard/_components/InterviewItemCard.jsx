import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function InterviewItemCard({ interview }) {

  const router = useRouter();

  const onStart=()=>{
    router.push("/dashboard/interview/"+interview?.mockId);
  }
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-primary">{interview?.jobPosition}</h3>
      <p className="text-sm text-gray-600">{interview?.jobExperience}  Year(s) of Experience</p>
      <p className="text-sm text-gray-600">Created At: {(interview.createdAt)}</p>
      <p className="text-sm text-gray-600">Score: {interview.score || 'N/A'}</p>
      <div className='flex justify-between my-2'> 
        <Button size="sm" variant="outline">Feedback</Button>
        <Button size="sm"
        onClick={onStart}
        >Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
