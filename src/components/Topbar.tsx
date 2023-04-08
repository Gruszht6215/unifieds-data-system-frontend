import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {}

export default function Topbar({ }: Props) {
    const router = useRouter()

    //submit handler
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    function MenuName() {
        let pathArr = router.pathname.split("/");
        let pathName = pathArr[1];
        switch (pathName) {
            case "dashboard":
                return "Dashboard";
            case "manage-database":
                return "Manage Database";
            case "connection-profile":
                return "Connection Profile";
            case "classification":
                return "Classification";
            default:
                return "Dashboard";
        }
    }

    return (
        <div>
            <div className="border-b bg-white">
                <div className="flex items-center justify-between space-x-4 2xl:container">
                    <h5 hidden className="ml-6 text-2xl text-black font-medium lg:block">
                        {MenuName()}
                    </h5>
                    <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link href={'/dashboard'}>
                        <div className="primary-bg-color rounded-l-full flex space-x-4 pl-4 py-3 flex items-center space-x-4 text-black font-bold">
                            <div className='bg-black rounded-l-full p-1'>
                                <h1 className="px-1 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-xl text-transparent font-black">
                                    UNIFIEDS DATA SYSTEM
                                </h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}