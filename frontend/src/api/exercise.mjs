import { send } from "./util.mjs";

export function addExercise(name, muscleGroup) {
    return send("POST", "/api/exercise/", { name, muscleGroup })
}

export function getExercise() {
    return send("GET", "/api/exercise/", null);
}
