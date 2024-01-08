import { send } from "./util.mjs";

export function getActive() {
    return send("GET", "/api/active/", null);
}

export function update(name, reps, sets){
    return send("PATCH", "/api/active/", {name,reps,sets})
}

export function addWeight(weight){
    return send("POST", "/api/weight/", {weight})
}

export function getWeight(){
    return send("GET", "/api/weight/", null);
}