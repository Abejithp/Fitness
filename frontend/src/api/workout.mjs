import { send } from "./util.mjs";

export function addWorkout(workout, name) {

    return send("POST", "/api/workout/", {workout, name})
}

export function getWorkout() {
    return send("GET", "/api/workout/", null);
}

export function getActiveWorkout(id) {
    return send("GET", `/api/workout/${id}/`, null);
}

export function updateActiveWorkout(id){
    return send("PATCH", `/api/workout/`, {id})
}