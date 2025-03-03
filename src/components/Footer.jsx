import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
        <div className="logo font-bold text-2xl">
            <span className="text-green-700">&lt;</span>
            Password
            <span className="text-green-700">OP/ &gt;</span>
        </div>
        <div className='flex items-center justify-center'>
        Created with <img className='invert w-7 mx-2' src='/icons/heart.svg' alt='heart' />
        </div>
    </div>
  )
}

export default Footer
