'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Popup from "./popup"

import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react";
import { getToday } from "@/api/progression.mjs";
import { getRoutine } from "@/api/workout.mjs";



export function Tracker({routineId, isRoutine}) {

  const [workout, setData] = useState({ loaded: false, data: [] });

  useEffect(() => {
    if(isRoutine) {
    
      getRoutine(routineId).then((res) => {
        setData({loaded: true, data: res ? res.data : []});
      })

      return;
    }

    const day = new Date().getDay();
    getToday(day).then((res) => {
      if(!res.data){
        setData({loaded: true, data: []})
        return;
      }
      setData({ loaded: true, data: res.data.exercise })
    })
  }, [routineId])


  return (<>
    {!workout.loaded ? <div className="flex flex-col flex-shrink-0 w-full">
      <Skeleton className={" flex flex-shrink-0 h-[60px] w-full bg-neutral-800"} />
    </div> :

      (workout.data.length) === 0 ?
        <div className="flex justify-center h-[300px] text-[5rem]  text-center items-center font-satoshi uppercase font-semibold text-neutral-600 
                        max-laptop:text-[4rem] max-tablet:text-[2rem] max-tablet:h-[200px]">
          {isRoutine ? "No Routines" : "No Scheduled Workouts Today"}

        </div> :
        <Table className="z-0">
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>       
            </TableRow>
          </TableHeader>
          <TableBody>
            {workout.data.map((data, i) => (
              <TableRow key={i} className="text-white">
                <TableCell className="">{data.name}</TableCell>
                <TableCell className="text-right">
                  <Popup data={data} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
    }


  </>)
}


export async function getStaticProps() {
  const res = await getActive()
  const data = await res.json()

  return { props: { data } }
}

