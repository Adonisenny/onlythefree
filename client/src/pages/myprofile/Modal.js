import React from 'react'
import { FaTimes } from 'react-icons/fa'

export default function ImageModal({imageUrl,isOpen,onClose}) {
if(!isOpen) return null

  return (
  <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
<div className='relative'>
<button 
onClick={onClose}
className='absolute top-2 right-2 bg-white rounded-full p-2 text-black hover:bg-gray-300  cursor-pointer'
>
   <FaTimes color='red' size='20px' />


</button>
 
</div>
<img 
src={imageUrl}
alt='Full size'
className='max-w-full max-h-full object-contain'
/> 
  </div>


  )
}
