import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation';
import { db } from '../../../utils/db';
import { UserAnswer } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { Clock, Briefcase, Star } from 'lucide-react';

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const [averageRating, setAverageRating] = useState('N/A');

  useEffect(() => {
    calculateAverageRating();
  }, [interview.mockId]);

  const calculateAverageRating = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interview.mockId));

    if (result.length > 0) {
      const totalRating = result.reduce((sum, item) => sum + parseFloat(item.rating), 0);
      const avgRating = (totalRating / result.length).toFixed(1);
      setAverageRating(avgRating);
    }
  };

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  }
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  }

  return (
    <div className="border p-4 mb-4 rounded-lg shadow-sm">
    <h3 className="font-bold text-primary">{interview?.jobPosition}</h3>
    <p className="text-sm text-gray-600">{interview?.jobExperience}  Year(s) of Experience</p>
    <p className="text-sm text-gray-600">Created At: {(interview.createdAt)}</p>
    <p className="text-sm text-gray-600">Overall Score: {averageRating}</p>
    <div className='flex justify-between my-2'> 
      <Button size="sm" variant="outline" onClick={onFeedback}>Feedback</Button>
      <Button size="sm" onClick={onStart}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
