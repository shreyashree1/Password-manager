import React from 'react'

export default function Navbar() {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer  flex items-center justify-between px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
            <span className="text-green-700">&lt;</span>
            Password
            <span className="text-green-700">OP/ &gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
                <a className='hover:font-bold' href="/">Home</a>
            </li>
        </ul> */}
        <button className='text-white bg-green-600 my-5 flex items-center gap-3 px-1 py-1 rounded-full ring-white ring-1'>
            <img className='invert w-8' src="/icons/github.svg" alt='Github logo' />
            <span className="font-bold pr-2">GitHub</span>            
        </button>
        </div>
    </nav>
  )
}
