'use client'

import '../main.css'

import { useState } from "react"

import { Login, Register } from "@/components/Auth/Auth"

export default function login() {

    const [user, setUser] = useState("")
	const [password, setPassword] = useState("")

    return (<>
        <div className="join">
            <div className="left">
                Join The Community
            </div>
            <div className="right">
                <div className="form">
                    <div className="input-container">
                        <input type="text" value={user} onChange={e => setUser(e.target.value)} required={true} />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={true} />
                    </div>

                    <div className="btn-container">
                        <Login user={user} password={password} className="login-btn" />
                        <Register user={user} password={password} className="login-btn" />
                    </div>

                </div>
            </div>
        </div>
    </>)
}