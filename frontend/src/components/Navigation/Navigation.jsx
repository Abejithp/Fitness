import './navigation.css'

import Card from '../Workout/Card/Card'
import { getActiveWorkout } from '@/api/workout.mjs'

export default function Navi(props) {

    const { workouts, update, build, text } = props



    return (<>
        <div className="navigation">
            <div className="card create-btn" onClick={build}>{text}</div>
            {workouts.map((item, index) => <Card key={index} name={item.workoutName} id={item._id} update={(res) => { getActiveWorkout(res).then((res) => update(res.data)) }} />)}
        </div>
    </>)
}