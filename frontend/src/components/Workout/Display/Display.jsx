import { updateActiveWorkout } from '@/api/workout.mjs'
import Column from './Columns/Column'
import './display.css'

export default function Display(props) {
    let { name, workout, id} = props

    if (!workout) {
        workout = []
    }
    
    return (<>
        <div className="container-display">

            <div className="topbar">
                <div className="name">
                    Workout: {name}
                </div>
                <div className="display-btn">
                    <div className="btn" onClick={()=>{
                        updateActiveWorkout(id)
                    }}>Activate</div>
                </div>
            </div>



            <div className="display-workout">
                {workout.map((item, index) => <Column key={index} day={item.day} exercise={item.exercise} />)}
            </div>


        </div>
    </>)
}