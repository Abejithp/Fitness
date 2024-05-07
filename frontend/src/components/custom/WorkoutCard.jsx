import React from 'react'

export default function WorkoutCard({muscle, bg}) {
  return (
    <div className='w-[300px] bg-white  rounded-xl hover:cursor-pointer relative hover:scale-105 transition-transform ease-in-out duration-300'>
        <img src={`/card/${bg}.png`} alt="background" className=' rounded-lg w-full' />
        <p className=' absolute z-10 top-0 flex w-full justify-center items-center h-full text-black font-medium text-[2rem] uppercase'>{muscle}</p>
    </div>
  )
}
