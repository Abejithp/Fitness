import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { HiLightningBolt } from "react-icons/hi";

export default function ProgressTable({ data, update}) {

    const limit = 5;

    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [maxLen, setMaxLen] = useState(data.length)
    const [exercises, setExercises] = useState([]);



    useEffect(() => {
        setExercises(data.slice(page * limit, (page + 1) * limit))
        setMaxLen(data.length)
    }, [data])

    useEffect(() => {
        const filtered = data.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
        setExercises(filtered.slice(page * limit, (page + 1) * limit))
        setMaxLen(filtered.length)
    }, [page, search])

    return (
        <div className="flex flex-col relative h-[100%] justify-evenly gap-2 w-full">
            <div className="flex justify-between max-tablet:flex-col gap-4">
                <input type="text" placeholder='Search for Exercise' className='pl-4 p-1 bg-neutral-900 placeholder:text-neutral-500 rounded-sm
                             font-satoshi h-fit w-fit' autoFocus={false} value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Table className="min-h-[230.5px]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Exercise</TableHead>
              
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exercises.map((el, i) => (
                        <TableRow key={i} className="text-white">
                            <TableCell>{el.name}</TableCell>
                            <TableCell className="text-white text-lg  text-right">
                                <button onClick={() => update(el._id)}>
                                    <HiLightningBolt className=" hover:cursor-pointer mr-2" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination >
                <PaginationContent className="w-full flex justify-between" >
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious onClick={() => {
                            if (page - 1 >= 0)
                                setPage(page - 1)
                        }} />
                    </PaginationItem>

                    <PaginationItem className="cursor-pointer">
                        <PaginationNext onClick={() => {
                            if ((page + 1) * limit < maxLen)
                                setPage(page + 1)
                        }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>

    )
}
