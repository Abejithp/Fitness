import { send } from "./util.mjs";

export function addWorkout(name, muscle, weight, sets, reps){
    send("POST", "/api/workout/", { name, muscle, weight, sets, reps })
}

export function getWorkout(){
    return send("GET", "/api/workout/", null);
}

