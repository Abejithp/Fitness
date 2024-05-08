import React, { useEffect, useState } from 'react'
import Exercises from './Exercises'

export default function ActiveWorkout() {

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return (
        <div className='flex w-full relative py-6 px-4 gap-2 rounded-sm bg-indigo-100 z-10'>
            <img src="/card/bg2.png" alt="background" className=' absolute right-0 bottom-0 rounded-br-sm '/>
            <img src="/card/bg3.png" alt="background" className=' absolute -left-[59px] -bottom-12 rounded-bl-sm scale-75'/>
           

            {days.map((day, index) => <div className='w-full flex flex-col text-center font-bold font-satoshi gap-4 z-10' key={index}>
                <p>{day}</p>
                <Exercises />
            </div>)}
        </div>
    )
}
