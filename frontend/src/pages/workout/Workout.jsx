import { useEffect, useState } from 'react'

import './workout.css'
import { getExercise, getMuscles } from '../../api/exercise.mjs'
import { getActiveWorkout, getWorkout } from '@/api/workout.mjs'
import Display from '@/components/Workout/Display/Display'
import Navi from '@/components/Navigation/Navigation'
import Build from '@/components/Workout/Build/Build'
import Exdisplay from '@/components/Workout/ExerciseDisplay/Exdisplay'
export default function Workout() {

    const [exercises, setExercise] = useState([])
    const [muscle, setMuscle] = useState([])
    const [currentWorkout, updateWorkout] = useState([])
    const [workout, setWorkout] = useState([])
    const [build, setBuild] = useState(false);




    const text = build ? "My Workout" : "Create Workout"

    useEffect(() => {
        getExercise().then((res) => setExercise(res))
        getMuscles().then((res) => setMuscle(res.data))
        getWorkout().then((res) => {
            setWorkout(res.data)

            if (res.data.length != 0) {
                getActiveWorkout(res.data[0]._id).then((res) => updateWorkout(res.data))
            }

        })
    }, []);


    return (<>
        <div className="content-work">
            <div className="main-display">
                <div className="workout-display">
                    <Navi workouts={workout} update={(res) => updateWorkout(res)} build={() => setBuild(!build)} text={text}/>
                    {!build ?
                        <Display name={currentWorkout.workoutName} workout={currentWorkout.workout} /> :
                        <Build exercises={exercises} />
                    }
                </div>
            </div>

            <div className="exercise-display">
                <Exdisplay muscle={muscle} setExercise={(name) => setExercise([...exercises, name])} />
            </div>
        </div>
    </>)
}