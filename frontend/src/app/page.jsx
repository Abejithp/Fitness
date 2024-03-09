'use client'
import './main.css'

import { Login, Register } from '../components/Auth/Auth'
import { useRef, useState } from "react";



export default function Home() {

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

	return (
		<div className=" flex-col bg-neutral-900 h-auto font-satoshi overflow-hidden">
			<div className="flex w-full py-[2rem] fixed top-0 justify-center z-[100]">
				<div className="flex p-[1rem] px-[3rem] gap-[2rem] rounded-full text-white bg-slate-400 w-fit
								font-satoshi font-medium cursor-pointer shadow-lg">
					<div onClick={() => { scroll(aboutRef.current) }} >About</div>
					<div onClick={() => { scroll(featureRef.current) }} >Features</div>
					<div onClick={() => { scroll(loginRef.current) }} >Join</div>
				</div>
			</div>


			<div className="flex h-screen justify-center items-center relative">
				<div className="flex h-[60%] aspect-square bg-blue-900 absolute left-[5%] top-[15%] rounded-full
									blur-[100px] opacity-30"></div>
				<div className="flex h-[70%] aspect-square bg-purple-900 absolute right-[5%] bottom-[5%] rounded-full
									blur-[100px] opacity-30">
									</div>
				<div className=" text-white text-[13rem] font-satoshi font-normal z-10 max-tablet:text-[5rem]">
					Inspire
				</div>
				<img src="/abstract/purple.png" className=' absolute' />
			</div>

			<div className="flex h-screen w-auto text-white justify-evenly items-center font-light relative pt-[10rem]" ref={aboutRef}>
				<div className="flex w-[40%] text-[3rem] text-center font-medium z-30 absolute">
					Empowering individuals to achieve their fitness goals by providing a personalized and accessible platform
				</div>
				<img src="/abstract/cross.png" className=' scale-60 absolute left-[-25%] bottom-[-25%]'/>
				<img src="/abstract/ring.png" className=' scale-60 absolute right-[-25%] bottom-0'/>
				<div className="flex h-[90%] aspect-square bg-pink-950 blur-[200px] rounded-full"></div>
			</div>

			<div className="flex h-screen text-white justify-center items-center pt-[6rem]" ref={featureRef}>
				<div className="flex h-[70%] aspect-square rounded-full bg-sky-700 blur-[100px] opacity-40">
				</div>
				<div className="flex text-white z-20 absolute font-medium text-[3rem] w-[40%] text-center">
					Create a personalized workout plan that fits your schedule and goals
				</div>
			</div>

			<div className="flex h-screen justify-center items-center pt-[6rem] relative" ref={loginRef}>
				<div className="flex bg-slate-400 p-16 rounded-2xl shadow-2xl z-10">
					<Login />
				</div>
				<img src="/abstract/spiral.png" alt="" className='absolute scale-90'/>
				<div className="flex absolute bg-blue-400 h-[40%] aspect-square left-10 rounded-full blur-[200px] opacity-30"></div>
				<div className="flex absolute bg-sky-400 h-[40%] aspect-square right-10 rounded-full blur-[200px] opacity-30"></div>
			
			</div>



		</div>)
}
