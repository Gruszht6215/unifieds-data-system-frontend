import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react"

type Props = {}

export default function Sidebar({ }: Props) {
    const { data: session } = useSession()
    const router = useRouter()
    const [selectedMenu, setSelectedMenu] = useState("");

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    }

    useEffect(() => {
        //Is the route is focused on the current page
        if (router.pathname === router.asPath) {
            let pathArr = router.pathname.split("/");
            setSelectedMenu(pathArr[1]);
            // var jwt = require('jsonwebtoken');
            // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
            // console.log(token)
        }
    }, [router, router.asPath]);

    const handleSignout = () => {
        router.push("/dashboard").then(() => {
            signOut();
        });
    };

    return (
        <div className="flex overflow-hidden bg-white">
            <aside className="ml-[-100%] fixed z-10 top-0 bottom-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-y-auto">
                <div className="">
                    <div className="mt-8 text-center">
                        <Image src={'/admin_profile.svg'}
                            alt="" width="0" height="0" priority className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28
                            ring-offset-2 ring-4 ring-cyan-600"
                        />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
                            {session?.user.Role === "admin" ? "Data Admin" : "Data Consumer"}
                        </h5>
                        <div className='flex items-center justify-center'>
                            <span className="hidden text-gray-400 lg:block">
                                {session?.user.Host}
                            </span>
                            <span className="hidden text-gray-500 lg:block">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <ul className="space-y-2 tracking-wide mt-8">
                        <li>
                            <Link href={'/dashboard'} aria-label="dashboard" onClick={() => handleMenuClick("dashboard")}
                                className={`${selectedMenu === "dashboard" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white primary-bg-color"
                                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <span className={`${selectedMenu === "dashboard" ? "-mr-1 font-medium" : "group-hover:text-gray-700"}`}>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/connection-profile'} onClick={() => handleMenuClick("connection-profile")}
                                className={`${selectedMenu === "connection-profile" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white primary-bg-color"
                                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                </svg>
                                <span className={`${selectedMenu === "connection-profile" ? "-mr-1 font-medium" : "group-hover:text-gray-700"}`}>Connection Profile</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/manage-database"
                                className={`${selectedMenu === "manage-database" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white primary-bg-color"
                                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}`}>
                                <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                    <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                    <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                                </svg>
                                <span className={`${selectedMenu === "manage-database" ? "-mr-1 font-medium" : "group-hover:text-gray-700"}`}>Manage Database</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href={'/classification'}
                                className={`${selectedMenu === "classification" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white primary-bg-color"
                                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span className="group-hover:text-gray-700">Classification</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href={'/'} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                                <span className="group-hover:text-gray-700">Activity Logs</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                        onClick={() => handleSignout()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="group-hover:text-gray-700">Logout</span>
                    </button>
                </div>
            </aside >
        </div >
    )
}