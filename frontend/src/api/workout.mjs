import { send } from "./util.mjs";

export function addWorkout(workout) {

    return send("POST", "/api/workout/", {workout})
}

export function getWorkout() {
    return send("GET", "/api/workout/", null);
}

