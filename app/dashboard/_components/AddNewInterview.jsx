'use client';
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
       hover:scale-105 hover:shadow-md cursor-pointer transition-all'
       onClick={() => setOpenDialog(true)}
       >
        <h2 className='text-lg'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
              <div className='flex gap-5 justify-end'>
                {/*Variant ghost makes the button backgound disappear */}
                 <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                 <Button>Start Interview</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
