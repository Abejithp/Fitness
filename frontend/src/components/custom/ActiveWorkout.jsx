import React from 'react'
import Exercises from './Exercises'

export default function ActiveWorkout() {

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']


    return (
        <div className='flex w-full relative py-6 px-4 gap-2 rounded-lg'>
            <img src="/card/bg.png" alt="background" className=' absolute top-0 left-0 h-full w-full brightness-90  object-cover rounded-lg'/>
            {days.map((day, index) => <div className='w-full flex flex-col text-center font-bold font-satoshi gap-4 z-10' key={index}>
                <p className=''>{day}</p>
                <Exercises />
            </div>)}
        </div>
    )
}
