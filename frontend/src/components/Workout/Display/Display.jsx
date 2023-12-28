import Column from './Columns/Column'
import './display.css'

export default function Display(props) {
    let { name, workout } = props

    if (!workout) {
        workout = []
    }

    console.log(workout)
    return (<>
        <div className="container-display">

                <div className="name">
                    Workout: {name}
                </div>
                <div className="display-workout">
                    {workout.map((item, index) => <Column key={index} day={item.day} exercise={item.exercise} />)}
                </div>
       

        </div>
    </>)
}