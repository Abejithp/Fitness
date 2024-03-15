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

	const [login, setLogin] = useState(true)

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
									blur-[100px] opacity-30 z-10"></div>
				<div className="flex h-[70%] aspect-square bg-purple-900 absolute right-[5%] bottom-[5%] rounded-full
									blur-[100px] opacity-30 z-10">
									</div>
				<div className=" text-white text-[13rem] font-satoshi font-normal max-tablet:text-[5rem] z-20 max-desktop:text-[9rem]">
					Inspire
				</div>
				<img src="/abstract/purple.png" className=' absolute z-10 max-desktop:scale-75 max-tablet:scale-[1]' />
			</div>

			<div className="flex h-screen w-auto text-white justify-evenly items-center font-light relative pt-[10rem]" ref={aboutRef}>
				<div className="flex w-[40%] text-[3rem] text-center font-medium z-30 absolute max-tablet:text-[1.5rem] max-tablet:w-[75%] 
								max-desktop:text-[2rem]">
					Empowering individuals to achieve their fitness goals by providing a personalized and accessible platform
				</div>
				<img src="/abstract/cross.png" className=' scale-75 absolute left-[-25%] bottom-[-25%]  max-tablet:left-[-30%] max-desktop:scale-50 max-desktop:left-[-40%] max-tablet:scale-[1]'/>
				<img src="/abstract/ring.png" className=' scale-75 absolute right-[-25%] top-0  max-tablet:top-0 max-desktop:scale-50 max-desktop:right-[-40%] max-tablet:scale-[1]'/>
				<div className="flex h-[90%] aspect-square bg-pink-950 blur-[200px] rounded-full"></div>
			</div>

			<div className="flex h-screen text-white justify-center items-center pt-[6rem]" ref={featureRef}>
				<div className="flex h-[70%] aspect-square rounded-full bg-sky-700 blur-[100px] opacity-40">
				</div>
				<div className="flex text-white z-20 absolute font-medium text-[3rem] w-[40%] text-center max-tablet:text-[1.5rem] max-tablet:w-[75%]">
					Create a personalized workout plan that fits your schedule and goals
				</div>
			</div>

			<div className="flex h-screen justify-center items-center pt-[6rem] relative" ref={loginRef}>
				<div className="flex flex-col gap-6 items-center bg-white p-16 w-[50vw] max-w-[400px] rounded-2xl shadow-2xl z-10 shadow-black">
					{login ?  <Login /> : <Register />}
					<div className="flex gap-2"> 
						{login ? <span>Don't have an account?</span> : <span>Already have an account?</span>}
						
						<span className="text-blue-500 cursor-pointer" onClick={() => setLogin(!login)}> {login ? ' Register' : ' Login'}</span>
					</div>
				</div>
				<img src="/abstract/spiral.png" alt="" className='absolute scale-90 max-tablet:scale-[1.7]'/>
				<div className="flex absolute bg-blue-400 h-[40%] aspect-square left-10 rounded-full blur-[200px] opacity-30"></div>
				<div className="flex absolute bg-sky-400 h-[40%] aspect-square right-10 rounded-full blur-[200px] opacity-30"></div>
			
			</div>



		</div>)
}
