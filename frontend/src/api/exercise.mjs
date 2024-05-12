import { send } from "./util.mjs";

export function addExercise(name, id) {
    return send("POST", "/api/exercise/", { name, id })
}

export function delExercise(id){
    return send("DELETE", `/api/exercise/${id}`, null);
}

export function getMuscles(){
    return send("GET", "/api/muscles/", null);
}

export function getActiveMuscle(id){
    return send("GET", `/api/muscles/${id}`, null);
}