import { useEffect, useState } from 'react'
import './day.css'
import Modal from '@/components/Modal/Modal'

export default function Day(props){
    const {day, exercises, updateWorkout} = props

    const [exercise, updateExercise] = useState([]);

    useEffect(()=>{
        updateWorkout(exercise);
    }, [exercise.length])
    

    return(<>
            <div className="day">
                <Modal day={day} exercises={exercises} update={(id) => updateExercise([...exercise, id])}/>
                <div className="list">
                    {exercise}
                </div>
            </div>
    </>)
}