'use client'

import './auth.css'
import { login, register, logout } from "../../api/auth.mjs"

function handleSubmit(res,err) {
    if (!res) {
       return console.log("FAILED")
    }

    window.location.href = '/dashboard'
}

export function Login(props) {
    const { user, password } = props

    return (<>
          <button onClick={function () {
            if (user != '' && password != '') {
                login(user, password).then((res, err) => handleSubmit(res,err))
            }
        }} className="btn">
            Login
        </button>
    </>)
}

export function Register(props) {
    const { user, password } = props
    return (<>
        <button onClick={function () {
            if (user != '' && password != '') {
                register(user, password).then((res) => handleSubmit(res))
            }
        }} className='btn'>
            Register
        </button>
    </>)
}

export function Logout() {
    return (<>
        <button onClick={() => logout().then(() => { window.location.href = '/' })}>
            Logout
        </button>
    </>)
}

