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

    // useEffect(()=>{
    //     console.log(currentWorkout)
    // }, [currentWorkout])

    return (<>
        <div className="content-work">

            <div className="main-display">
                <Navi workouts={workout} update={(res) => updateWorkout(res)} build={() => setBuild(!build)} />

                {!build ?
                    <Display name={currentWorkout.workoutName} workout={currentWorkout.workout} /> :
                    <Build exercises={exercises} />
                }

            </div>
            
            <div className="exercise-display">
                <Exdisplay muscle={muscle} setExercise={(name) => setExercise([...exercises, name])}/>
            </div>

            {/* <div className="list-work">
                <div className="title">Active Workout</div>

            </div> */}


            {/* <div className="list-work">
                <div className="title">Create Workouts</div>
                <Planner exercises={exercises} />
            </div>

            <div className="create">
                <div className="title">Create Exercise</div>

                <div className="container">
                    {exercises.map((item, index) => <Card key={index} name={item.name} muscle={item.muscleGroup} />)}
                </div>

                <Create setExercise={(res) => setExercise([...exercises, res])} />
            </div> */}

        </div>
    </>)
}