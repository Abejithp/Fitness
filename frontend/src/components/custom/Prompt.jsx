import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Prompt({update, trigger}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild className=' cursor-pointer mr-2'>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-md bg-neutral-950 border-black text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-left">Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-left">
                        This action cannot be undone. This will permanently delete your workout.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={'flex flex-row items-center justify-end gap-4'}>
                    <AlertDialogCancel className="w-fit h-fit  mt-0 font-medium bg-neutral-800 text-white border-neutral-800 hover:bg-red-500 hover:text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild className="w-fit h-fit text-black bg-white hover:bg-indigo-600 hover:text-white" >
                        <button onClick={() => update()} >Continue</button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


