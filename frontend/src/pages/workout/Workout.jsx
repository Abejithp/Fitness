import { useState } from 'react'
import './workout.css'
import Create from "@/components/Workout/Create/Create"
export default function Workout(){

    const [exercises, setExercise] = useState([])

    return(<>
        <div className="content">
            <div className="list">
                <div className="title">My Workouts</div>
            </div>

            <div className="create">
                <div className="title">Create Exercise</div>
                {exercises.map((item) => item.name)}
                <Create setExercise = {(res) => setExercise([...exercises, res])}/>
            </div>

        </div>
    </>)
}