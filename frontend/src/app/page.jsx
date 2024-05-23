'use client'

import { Login, Register } from '../components/custom/Auth'
import { useState } from "react";

import Lenis from 'lenis';

if (typeof window !== 'undefined') {

	const lenis = new Lenis({ wheelMultiplier: 1.5 })

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)

}

export default function Home() {


	const [login, setLogin] = useState(true)

	return (
		<div className="flex flex-col w-full font-satoshi bg-neutral-950">
			<div className="flex  w-full  fixed top-0 items-center justify-between p-6 px-12 max-tablet:px-6 z-50">
				<div className="flex items-center gap-3">
					<img src="logo.png" alt="logo" className='h-6' />
				</div>
				<div className="flex gap-4">
					<a href="#about" className='text-white font-satoshi font-bold tracking-wider uppercase max-tablet:hidden'>about</a>
					<a href="#features" className='text-white font-satoshi font-bold tracking-wider uppercase max-tablet:hidden'>features</a>
					<a href="#login" className='text-white font-satoshi font-bold tracking-wider uppercase'>join</a>
				</div>

			</div>

			<div className="flex min-h-screen w-full items-center justify-center">
				<p className='text-white uppercase font-panchang text-[7rem] tracking-widest font-bold max-tablet:text-[3rem]'>INSPIRE</p>
			</div>

			<div className="flex flex-col min-h-screen mt-16 w-full items-center justify-between" id='about'>
				<div className="flex w-full justify-center relative">
					<p className='text-white uppercase font-panchang text-[1rem] font-bold max-tablet:text-[3rem] z-30 bg-neutral-950 px-6'>About</p>
					<div className="flex bg-white h-2 absolute w-[80vw] top-2"></div>
				</div>

			</div>

			<div className="flex min-h-screen w-full items-center justify-center" id='features'>
				<div className="flex w-full justify-center relative">
					<p className='text-white uppercase font-panchang text-[1rem] font-bold max-tablet:text-[3rem] z-30 bg-neutral-950 px-6'>Features</p>
					<div className="flex bg-white h-2 absolute w-[80vw] top-2"></div>
				</div>
			</div>

			<div className="flex h-screen w-full justify-center items-center pt-[6rem] relative" id='login'>
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
