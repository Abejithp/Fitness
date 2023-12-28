'use client'

import Modal from '@/components/Modal/Modal'
import './planner.css'
import Day from '../Day/Day'
import { useEffect, useState } from 'react'
import { addWorkout } from '@/api/workout.mjs'
import Workout from '@/pages/workout/Workout'

export default function Planner(props) {

    const { exercises , name, updateWorkout} = props

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const workout = {}
    days.map((day) => workout[day] = []) 

    let key = 0

    return (<>
        <div className="container-plan">

            {days.map((day) => <Day key={key++} day={day} exercises={exercises} updateWorkout={(exercises) => {workout[day] = exercises; console.log(workout)}}/>)}
            
        </div>
        <button onClick={() => {addWorkout(workout, name)}}>Submit</button>
    </>)
}