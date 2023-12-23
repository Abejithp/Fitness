import './workout.css'

export default function Workout(props){
    const {name, muscle} = props

    return(<>
        <div className="workout-container">
            <div className="name">{name}</div>
            <div className="muscle">{muscle}</div>
        </div>
    </>)
}