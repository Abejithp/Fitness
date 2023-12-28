'use client'
import './main.css'

import Link from 'next/link';
import {Login, Register} from '../components/Auth/Auth'
import { useState } from "react";

export default function Home() {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")

	return (<>
		<div className="main">
			<div className="taskbar">
				<div className="container">
					<Link href="/login" className='scroll'>Join</Link>
					<div className="scroll">About</div>
					<div className="scroll">Features</div>
				</div>
			</div>

			<div className="intro">
				<div className="title">
					Inspire
				</div>

				<div className="card">

				</div>

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
								<Login user={user} password={password} className="login-btn"/>
								<Register user={user} password={password} className="login-btn"/>
							</div>

						</div>
					</div>
				</div>

			</div>

		</div>

	</>)
}
