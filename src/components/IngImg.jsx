import React from 'react'
import Card from '@mui/joy/Card';
import 'lazysizes';

function IngImg({img, title, description}) {
  return (
    <div className='flex flex-col items-center'>
    <Card sx={{ width: { lg: 200, md: 180,  sm: 150, xs: 130 },
                height: { lg: 200, md: 180,  sm: 150, xs: 130 },
                borderRadius: 20,
    overflow: 'hidden' }} className='flex flex-col size-[200px] justify-center items-center bg-slate-100 rounded-xl'>
        <img className="lazyload size-36" data-src={img} alt=""/>
    </Card>
    <div className='mt-2 gap-1 w-44 flex flex-wrap justify-center font-meduim text-xl'> 
        <p>{title}</p>
        <p className=' text-lg'>({description})</p>
    </div>
    </div>
  )
}

export default IngImg