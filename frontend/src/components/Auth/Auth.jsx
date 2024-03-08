'use client'

import './auth.css'
import { login, register, logout } from "../../api/auth.mjs"

import { Button } from "@/components/ui/button"

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';

function handleSubmit(res, err) {
    if (!res) {
        return console.log("FAILED")
    }

    window.location.href = '/dashboard'
}

function handleLogin(data) {
    login(data.username, data.password).then((res) => handleSubmit(res))
}

export function Login() {
    const form = useForm();

    return (<>
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(handleLogin)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex-col gap-8">
                            <FormLabel className="text-white font-satoshi font-medium">Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="flex-col gap-8">
                            <FormLabel className="text-white font-satoshi font-medium">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </>)
}

export function Register(props) {
    const { user, password } = props
    return (<>
        <button onClick={function () {
            if (user != '' && password != '') {
                register(user, password).then((res) => handleSubmit(res))
            }
        }} className='auth-btn'>
            Register
        </button>
    </>)
}

export function Logout() {
    return (<>
        <button className='logout' onClick={() => logout().then(() => { window.location.href = '/' })}>
            <img src="./logout.png" />
        </button>
    </>)
}

