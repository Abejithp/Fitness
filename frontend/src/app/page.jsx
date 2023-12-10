'use client'

import { test } from "@/api/auth.mjs";
import { getWorkout } from "@/api/workout.mjs";
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

		<button onClick={()=> test("asd", "1123", 2, 1, 3).then((res)=>console.log(res))}>CLICK</button>
	</>)
}
