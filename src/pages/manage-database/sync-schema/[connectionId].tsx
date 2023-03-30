import React, { useState, useEffect, ChangeEvent } from 'react'
import { Disclosure } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { ConnectionProfile } from '../../../interfaces/ConnectionProfile';
import { getOneConnectionProfile, importConnectionDatabase } from '../../../services/ConnectionProfileService'
import { getSession } from "next-auth/react"
import { syncDatabaseSchema } from '../../../services/ImportedDatabaseService'
import { setGlobalToastOpen } from '../../../redux/slices/globalToastSlice'
import { openGlobalLoading, closeGlobalLoading } from '../../../redux/slices/globalLoadingSlice';
import { useAppDispatch } from '../../../redux/store'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

type Props = {
    connectionProfile: ConnectionProfile
}

export default function SyncSchema({ connectionProfile }: Props) {
    //"active", "pending" or "not import"
    const [importDbStatus, setImportDbStatus] = useState(connectionProfile.importedDatabase?.status);
    const [databaseName, setDatabaseName] = useState(connectionProfile.databaseName);
    const [importedDbId, setImportedDbId] = useState(connectionProfile.importedDatabase?.id);

    const dispatch = useAppDispatch()

    const firstCharToUpperCase = (str: string) => {
        try {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } catch (e) {
            return str;
        }
    }

    const handleSyncSchemaOnClick = async (importedDbId: string) => {
        dispatch(openGlobalLoading())
        const data = await syncDatabaseSchema(importedDbId)
        if (data.status === "success") {
            setImportDbStatus("active")
        } else {
            setImportDbStatus("pending")
        }
        await dispatch(setGlobalToastOpen(data))
        dispatch(closeGlobalLoading())
    }

    const handleImportDatabaseOnClick = async (importedDbId: string) => {
        let importDbPayload = {
            databaseName: databaseName,
        }
        const data = await importConnectionDatabase(importedDbId, importDbPayload).then((res) => {
            if (res) {
                if (res.status === "success") {
                    setImportDbStatus("pending")
                    setImportedDbId(res.data.importedDatabase.id)
                }
            }
            return res
        })
        await dispatch(setGlobalToastOpen(data))
    }

    const setDatabaseNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDatabaseName(e.target.value);
    };

    //initail import db status
    useEffect(() => {
        if (importedDbId == '0') {
            setImportDbStatus("not import")
        } else {
            setImportDbStatus(connectionProfile.importedDatabase?.status)
        }
    }, [importedDbId, connectionProfile])

    return (
        <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-cyan-100 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75">
                                <span>Connection Profile</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-cyan-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 ring-4">
                                    <h3 className="text-sm font-medium leading-5">
                                        {connectionProfile.connectionName}
                                    </h3>

                                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                        <li>{connectionProfile.dbms}</li>
                                        <li>&middot;</li>
                                        <li>{connectionProfile.databaseName}</li>
                                        <li>&middot;</li>
                                        <li>{connectionProfile.host}</li>
                                    </ul>
                                </form>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2" defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-cyan-100 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75">
                                <span>Database</span>
                                <ChevronUpIcon
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-cyan-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                                <div className="bg-white shadow-md rounded px-8 py-6 ring-4">
                                    {importDbStatus != 'not import' ?
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                                Database Name
                                            </label>

                                            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                                {databaseName}
                                            </div>
                                        </div>
                                        : <div className="mb-4">
                                            <h1 className='flex items-center justify-center font-bold mb-6'>
                                                Database not imported
                                            </h1>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                                Database Name
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                value={databaseName}
                                                onChange={setDatabaseNameHandler}
                                            />
                                        </div>
                                    }
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                                            Database Status
                                        </label>
                                        <div className='flex'>
                                            {importDbStatus != 'not import' ?
                                                <span className={`${importDbStatus === "pending" ?
                                                    "bg-bg-pending-btn text-txt-pending-btn "
                                                    : "bg-bg-active-btn text-txt-active-btn "}
                                                    w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm border border-r-0 rounded-l-md
                                                    `}>
                                                    {firstCharToUpperCase(importDbStatus!)}
                                                </span>
                                                : <span className="bg-red-200 text-red-600 
                                                    w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm border border-r-0 rounded-l-md">
                                                    Empty
                                                </span>
                                            }
                                            {importDbStatus != 'not import' ?
                                                <button className={`${importDbStatus === "pending" ?
                                                    "primary-bg-color"
                                                    : "bg-gray-500"}
                                                    w-full text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline
                                                    `}
                                                    onClick={async () => await handleSyncSchemaOnClick(importedDbId!)}
                                                    disabled={importDbStatus === "active"}>
                                                    Sync Schema
                                                </button>
                                                : <button className="bg-sky-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                                    onClick={async () => await handleImportDatabaseOnClick(connectionProfile.id)}>
                                                    Import Database
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div >
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connectionId = context.params?.connectionId
    const session = await getSession(context)
    const data = await getOneConnectionProfile(connectionId as string, session?.user)
    const connectionProfile: ConnectionProfile = data.data
    return {
        props: {
            connectionProfile: connectionProfile
        },
    }
}