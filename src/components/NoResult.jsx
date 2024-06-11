import React from 'react'

function NoResult() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <img className=' size-24 m-10' src={`${process.env.PUBLIC_URL}/sad.svg`} alt="" />
        <p className='flex items-center  font-semibold text-2xl'>Sorry, we couldn't find any results</p>
    </div>
  )
}

export default NoResult