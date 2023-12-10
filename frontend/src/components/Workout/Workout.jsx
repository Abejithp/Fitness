'use client'
import { addWorkout, getWorkout} from "@/api/workout.mjs";
import { useEffect, useRef, useState } from "react"
import { Logout } from "../Auth/Auth";
import { test } from "@/api/auth.mjs";

export function Workout(){
    
    const nameRef = useRef(null);
    const muscleRef = useRef(null);
    const weightRef = useRef(null);
    const setRef = useRef(null);
    const repRef = useRef(null);

    const [workouts, setWorkout] = useState([]);


    function handleSubmit(e){
        e.preventDefault();

        const user = {
            name: nameRef.current.value,
            muscle: muscleRef.current.value,
            weight: weightRef.current.value,
            sets: setRef.current.value,
            reps: repRef.current.value,
        }

        test(user.name, user.muscle, user.weight, user.sets, user.reps).then((res) => console.log(res))
    }

    useEffect(()=>{
        getWorkout().then((res)=> setWorkout(res))
    }, [])

    let key = 0;
    return(<>
    
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="name" ref={nameRef}/>
            <input type="text" placeholder="muscle group" ref={muscleRef}/>
            <input type="number" placeholder="weight" ref={weightRef}/>
            <input type="number" placeholder="reps" ref={repRef}/>
            <input type="number" placeholder="sets" ref={setRef}/>

            <button type="submit">add</button>
        </form>

        <button onClick={() => getWorkout().then((res) => console.log(res))}>Click</button>

        {workouts.map((item) => <div key={key++}>{item.name}</div>)}

        <Logout />
    </>)
}