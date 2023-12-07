'use client'

import { Login , Logout, Register} from "@/components/Auth/Auth";
import { useState } from "react";

export default function Home() {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")

	return (<>

		<input type="text" value={user} onChange={e => setUser(e.target.value)}/>
		<input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

		< Login user={user} password={password}/>

		<Register user={user} password={password}/>
		<Logout />
	</>)
}
