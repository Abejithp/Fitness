'use client'

import { Login, Register } from '../components/custom/Auth'
import { useState } from "react";



export default function Home() {


	const [login, setLogin] = useState(true)

	return (
		<div className="flex min-h-screen w-full font-satoshi bg-neutral-950">
			{/* Taskbar */}
			<div className="flex  w-full  fixed top-0 items-center justify-between p-6 ">
				{/* LOGO */}
				<div className="flex items-center gap-3">
					<img src="logo.png" alt="logo" className='h-6' />
					<p className='flex text-white text-[1.5rem] font-bold '>INSPIRE</p>
				</div>
			</div>
			<div className="flex h-screen w-full justify-center items-center pt-[6rem] relative" >
				<div className="flex flex-shrink-0 flex-col gap-6 items-center bg-white p-16  max-w-[400px] rounded-2xl shadow-2xl z-10 shadow-black">
					{login ? <Login /> : <Register />}
					<div className="flex gap-2">
						{login ? <span>Don't have an account?</span> : <span>Already have an account?</span>}
						<span className="text-blue-500 cursor-pointer" onClick={() => setLogin(!login)}> {login ? ' Register' : ' Login'}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
