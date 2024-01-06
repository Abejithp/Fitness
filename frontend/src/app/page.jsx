'use client'
import './main.css'

import Link from 'next/link';
import { Login, Register } from '../components/Auth/Auth'
import { useRef, useState } from "react";

export default function Home() {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")

	const loginRef = useRef(null)
	const aboutRef = useRef(null)
	const featureRef = useRef(null)

	function scroll(ref) {
		window.scrollTo({
			top: ref.offsetTop,
			left: 0,
			behavior: "smooth",
		});
	}

	return (<>
		<div className="main">


			<div className="intro">

				<div className="taskbar">
					<div className="container">
						<div className="scroll" onClick={() => { scroll(aboutRef.current) }} >About</div>
						<div className="scroll" onClick={() => { scroll(featureRef.current) }} >Features</div>
						<div className='scroll' onClick={() => { scroll(loginRef.current) }} >Join</div>
					</div>
				</div>

				<div className="title">
					Inspire
				</div>

				<div className="about" ref={aboutRef}>

					<div className="content">
						Inspire is designed to help users track each workout and progress more efficiently
					</div>
				</div>

				<div className="feature" ref={featureRef}>

					<div className="card">
						<div className="left">
							<div className="display">
								

								<div className="column">
									<div className="day">S</div>
									<div className="workout">
										<div className="exercise"></div>
									</div>
								</div>
								<div className="column">
									<div className="day">M</div>
									<div className="workout">
										<div className="exercise"></div>
										<div className="exercise"></div>
									</div>
								</div>
								<div className="column">
									<div className="day">T</div>
									<div className="workout">
										<div className="exercise"></div>
										<div className="exercise"></div>
										<div className="exercise"></div>
										<div className="exercise"></div>
										<div className="exercise"></div>
									</div>
								</div>
								<div className="column">
									<div className="day">W</div>
									<div className="workout"></div>
								</div>
								<div className="column">
									<div className="day">T</div>
									<div className="workout">
										<div className="exercise"></div>
										<div className="exercise"></div>
										<div className="exercise"></div>
										<div className="exercise"></div>
									</div>
								</div>
								<div className="column">
									<div className="day">F</div>
									<div className="workout">
										<div className="exercise"></div>
										<div className="exercise"></div>
									</div>
								</div>
								<div className="column">
									<div className="day">S</div>
									<div className="workout"></div>
								</div>
							</div>
						</div>
						<div className="right">
							Create a Workout Schedule that aligns with your goals
						</div>
					</div>

				</div>

				<div className="join" ref={loginRef}>
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

			</div>

		</div>

	</>)
}
