import { send } from "./util.mjs";

export function addExercise(name, id) {
    return send("POST", "/api/exercise/", { name, id })
}


// TODO: delete function if not needed
export function getExercise() {
    return send("GET", "/api/exercise/", null);
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