import { send } from "./util.mjs";

export function login(username, password){
    return send("POST", "/api/login/", {username,password});
}

export function logout(){
    return send("DELETE", "/api/login/", null);
}

export function register(username, password){
    return send("POST", "/api/register/", {username,password});
}

export function resetUser() {
    if (typeof window === 'undefined') {
        return null;
    }
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
}

export function test(name, muscle, weight, sets, reps){
    send("POST", "/api/test/", { name, muscle, weight, sets, reps } )
}