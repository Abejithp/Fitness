'use client'

import { useState } from "react";
import Updater from "./updater";

function Input() {

    const [reps, setReps] = useState(10);
    const [sets, setSets] = useState(3);
    const [weight, setWeight] = useState(100);

    const handleUpdate = (curr, val) => {
        if (curr + val > -1) {
            return curr + val;
        }
        return 0;
    }

    return (
        <div className="flex bg-neutral-900 h-full w-full rounded-lg p-8 px-12 flex-col">
            <div className="flex text-neutral-600 font-satoshi font-normal text-[3rem] ml-4">Today's Progress</div>

            <div className="flex justify-between gap-10">
                <div className="flex flex-col">
                    <div className="flex  text-white font-satoshi text-[8rem] font-semibold gap-3">
                        <div className="flex">{weight}</div>
                        <div className="flex">lbs</div>
                    </div>

                    <div className="flex text-[3rem] gap-6 items-center ml-6 mt-[-1.5rem]">
                        <div className="flex gap-2 text-white font-satoshi font-semibold">
                            <div className="flex">{sets}</div>
                            <div className="flex">sets</div>
                        </div>
                        <div className="flex text-white uppercase font-normal text-base mt-2">for</div>
                        <div className="flex gap-2 text-white font-satoshi font-semibold">
                            <div className="flex">{reps}</div>
                            <div className="flex">reps</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 h-full justify-center items-center w-[40%] mt-2">
                    <Updater name={"Weight"} update={(val) => setWeight((weight) => handleUpdate(weight, val))} />
                    <Updater name={"Sets"} update={(val) => setSets((sets) => handleUpdate(sets, val))} />
                    <Updater name={"Reps"} update={(val) => setReps((reps) => handleUpdate(reps, val))} />
                    <div className="flex w-full justify-end">
                        <button type="submit" className="text-white bg-neutral-700 font-satoshi px-4 p-2 rounded-full mt-4" >
                            Submit
                        </button>
                    </div>

                </div>
            </div>







        </div>
    );
}

export default Input;