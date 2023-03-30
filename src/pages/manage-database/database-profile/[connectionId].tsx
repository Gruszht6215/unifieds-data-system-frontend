import React, { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { GetServerSideProps } from 'next'
import { ConnectionProfile } from '../../../interfaces/ConnectionProfile';
import { getOneConnectionProfile, importConnectionDatabase } from '../../../services/ConnectionProfileService'
import { updateOneImportedDatabase } from '../../../services/ImportedDatabaseService';
import { fetchImportedDatabases } from '../../../redux/slices/importedDatabaseSlice'
import { getSession } from "next-auth/react"
import { setGlobalToastOpen } from '../../../redux/slices/globalToastSlice'
import { useAppDispatch } from '../../../redux/store'
import { openGlobalLoading, closeGlobalLoading } from '../../../redux/slices/globalLoadingSlice';
import { syncDatabaseSchema } from '../../../services/ImportedDatabaseService'
import { importedDatabaseSelector } from '../../../redux/slices/importedDatabaseSlice'
import { Table } from '../../../interfaces/Table'

import DbmsLogo from '../../../components/style-compute/DbmsLogo';
import DatabaseDetail from '../../../components/database-profile/DatabaseDetail';
import ReSyncSchemaModal from '../../../components/database-profile/ReSyncSchemaModal';

type Props = {
    connectionProfile: ConnectionProfile
}

export default function SyncSchema({ connectionProfile }: Props) {
    const dispatch = useAppDispatch()
    const [importDbStatus, setImportDbStatus] = useState(connectionProfile.importedDatabase?.status);//"active", "pending" or "not sync"
    const [importedDbId, setImportedDbId] = useState(connectionProfile.importedDatabase?.id);
    const [databaseDescription, setDatabaseDescription] = useState(connectionProfile.importedDatabase?.description);
    const [updateDatabaseDescription, setUpdateDatabaseDescription] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const importedDatabaseReducer = useSelector(importedDatabaseSelector)
    const [tables, setTables] = useState<Table[]>([]);
    const [isReSyncSchemaModalOpen, setIsReSyncSchemaModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (importedDbId == '0') {
            setImportDbStatus("not sync")
        } else {
            setImportDbStatus(connectionProfile.importedDatabase?.status)
        }
    }, [importedDbId, connectionProfile])

    useEffect(() => {
        const databaseByConnectionId = importedDatabaseReducer.importedDatabases.find((importedDatabase) => importedDatabase.connectionProfileId === connectionProfile.id)
        if (databaseByConnectionId) {
            return setTables(databaseByConnectionId.tables!)
        }
        return setTables([]);
    }, [importedDatabaseReducer.importedDatabases])

    const firstCharToUpperCase = (str: string) => {
        try {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } catch (e) {
            return str;
        }
    }

    const setDatabaseDescriptionHandler = async (e: any) => {
        e.preventDefault();
        setUpdateDatabaseDescription(e.currentTarget.textContent);
    };

    const saveDatabaseDesciptionHandler = async () => {
        setDatabaseDescription(updateDatabaseDescription);
        if (connectionProfile.importedDatabase) {
            connectionProfile.importedDatabase.description = updateDatabaseDescription;
            const res = await updateOneImportedDatabase(connectionProfile.importedDatabase!);
            dispatch(setGlobalToastOpen(res))
            setIsEditing(false)
        }
    }
    const cancelDatabaseDesciptionHandler = async () => {
        setDatabaseDescription(databaseDescription);
        setIsEditing(false)
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
        refreshData();
    }

    const handleImportDatabaseOnClick = async (importedDbId: string) => {
        let importDbPayload = {
            databaseName: connectionProfile.databaseName,
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

    const refreshData = () => {
        dispatch(fetchImportedDatabases())
    }

    let [filter] = useState({
        Profile: [
            {},
        ],
        Schema: [
            {},
        ],
    })

    const dateFormater = (date: any) => {
        const newDate = new Date(date)
        const options = { timeZone: 'Asia/Bangkok' };
        const bangkokDateString = newDate.toLocaleString('en-US', options);
        const day = bangkokDateString.split('/')[1]
        const month = bangkokDateString.split('/')[0]
        const year = bangkokDateString.split('/')[2].split(',')[0]
        const time = bangkokDateString.split(',')[1].trim()
        const formattedDate = `${day}/${month}/${year}, ${time}`;
        return formattedDate
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const setSearchValueHandler = (e: any) => {
        setSearchValue(e.target.value)
    }

    return (
        <div className="rounded-2xl">
            <Tab.Group>
                <div className='flex items-center justify-between '>
                    <Tab.List className="max-w-sm flex space-x-1 rounded-xl primary-bg-color p-1 w-full">
                        {Object.keys(filter).map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <div className="flex text-gray-600">
                        <span className="primary-bg-color text-white w-[50px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-l-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input className="border-2 w-[250px] border-cyan-500 bg-white h-10 px-2 rounded-r text-sm focus:outline-none"
                            type="search" name="search" placeholder="Search table name..."
                            onChange={setSearchValueHandler}
                        />
                    </div>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="relative mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 ring-4 ring-sky-600">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full flex justify-center">
                                        <div className="relative w-[150px] h-[150px] grid h-screen place-items-center 
                                            shadow-xl bg-white ring-4 ring-violet-600 rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]">
                                            <DbmsLogo dbms={connectionProfile.dbms} ImgClass="w-[100px] h-[100px]" />
                                        </div>
                                    </div>
                                    <div className="w-full text-center mt-20">
                                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                                            {connectionProfile.connectionName}
                                        </h3>
                                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                            {importDbStatus === "active" &&
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600" >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                    {firstCharToUpperCase(importDbStatus)}
                                                </span>}
                                            {importDbStatus === "pending" &&
                                                <span className="inline-flex items-center gap-1 rounded-full bg-bg-pending-btn px-2 py-1 text-xs font-semibold text-txt-pending-btn" >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                                    {firstCharToUpperCase(importDbStatus)}
                                                </span>}
                                            {importDbStatus === "not sync" &&
                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600" >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                                                    {firstCharToUpperCase(importDbStatus)}
                                                </span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-1 lg:pt-4 pt-8 pb-0">
                                    <div className="text-center">
                                        <span className="text-xl font-bold block tracking-wide text-slate-700">
                                            {connectionProfile.databaseName}
                                        </span>
                                        <span className="text-sm text-slate-400">
                                            Database
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="px-3 pb-3 text-center">
                                            <span className="text-xl font-bold block tracking-wide text-slate-700">
                                                {connectionProfile.host}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Host
                                            </span>
                                        </div>
                                        <div className="px-3 pb-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                                                {connectionProfile.port}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Port
                                            </span>
                                        </div>

                                        <div className="px-3 pb-3 text-center">
                                            <span className="text-xl font-bold block tracking-wide text-slate-700">
                                                {connectionProfile.username}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Username
                                            </span>
                                        </div>

                                        <div className="px-3 pb-3 text-center">
                                            <span className="grid justify-items-center text-xl font-bold block uppercase tracking-wide text-slate-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Password
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-1">
                                    <div className="flex justify-center pb-0">
                                        {/* Sync Schema Button */}
                                        {
                                            importDbStatus == "active" &&
                                            <div className=''>
                                                <div className='flex'>
                                                    <span className="bg-bg-active-btn text-txt-active-btn w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-l-md ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                    <button className="secondary-bg-color shadow-lg shadow-purple-500/50 w-full text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                                        onClick={() => setIsReSyncSchemaModalOpen(true)}>
                                                        Re-Sync Schema
                                                    </button>
                                                </div>
                                                {
                                                    tables.length > 0 &&
                                                    <div className='text-slate-500 text-sm font-semibold'>
                                                        {`last sync: ${dateFormater(tables[0].createdAt)}`}
                                                    </div>
                                                }
                                            </div>
                                        }
                                        {
                                            importDbStatus == "pending" &&
                                            <div className='flex'>
                                                <span className="bg-bg-pending-btn text-txt-pending-btn w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-l-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <button className="secondary-bg-color shadow-lg shadow-purple-500/50 w-full text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                                    onClick={() => handleSyncSchemaOnClick(importedDbId!)}>
                                                    Sync Schema
                                                </button>
                                            </div>
                                        }
                                        {
                                            importDbStatus == "not import" &&
                                            <div className='flex'>
                                                <span className="bg-red-200 text-red-600 w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm border border-r-0 rounded-l-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M6.72 5.66l11.62 11.62A8.25 8.25 0 006.72 5.66zm10.56 12.68L5.66 6.72a8.25 8.25 0 0011.62 11.62zM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                <button className="bg-sky-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                                    onClick={() => handleImportDatabaseOnClick(connectionProfile.id)}>
                                                    Import Database
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="mt-6 py-6 border-t border-slate-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full px-4">
                                            <div className='grid grid-cols-3'>
                                                <div />
                                                <h5 className="flex items-center justify-self-center text-center text-sm text-slate-700 font-bold leading-normal mb-1">
                                                    DATABASE DESCRIPTION:
                                                </h5>
                                                {isEditing &&
                                                    <div className='flex gap-2 justify-self-end'>
                                                        <button className="flex gap-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                                                            onClick={saveDatabaseDesciptionHandler}>
                                                            Save
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                                className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                        </button>
                                                        <button className="flex gap-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full"
                                                            onClick={cancelDatabaseDesciptionHandler}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                                className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                            {isEditing &&
                                                <div contentEditable={true} suppressContentEditableWarning={true}
                                                    className="font-light leading-relaxed text-slate-600 mb-4 mt-1 cursor-pointer"
                                                    onClick={() => { setIsEditing(true) }} onInput={setDatabaseDescriptionHandler}>
                                                    {databaseDescription}
                                                </div>
                                            }
                                            {!isEditing &&
                                                <div className="font-light leading-relaxed text-slate-600 mb-4 mt-1 cursor-pointer hover:text-blue-500"
                                                    onClick={() => { setIsEditing(true) }}>
                                                    {databaseDescription ? databaseDescription : '"No Description" <<Double click to add description>>'}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Tab.Panel>
                    <Tab.Panel>
                        <DatabaseDetail
                            connectionProfile={connectionProfile}
                            search={searchValue}
                            syncStatus={importDbStatus!}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {
                isReSyncSchemaModalOpen &&
                <ReSyncSchemaModal
                    isOpen={isReSyncSchemaModalOpen}
                    closeModal={() => setIsReSyncSchemaModalOpen(false)}
                    confirmHandler={() => {
                        setIsReSyncSchemaModalOpen(false)
                        handleSyncSchemaOnClick(importedDbId!)
                    }}
                />
            }
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    const userData = session?.user
    const connectionId = context.params?.connectionId
    const data = await getOneConnectionProfile(connectionId as string, userData)
    const connectionProfile: ConnectionProfile = data.data

    return {
        props: {
            connectionProfile: connectionProfile
        },
    }
}