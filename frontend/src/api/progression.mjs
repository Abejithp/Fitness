import { send } from "./util.mjs";

export function getActive() {
    return send("GET", "/api/active/", null);
}

export function update(name, reps, sets, weight){
    return send("PATCH", "/api/active/", {name, reps, sets, weight})
}

export function getExProgress(name){
    return send("GET", `/api/active/${name}/`, null)
}

export function addWeight(weight){
    return send("POST", "/api/weight/", {weight})
}

export function getWeight(){
    return send("GET", "/api/weight/", null);
}

