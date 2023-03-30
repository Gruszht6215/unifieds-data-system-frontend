import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ImportedDatabase } from '../../interfaces/ImportedDatabase'
import { GlobalModal, GlobalModalProps, GlobalModalType, GlobalModalPropsType } from '../../interfaces/GlobalModal'
import { useAppDispatch } from '../../redux/store'
import { deleteImportedDatabaseDispatch } from '../../redux/slices/importedDatabaseSlice'
import { openGlobalModal } from '../../redux/slices/globalModalSlice'

type Props = {
    importedDatabase: ImportedDatabase
}

export default function ImportedDatabaseList({ importedDatabase }: Props) {
    const dispatch = useAppDispatch()
    const firstCharToUpperCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //open global modal
    const openDeleteGlobalModalHandler = () => {
        const confirmActionHandler = () => {
            dispatch(deleteImportedDatabaseDispatch(importedDatabase.id))
        }
        const modalProps: GlobalModalProps = {
            type: GlobalModalPropsType.WARNING,
            title: "Delete/Drop \"" + importedDatabase.name + "\" Database?",
            description: "Are you sure you want to delete/drop this database? This action cannot be undone.",
            confirmAction: confirmActionHandler
        }
        const modalPayload: GlobalModal = {
            modalType: GlobalModalType.TWO_BUTTONS,
            modalProps: modalProps,
        }
        dispatch(openGlobalModal(modalPayload))
    }
    const openEditGlobalModalHandler = () => {
    }

    return (
        <div className="w-full h-full">
            <table className="w-full whitespace-nowrap">
                <tbody>
                    {/* <tr className="focus:outline-none h-16 border border-gray-100 rounded"> */}
                    <tr className="focus:outline-none border-b h-16 rounded">
                        <td>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <div className="flex items-center justify-center ml-5 mr-2">
                                        <div className="bg-gray-200 rounded-sm w-10 h-10 flex flex-shrink-0 justify-center items-center relative">
                                            <Image width="0" height="0" className="w-full h-full"
                                                src={importedDatabase.dbms.toUpperCase() === 'MYSQL' ? '/mysql_logo.svg' : '/postgresql_logo.svg'}
                                                alt="" />
                                        </div>
                                    </div>
                                    <div className="flex items-center pl-2 space-y-0">
                                        <div className='flex-col'>
                                            <div className="flex">
                                                <p className="text-base font-bold text-gray-700 mr-2">
                                                    Database:
                                                </p>
                                                <p className="text-base font-bold text-gray-700 mr-2">
                                                    {importedDatabase.name}
                                                </p>
                                            </div>
                                            <p className="text-base text-gray-500 lg:block">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-col'>
                                    <div className="top-16 w-full max-w-sm">
                                        <Popover className="relative">
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button
                                                        className={`
                                                        ${open ? '' : 'text-opacity-90'}
                                                        rounded-full w-[125px] font-semibold text-sm cursor-pointer bg-gray-200 hover:bg-gray-400 active:bg-gray-300 transition duration-300 ease flex items-center justify-center mb-1`}
                                                    >
                                                        <ChevronDownIcon
                                                            className={`${open ? '' : 'text-opacity-70'}
                                                            h-5 w-5 text-black transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0 translate-y-1"
                                                        enterTo="opacity-100 translate-y-0"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100 translate-y-0"
                                                        leaveTo="opacity-0 translate-y-1"
                                                    >
                                                        <Popover.Panel className="absolute z-10 left-1/2 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                                <div className="flex-col relative bg-white p-3">
                                                                    <button
                                                                        className="w-full mb-1 flex items-center rounded-full p-2 transition duration-150 ease-in-out hover:bg-orange-300 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                                                                    bg-orange-400"
                                                                        onClick={() => { openEditGlobalModalHandler() }}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <div className="ml-4">
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                EDIT
                                                                            </p>
                                                                        </div>
                                                                    </button>
                                                                    <button
                                                                        className="w-full flex items-center rounded-full p-2 transition duration-150 ease-in-out hover:bg-red-400 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                                                                    bg-red-500"
                                                                        onClick={() => { openDeleteGlobalModalHandler() }}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <div className="ml-4">
                                                                            <p className="text-sm font-bold">
                                                                                DELETE
                                                                            </p>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    </div>
                                    <div>
                                        <Link href={`/manage-database/sync-schema/${importedDatabase.connectionProfileId}`}>
                                            <div className={`${importedDatabase.status === "pending" ?
                                                "text-txt-pending-btn bg-bg-pending-btn hover:bg-orange-200"
                                                : "text-txt-active-btn bg-bg-active-btn hover:bg-green-300"}
                                                rounded-full w-[125px] font-semibold text-sm cursor-pointer active:bg-gray-300 transition duration-300 ease flex items-center justify-center`}>
                                                {firstCharToUpperCase(importedDatabase.status!)}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {/* <tr className="h-3"></tr> */}
                </tbody>
            </table>
        </div >
    )
}