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

function handleRegister(data) {
    register(data.username, data.password).then((res) => handleSubmit(res))
}

export function Login() {
    const form = useForm();

    return (<>
        <Form {...form}>
            <form className="space-y-4 w-full" onSubmit={form.handleSubmit(handleLogin)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className=" bg-slate-600 w-full">Login</Button>
            </form>
        </Form>
    </>)
}

export function Register() {
    const form = useForm();

    return (<>
        <Form {...form}>
            <form className="space-y-4 w-full" onSubmit={form.handleSubmit(handleRegister)}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>

                            <FormControl>
                                <Input type="password" placeholder="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className=" bg-slate-600 w-full">Sign Up</Button>
            </form>
        </Form>
    </>)
}

export function Logout() {
    return (<>
        <button className='logout' onClick={() => logout().then(() => { window.location.href = '/' })}>
            <img src="./logout.png" />
        </button>
    </>)
}

