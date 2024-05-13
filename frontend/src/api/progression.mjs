import { send } from "./util.mjs";

const offset = new Date().getTimezoneOffset();

export function getToday(day) {
    return send("GET", `/api/schedule/${day}/`, null);
}

export function addProgress(id){
    return send("POST", "/api/progress/", {id, offset});
}

export function updateProgress(id, sets){
    return send("PATCH", "/api/progress/", {id, sets, offset});
}

export function getProgress(id) {
    return send("GET", `/api/progress/${id}/`, null);
}

export function getSummary(){
    return send("GET", `/api/summary/${offset}/`, null);
}