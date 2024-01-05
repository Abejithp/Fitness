import { useEffect, useState } from 'react'
import './daydisplay.css'
import { getActive } from '@/api/progression.mjs'
import Tracker from './Tracker/Tracker'

export default function DayDisplay(){

    const [active, updateActive] = useState(null)

    useEffect(()=>{
        getActive().then((res) =>{
            updateActive(res.data)
            console.log(res.data)
        })
    },[])

    return(<>
        {active != null ? active.exercise.map((exercise, index) => <Tracker key={index} exercise={exercise}/>): <></>}
    </>)
}