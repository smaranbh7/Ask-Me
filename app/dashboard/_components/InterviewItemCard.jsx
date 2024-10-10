import React from 'react'

function InterviewItemCard({ interview }) {
  return (
    <div className="border p-4 mb-4 rounded-lg shadow-sm">
      <h3 className="font-bold text-primary">{interview?.jobPosition}</h3>
      <p className="text-sm text-gray-600">{interview?.jobExperience} Year(s) of Experience</p>
      <p className="text-sm text-gray-600">Created At: {(interview.createdAt)}</p>
      <p className="text-sm text-gray-600">Score: {interview.score || 'N/A'}</p>
    </div>
  )
}

export default InterviewItemCard
