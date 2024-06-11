import React from 'react'

function IngImg({img, title, description}) {
  return (
    <div className='flex flex-col'>
    <div className='flex justify-center items-center bg-slate-100 size-48 rounded-xl'>
        <img className=' size-36' src={img} alt=""/>
    </div>
    <p className='mt-2 gap-1 w-48 flex flex-wrap justify-center font-meduim text-xl'> 
        <p>{title}</p>
        <p className=' text-lg'>({description})</p>
    </p>
    </div>
  )
}

export default IngImg