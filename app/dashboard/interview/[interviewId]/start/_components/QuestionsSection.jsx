import React from 'react'

function QuestionsSection({mockInterviewQuestion}) {
  return (
    <div className='p-5 border rounded-lg'>
        <div>
            {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
                <h2>Question #{index+1}</h2>
            ))}
        </div>
      
    </div>
  )
}

export default QuestionsSection
