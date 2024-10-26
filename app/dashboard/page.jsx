import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { PlusCircle, Lightbulb, Volume2, Clock, FileText, HelpCircle } from 'lucide-react'

function Dashboard() {
  const quickTips = [
    { icon: <Volume2 className="w-5 h-5" />, text: "Speak clearly and confidently" },
    { icon: <Clock className="w-5 h-5" />, text: "Take time to think before answering" },
    { icon: <FileText className="w-5 h-5" />, text: "Review the job description beforehand" },
    { icon: <HelpCircle className="w-5 h-5" />, text: "Prepare the ansewers from the feedbacks given" },
  ]

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      <div className='mb-10'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>Interview Dashboard</h1>
        <p className='text-xl text-gray-600'>Create and manage your AI Mockup Interviews</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
        <div className='bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
          <h2 className='text-2xl font-semibold mb-4 flex items-center'>
            <PlusCircle className='mr-2 text-primary' />
            Create New Interview
          </h2>
          <AddNewInterview />
        </div>
        <div className='bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300'>
          <h2 className='text-2xl font-semibold mb-4 flex items-center'>
            <Lightbulb className='mr-2 text-primary' />
            Quick Tips
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {quickTips.map((tip, index) => (
              <div key={index} className='flex items-start p-3 bg-gray-50 rounded-lg'>
                <div className='flex-shrink-0 mr-3'>
                  <div className='p-2 bg-primary rounded-full text-white'>
                    {tip.icon}
                  </div>
                </div>
                <p className='text-sm text-gray-600'>{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
        <h2 className='text-2xl font-semibold mb-6'>Your Interviews</h2>
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard
