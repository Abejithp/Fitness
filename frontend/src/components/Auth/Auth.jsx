'use client'

import { login, register, logout } from "@/api/auth.mjs"

function handleSubmit(res){
    if(!res){
        console.log("FAILED")
    }
    window.location.href = '/dashboard'
}

export function Login(props){
    const {user, password} = props

    return(<>
        <button onClick={()=> login(user, password).then((res) => handleSubmit(res))}>
            Login
        </button>
    </>)
}

export function Register(props){
    const {user, password} = props
    return(<>
        <button onClick={()=> register(user, password).then((res) => handleSubmit(res))}>
            Register
        </button>
    </>)
}

export function Logout(){
    return(<>
        <button onClick={()=> logout().then(()=>{window.location.href = '/'})}>
            Logout
        </button>
    </>)
}

