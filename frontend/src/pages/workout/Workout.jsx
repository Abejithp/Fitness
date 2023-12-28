import { useEffect, useState } from 'react'

import './workout.css'
import Create from "@/components/Workout/Create/Create"
import Card from '@/components/Workout/Card/Card'
import { getExercise } from '../../api/exercise.mjs'
import { Planner } from '@/components/Workout/Planner/Planner'
export default function Workout() {

    const [exercises, setExercise] = useState([])

    useEffect(() => {
        getExercise().then((res) => setExercise(res))
    }, []);




    return (<>
        <div className="content-work">
            <div className="list-work">
                <div className="title">My Workouts</div>
                <Planner exercises={exercises}/>
            </div>

            <div className="create">
                <div className="title">Create Exercise</div>

                <div className="container">
                    {exercises.map((item, index) => <Card key={index} name={item.name} muscle={item.muscleGroup} />)}
                </div>

                <Create setExercise={(res) => setExercise([...exercises, res])} />
            </div>

        </div>
    </>)
}