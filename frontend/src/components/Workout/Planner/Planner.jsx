'use client'

import Modal from '@/components/Modal/Modal'
import './planner.css'
import Day from '../Day/Day'
import { useEffect, useState } from 'react'
import { addWorkout } from '@/api/workout.mjs'

export function Planner(props) {

    const { exercises } = props

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const workout = {}
    days.map((day) => workout[day] = []) 

    let key = 0

    useEffect(() =>{
        console.log(workout)
       
    },[]);


    return (<>
        <div className="container-plan">

            {days.map((item) => <Day key={key++} day={item} exercises={exercises} updateWorkout={(exercises) => {workout[item] = exercises;}}/>)}
            
        </div>

        <button onClick={() => addWorkout(workout)}>Submit</button>
    </>)
}