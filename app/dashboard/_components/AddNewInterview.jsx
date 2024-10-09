'use client';
import React, { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { chatSession } from '../../../utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(''); // Default empty string
  const [jobDesc, setJobDesc] = useState(''); // Default empty string
  const [jobExperience, setJobExperience] = useState(''); // Default empty string
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse]=useState([]);
  const router = useRouter();
  const {user}= useUser();

  const onSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on Job Position, Job Description & Years of Experience, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Provide a 'question' and 'answer' field in the JSON.`;
    
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text())
        .replace('```json', '')
        .replace('```', '');

      console.log(JSON.parse(MockJsonResp));

      if (MockJsonResp) {
        // Database
        const mockId = uuidv4(); 
        const resp = await db.insert(MockInterview)
          .values({
            mockId: mockId, 
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('MM-DD-YYYY')
          })
          .returning({ mockId: MockInterview.mockId }); 
        console.log("Inserted ID:", resp);
        if(resp) 
        {
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
      } else {
        console.log("Error: No response data");
      }
      } catch (error) {
        console.error("Error during submission:", error);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div>
      <div 
        className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about your job interview.</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your job position/role, Job description and years of experience</h2>
                </div>
                <div className='mt-7 my-3'>
                  <label>Job Role/Position</label>
                  <Input 
                    placeholder='Ex. Full Stack Developer' 
                    required
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                <div className='mt-7 my-3'>
                  <label>Job Description/Tech Stack</label>
                  <Textarea 
                    placeholder="Ex. React, NodeJs, Mongo DB" 
                    required
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                <div className='mt-7 my-3'>
                  <label>Years of Experience</label>
                  <Input 
                    placeholder='Ex. 5' 
                    type="number" 
                    max='100' 
                    required
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>
                <div className='flex gap-5 justify-end'>
                  {/*Variant ghost makes the button background disappear */}
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className='animate-spin mr-2 ' /> Generating Your Questions...
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
