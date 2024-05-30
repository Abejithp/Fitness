'use client'

import { Login, Register } from '../components/custom/Auth'
import { useEffect, useState } from "react";



import Lenis from 'lenis';

export default function Home() {

	useEffect(() => {
		const lenis = new Lenis({ wheelMultiplier: 1.5 })

		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
	
		requestAnimationFrame(raf)
	})

	const [login, setLogin] = useState(true)


	return (
		<div className="flex flex-col w-full font-satoshi bg-neutral-950 overflow-x-hidden">
			<div className="flex  w-full  fixed top-0 items-center justify-between p-6 px-12 max-tablet:px-6 z-50 bg-neutral-950" >
				<div className="flex items-center gap-3">
					<img src="logo.png" alt="logo" className='h-6' />
				</div>
				<div className="flex gap-4">
					<a href="#login" className='text-white tracking-wider uppercase font-semibold'>join</a>
				</div>
			</div>

			<div className="flex min-h-screen w-full items-center justify-center relative ">
				<p className='text-white uppercase font-panchang text-[6rem] tracking-widest font-bold max-tablet:text-[3rem] z-40'>INSPIRE</p>
				<div className="flex w-[300px] laptop:w-[600px] laptop:-left-[200px] tablet:-top-20 aspect-square bg-indigo-600 rounded-full absolute -left-[150px] top-0"></div>
				<div className="flex w-[200px] laptop:w-[400px] aspect-square bg-indigo-400 rounded-full absolute -right-[100px] top-[150px]"></div>
				<div className="flex w-[600px] laptop:w-[850px] aspect-square bg-indigo-700 rounded-full absolute right-[28%] -bottom-[600px] max-tablet:-bottom-[250px] max-tablet:left-[30%]"></div>
			</div>

			<div className="flex h-screen w-full justify-center items-center pt-[6rem] relative" id='login'>
				<div className="flex flex-shrink-0 flex-col gap-6 items-center bg-neutral-800 p-16  max-w-[400px] rounded-2xl shadow-2xl z-10 shadow-black">
					{login ? <Login /> : <Register />}
					<div className="flex gap-2 text-white">
						{login ? <span>Don't have an account?</span> : <span>Already have an account?</span>}
						<span className="text-blue-500 cursor-pointer" onClick={() => setLogin(!login)}> {login ? ' Register' : ' Login'}</span>
					</div>
				</div>
				
			</div>

		</div>
	)
}
