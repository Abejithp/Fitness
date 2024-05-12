import { send } from "./util.mjs";

export function getToday() {
    return send("GET", "/api/schedule/today/", null);
}

export function addProgress(id){
    return send("POST", "/api/progress/", {id});
}

export function updateProgress(id, sets){
    return send("PATCH", "/api/progress/", {id, sets});
}