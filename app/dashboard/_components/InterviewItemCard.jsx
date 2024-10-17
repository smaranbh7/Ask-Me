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
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h3 className="font-bold text-xl text-primary mb-2">{interview?.jobPosition}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Briefcase className="w-4 h-4 mr-2" />
          <p className="text-sm">{interview?.jobExperience} Year(s) of Experience</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <p className="text-sm">Created: {new Date(interview.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          <p className="text-sm font-semibold">Score: {averageRating}/10</p>
        </div>
        <div className='flex justify-between mt-4'> 
          <Button size="sm" variant="outline" onClick={onFeedback} className="flex-1 mr-2">View Feedback</Button>
          <Button size="sm" onClick={onStart} className="flex-1 ml-2 bg-primary hover:bg-primary-dark">Start Interview</Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
