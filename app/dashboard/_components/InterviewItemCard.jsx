"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation';
import { db } from '../../../utils/db';
import { UserAnswer } from '../../../utils/schema';
import { eq } from 'drizzle-orm';
import { Clock, Briefcase, Calendar, Star, BarChart2 } from 'lucide-react';

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

  const getRatingColor = (rating) => {
    if (rating === 'N/A') return 'bg-gray-500';
    const numRating = parseFloat(rating);
    if (numRating >= 4) return 'bg-green-500';
    if (numRating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-primary pr-2">{interview?.jobPosition}</h3>
          <div className={`flex items-center ${getRatingColor(averageRating)} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span>{averageRating === 'N/A' ? 'N/A' : averageRating}</span>
          </div>
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
            <span>{interview?.jobExperience} Year(s) of Experience</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
            <span>Created: {new Date(interview.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BarChart2 className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
            <span>Overall Score: {averageRating}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button
            size="sm"
            variant="outline"
            onClick={onFeedback}
            className="flex-1 flex items-center justify-center"
          >
            <Star className="w-4 h-4 mr-2" />
            Feedback
          </Button>
          <Button
            size="sm"
            onClick={onStart}
            className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90"
          >
            <Clock className="w-4 h-4 mr-2" />
            Start
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
