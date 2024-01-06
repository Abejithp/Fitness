import { useEffect, useState } from 'react'
import './day.css'
import Modal from '@/components/Modal/Modal'

export default function Day(props){
    const {day, exercises, updateWorkout} = props

    const [exercise, updateExercise] = useState([]);
    const [card, updateCard] = useState([])

    useEffect(()=>{
        console.log(exercise)
        updateWorkout(exercise);
    }, [exercise.length])
    

    return(<>
            <div className="column">
                <div className="label">{day}</div>
                <div className="exercises">
                    {card.map((name, index) => <div key={index} className='card-work'> {name} </div>)}
                    <Modal day={"add"} exercises={exercises} update={(id,name) => {updateExercise([...exercise, id]); updateCard([...card, name])}}/>
                </div>
                
      
            </div>
    </>)
}