import { send } from "./util.mjs";

export function getToday(day) {
    return send("GET", `/api/schedule/${day}/`, null);
}

export function addProgress(id, date){
    return send("POST", "/api/progress/", {id, date});
}

export function updateProgress(id, sets){
    return send("PATCH", "/api/progress/", {id, sets, date});
}

export function getProgress(id) {
    return send("GET", `/api/progress/${id}/`, null);
}