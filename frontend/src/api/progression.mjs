import { send } from "./util.mjs";

export function getActive() {
    return send("GET", "/api/active/", null);
}

export function update(name, reps, sets){
    return send("PATCH", "/api/active/", {name,reps,sets})
}