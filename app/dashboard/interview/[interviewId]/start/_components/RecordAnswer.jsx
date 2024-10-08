import Webcam  from 'react-webcam'
import React from 'react'
import Image from 'next/image'

function RecordAnswer() {
  return (
    <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
      <Image src={'/webcam.png'} width={200} height={200}
      className='absolute'/>
      <Webcam
      mirrored={true}
      style={{
        height:300,
        width:'100%',
        zIndex:10,
      }}
      />
    </div>
  )
}

export default RecordAnswer
