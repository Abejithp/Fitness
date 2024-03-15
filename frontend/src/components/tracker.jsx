'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Popup from "./popup"
import { getActive } from "@/api/progression.mjs"
import { Skeleton } from "./ui/skeleton"
import { useEffect, useState } from "react";



export function Tracker() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getActive().then((res) => res.json()).then((data) => setData(data))
  }, [])

  console.log(data)
  return (<>
    {data.length == 0 ? <div className="flex flex-col flex-shrink-0 gap-4 w-full h-[70%] pt-8">
      <Skeleton className={" flex flex-shrink-0 h-[60px] w-full bg-neutral-800"} />
      <div className="flex flex-col gap-3">
        {Array(4).fill(0).map((_, index) => {
          return (<div className="flex gap-2" key={index}>
            <Skeleton className={"h-[50px] w-[100px] bg-neutral-800"} />
            <Skeleton className={"h-[50px] w-[100px] bg-neutral-800 max-tablet:hidden"} />
            <Skeleton key={index} className={"h-[50px] w-full bg-neutral-800"} />
            <Skeleton className={"h-[50px] w-[150px] bg-neutral-800"} />
          </div>
          
          )
        })}
      </div> 

    </div> :
      <Table className="mt-8 z-0">
        <TableHeader>
          <TableRow>
            <TableHead className="max-tablet:hidden">Muscle Group</TableHead>
            <TableHead>Exercise</TableHead>
            <TableHead className="max-tablet:hidden">Status</TableHead>
            <TableHead>Popup</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} className="text-white">
              <TableCell className="font-medium max-tablet:hidden">{invoice.invoice}</TableCell>
              <TableCell className="max-tablet:hidden">{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell >
                <Popup />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>}

  </>)
}


export async function getStaticProps() {
  const res = await getActive()
  const data = await res.json()

  return { props: { data } }
}

