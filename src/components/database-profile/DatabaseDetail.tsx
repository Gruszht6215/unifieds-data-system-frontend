import React, { useState, useEffect, ChangeEvent } from 'react'
import { Disclosure } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { ConnectionProfile } from '../../interfaces/ConnectionProfile'
import { Table } from '../../interfaces/Table'
import { importedDatabaseSelector } from '../../redux/slices/importedDatabaseSlice'
import EditColumnModal from './EditColumnModal'
import EditTableModal from './EditTableModal'
import AddTagColumnFormModal from '../../components/database-profile/AddTagColumnFormModal';
import TagCard from '../../components/tag/TagCard';
import ColumnInfoModal from '../../components/database-profile/ColumnInfoModal';

type Props = {
    connectionProfile: ConnectionProfile
    search: string
    syncStatus: string
}

export default function DatabaseDetail({ connectionProfile, search, syncStatus }: Props) {
    const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);
    const [isEditTableModalOpen, setIsEditTableModalOpen] = useState(false);
    const [isAddTagToColumnModalOpen, setIsAddTagToColumnModalOpen] = useState(false);
    const [isColumnInfoModalOpen, setIsColumnInfoModalOpen] = useState(false);
    const importedDatabaseReducer = useSelector(importedDatabaseSelector)
    const [tables, setTables] = useState<Table[]>([]);
    const [selectedEditTable, setSelectedEditTable] = useState<Table>();
    const [selectedEditColumn, setSelectedEditColumn] = useState<any>();
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageAmount, setPageAmount] = useState(1);

    useEffect(() => {
        const databaseByConnectionId = importedDatabaseReducer.importedDatabases.find((importedDatabase) => importedDatabase.connectionProfileId === connectionProfile.id)
        if (databaseByConnectionId) {
            return setTables(databaseByConnectionId.tables!)
        }
        return setTables([]);
    }, [importedDatabaseReducer.importedDatabases])

    useEffect(() => {
        setPageAmount(Math.ceil(tables!.length / itemPerPage));
    }, [tables])

    const closeEditColumnModal = () => {
        setIsEditColumnModalOpen(false);
    }
    const closeEditTableModal = () => {
        setIsEditTableModalOpen(false);
    }
    const closeAddTagToColumnModal = () => {
        setIsAddTagToColumnModalOpen(false);
    }
    const onClickEditTableHandler = (table: Table) => {
        setSelectedEditTable(table);
        setIsEditTableModalOpen(true);
    }
    const firstCharToUpperCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const setItemPerPageHandler = (e: any) => {
        setItemPerPage(e.target.value);
        setPageAmount(Math.ceil(tables!.length / e.target.value));
        setCurrentPage(1);
    };
    const increaseCurrentPageHandler = () => {
        if (currentPage < Math.ceil(tables!.length / itemPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }
    const decreaseCurrentPageHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    if (syncStatus === "pending") return (
        <div className="flex items-center justify-center mt-[200px] text-4xl font-bold">
            <div className='grid justify-items-center text-blue-600'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                    Please sync your database schema to see the details.
                </div>
            </div>
        </div>
    )
    if (pageAmount === 0) return (
        <div className="flex items-center justify-center mt-[200px] text-4xl font-bold">
            <div className='grid justify-items-center text-blue-600'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <div>
                    No tables found.
                </div>
            </div>
        </div>
    )
    return (
        <>
            <div className='flex justify-center'>
                <div className='flex w-[200px]'>
                    <button className="primary-bg-color text-white w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-l-full"
                        onClick={() => decreaseCurrentPageHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className="flex relative ">
                        <div className='flex justify-center bg-gray-200 w-[70px] border-r-2 border-gray-500 text-gray-700 p-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                            {currentPage}/{pageAmount}
                        </div>
                        <select className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 pl-3 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="itemPerPage"
                            value={itemPerPage}
                            onChange={setItemPerPageHandler}
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <button className="bg-gradient-to-l from-sky-600 to-cyan-400 text-white w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-r-full"
                        onClick={() => increaseCurrentPageHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            {Object.values(tables!).filter((table) => {
                if (search === '') {
                    return table
                } else if (table.name.toLowerCase().startsWith(search.toLowerCase())) {
                    return table
                }
            }).slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((table, idx) => {
                return (
                    <div key={idx} className='w-full my-4 overflow-visible border border-gray-200 drop-shadow-lg'>
                        <div className='group flex flex-col justify-center py-2 rounded-t-lg bg-gradient-to-r from-violet-700 via-purple-500 to-violet-700 cursor-pointer'>
                            <p className='flex uppercase text-xs font-bold justify-center text-gray-100'>
                                {(idx + 1) + ((currentPage - 1) * itemPerPage)}.&nbsp;Table
                            </p>
                            <div className='flex justify-center text-2xl font-bold text-white'>
                                {firstCharToUpperCase(table.name)}
                            </div>
                            <div className="mx-8 mt-1 px-4 rounded-lg font-light leading-relaxed bg-white text-black hover:ring ring-cyan-500">
                                <div className="flex text-sm justify-center" onClick={() => { onClickEditTableHandler(table) }}>
                                    <p className='font-bold text-sm'>
                                        DESCRIPTION:&nbsp;
                                    </p>
                                    {table.description ?
                                        <div className='hover:text-blue-700'>
                                            {table.description}
                                        </div>
                                        : <div>
                                            <button className='text-gray-400 hover:text-blue-700'
                                                onClick={() => { onClickEditTableHandler(table) }}>
                                                No Description Click Here to Add It
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="table w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <div className="table-header-group tertiary-bg-color">
                                <div className="table-row font-medium text-black bg-gray-300">
                                    <div className="table-cell text-left px-6 py-4">Name</div>
                                    <div className="table-cell text-left px-6 py-4">Data Type</div>
                                    <div className="table-cell text-left px-6 py-4">Nullable</div>
                                    <div className="table-cell text-left px-6 py-4">Key</div>
                                    <div className="table-cell text-left px-6 py-4">Default Value</div>
                                    {
                                        connectionProfile.dbms.toLowerCase() !== 'postgresql' &&
                                        <div className="table-cell text-left px-6 py-4">Extra</div>
                                    }
                                    <div className="table-cell text-left px-6 py-4"></div>
                                </div>
                            </div>
                            <div className="table-row-group divide-y divide-gray-100 border-t border-gray-100">
                                {Object.values(table.columns!).map((column, idx) => {
                                    return (
                                        <div className="table-row hover:bg-gray-100" key={idx} >
                                            <div className="table-cell flex gap-3 px-6 py-4 font-normal text-gray-900 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedEditColumn(column)
                                                    setIsColumnInfoModalOpen(true)
                                                }}>
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-700 max-w-[200px] break-all cursor-pointer">
                                                        {column!.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-cell px-6 py-4"
                                                onClick={() => {
                                                    setSelectedEditColumn(column)
                                                    setIsColumnInfoModalOpen(true)
                                                }}>
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-700 max-w-[200px] break-all cursor-pointer">
                                                        {column!.dataType}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-cell px-6 py-4 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedEditColumn(column)
                                                    setIsColumnInfoModalOpen(true)
                                                }}>
                                                {column!.isNullable ? 'Yes' : 'No'}
                                            </div>
                                            <div className="table-cell px-6 py-4 cursor-pointer"
                                                onClick={() => {
                                                    setSelectedEditColumn(column)
                                                    setIsColumnInfoModalOpen(true)
                                                }}>
                                                {
                                                    column!.key ?
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-200 px-2 py-1 text-xs font-semibold text-violet-600">
                                                            {column!.key}
                                                        </span> : null
                                                }
                                            </div>
                                            <div className="table-cell px-6 py-4 max-w-[200px] break-all cursor-pointer"
                                                onClick={() => {
                                                    setSelectedEditColumn(column)
                                                    setIsColumnInfoModalOpen(true)
                                                }}>
                                                {column!.defaultValue}
                                            </div>
                                            {
                                                connectionProfile.dbms.toLowerCase() !== 'postgresql' &&
                                                <div className="table-cell px-6 py-4 max-w-[200px] break-all cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedEditColumn(column)
                                                        setIsColumnInfoModalOpen(true)
                                                    }}>
                                                    {column!.extra}
                                                </div>
                                            }
                                            <div className='table-cell px-6 pr-2 flex justify-end'>
                                                <div className="flex flex-col">
                                                    <Disclosure>
                                                        <Disclosure.Button className="flex justify-end">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel >
                                                            <div className='flex flex-col'>
                                                                <div className="my-2 border-t border-slate-300 text-center" />
                                                                <div className='flex justify-start'>
                                                                    <p className='text-black mr-2'>Description:</p>
                                                                    <div>
                                                                        <button className='text-black justify-self-end'
                                                                            onClick={() => {
                                                                                setIsEditColumnModalOpen(true)
                                                                                setSelectedEditColumn(column)
                                                                            }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {column.description}
                                                                </div>
                                                                <div className="my-2 border-t border-slate-300 text-center" />
                                                                <div className='flex justify-start'>
                                                                    <p className='text-black mr-2'>
                                                                        Tag:
                                                                    </p>
                                                                    <div>
                                                                        <button className='text-black justify-self-end'
                                                                            onClick={() => {
                                                                                setIsAddTagToColumnModalOpen(true)
                                                                                setSelectedEditColumn(column)
                                                                            }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="my-2 grid grid-cols-3 grid-flow-row gap-2 auto-rows-auto">
                                                                    {(column.tags!).map((tag, idx) => (
                                                                        <div key={idx} className="inline-flex">
                                                                            <TagCard tag={tag} />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </Disclosure>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className='flex justify-center'>
                <div className='flex w-[200px] mb-3'>
                    <button className="primary-bg-color text-white w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-l-full"
                        onClick={() => decreaseCurrentPageHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div className="flex relative ">
                        <div className='flex justify-center bg-gray-200 w-[70px] border-r-2 border-gray-500 text-gray-700 p-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                            {currentPage}/{pageAmount}
                        </div>
                        <select className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 pl-3 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="itemPerPage"
                            value={itemPerPage}
                            onChange={setItemPerPageHandler}
                        >
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <button className="bg-gradient-to-l from-sky-600 to-cyan-400 text-white w-[100px] inline-flex items-center justify-center px-3 font-bold text-sm rounded-r-full"
                        onClick={() => increaseCurrentPageHandler()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            {
                isAddTagToColumnModalOpen &&
                <AddTagColumnFormModal
                    isOpen={isAddTagToColumnModalOpen}
                    closeModal={closeAddTagToColumnModal}
                    column={selectedEditColumn}
                />
            }
            {
                isEditColumnModalOpen &&
                <EditColumnModal
                    isOpen={isEditColumnModalOpen}
                    closeModal={closeEditColumnModal}
                    column={selectedEditColumn}
                />
            }
            {
                isEditTableModalOpen &&
                <EditTableModal
                    isOpen={isEditTableModalOpen}
                    closeModal={closeEditTableModal}
                    table={selectedEditTable!}
                />
            }
            {
                isColumnInfoModalOpen &&
                <ColumnInfoModal
                    isOpen={isColumnInfoModalOpen}
                    closeModal={() => setIsColumnInfoModalOpen(false)}
                    column={selectedEditColumn}
                    connectionProfile={connectionProfile}
                />
            }
        </>
    )
}