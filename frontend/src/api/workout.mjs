import { send } from "./util.mjs";

export function addWorkout(workout, name) {
    return send("POST", "/api/workout/", {workout, name})
}

export function addRoutine(workout, name){
    return send("POST", "/api/routine/", {workout, name})
}

export function getRoutine(id) {
    return send("GET", `/api/routine/${id}/`, null)
}

export function getAllRoutines(){
    return send("GET", '/api/routine/', null);
}

export function getWorkout() {
    return send("GET", "/api/workout/", null);
}

export function delWorkout(id){
    return send("DELETE", `/api/workout/${id}`, null);
}

export function getSchedule(){
    return send("GET", "/api/schedule/", null);
}

export function getActiveWorkout(id) {
    return send("GET", `/api/workout/${id}/`, null);
}

export function updateActiveWorkout(id){
    return send("PATCH", `/api/workout/`, {id})
}