import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession, signIn, getCsrfToken } from "next-auth/react"
import CobeBackground from '../../components/login/CobeBackground'
import SVG from 'react-inlinesvg';

type Props = {
    csrfToken: any
}

export default function Login({ csrfToken }: Props) {
    const { data: session } = useSession()
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState<any>({ text: "", svg: "" });

    useEffect(() => {
        if (session) {
            window.location.href = "/dashboard"
        }
    }, [session])

    useEffect(() => {
        fetchCaptcha()
    }, [])

    const handleRefresh = async () => {
        await fetchCaptcha()
    };

    const fetchCaptcha = async () => {
        const res = await fetch('/api/captcha');
        const data = await res.json();
        setCaptcha(data);
    };

    async function submitLoginHandler(e: any) {
        e.preventDefault()
        if (e.target.captchaInput.value !== captcha!.text) {
            e.target.captchaInput.value = ""
            alert("Captcha is not correct")
            return
        }
        const redirectUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL + "/dashboard"
        await signIn("credentials", {
            username: e.target.username.value,
            password: e.target.password.value,
            callbackUrl: redirectUrl
        }).catch((err) => {
            console.error(err)
        })
    }

    if (session) {
        return (
            <div></div>
        )
    }
    return (
        <div className="h-screen place-items-center bg-gradient-to-r from-slate-800 to-stone-400">
            <div className='grid grid-cols-9 h-full flex items-center justify-center'>
                {/* Background */}
                <div className='col-span-6 grid justify-items-center'>
                    {/* <Image src="/all_data.svg" alt=""
                        width="0"
                        height="0"
                        priority
                        className="w-full h-auto" /> */}
                    <div className='grid justify-items-center'>
                        <header className="mb-16 group">
                            <h1 className="mb-1 font-mono font-semibold text-4xl text-gray-100 md:text-6xl">
                                Data <br className="block md:hidden" />
                                <span className="inline-flex h-20 py-2 overflow-x-hidden animate-type-reverse" >
                                    Management
                                </span>
                                <span className="box-border inline-block w-1 h-10 ml-2 -mb-2 bg-white md:-mb-4 md:h-16" >
                                </span>
                            </h1>
                            <div className="text-xl font-semibold md:text-3xl">
                                Reach your database in one place
                            </div>
                        </header>
                        <CobeBackground />
                    </div>
                </div>

                {/* Form */}
                <div className='h-full col-span-2 flex items-center justify-center'>
                    <form method="post" onSubmit={submitLoginHandler} action="/api/auth/callback/credentials"
                        className="h-screen bg-white px-8 pt-6 pb-8 flex items-center justify-center">
                        <div>
                            <div className="mb-8 text-center">
                                <Image src={'/login.svg'}
                                    alt="" width="0" height="0" priority className="m-auto rounded-full object-cover lg:w-32 lg:h-32
                            ring-offset-2 ring-4 ring-cyan-600"
                                />
                            </div>
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" >
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username" type="text" placeholder="Username" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                        <label className="hover:bg-gray-300 rounded px-2 text-sm text-gray-600 font-mono cursor-pointer "
                                            onClick={() => setIsShowPassword(!isShowPassword)} >
                                            {isShowPassword ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            }
                                        </label>
                                    </div>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password" type={isShowPassword ? "text" : "password"} placeholder="Password" />
                                </div>
                                {/* <p className="text-red-500 text-xs italic">Please fill the password field.</p> */}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="captcha" className="block text-gray-500 text-sm font-bold mb-2">
                                    Please enter the characters you see in the image below:
                                </label>
                                <div className='flex justify-between'>
                                    {captcha && <SVG src={`data:image/svg+xml;utf8,${captcha.data}`} className="mb-2" />}
                                    <div className="flex items-center justify-center">
                                        <button type="button" onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <input type="text" name="captchaInput" id="captchaInput" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex items-center justify-center">
                                <button className="w-full primary-bg-via-color hover:primary-bg-color text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline
                                    border-sky-500 hover:border-sky-600 shadow-lg shadow-cyan-500/80"
                                    type="submit">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ context }: any) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
