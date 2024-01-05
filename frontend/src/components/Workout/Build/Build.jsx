import { useRef } from "react";
import { addWorkout } from "@/api/workout.mjs";
import Day from "../Day/Day";
export default function Build(props) {

    const { exercises } = props
    const nameRef = useRef(null)

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const workout = {}
    days.map((day) => workout[day] = [])

    function handleSubmit() {
        const name = nameRef.current.value
        addWorkout(workout, name)
    }


    return (<>
        <div className="container-display">
            <div className="name">
                Workout:
                <input type="text" placeholder="name" ref={nameRef} />
                <button onClick={handleSubmit}>Submit</button>


            </div>
            <div className="display-workout">
                {days.map((day, index) => <Day key={index} day={day} exercises={exercises} updateWorkout={(exercises) =>  workout[day] = exercises} />)}
            </div>
        </div>
    </>)
}