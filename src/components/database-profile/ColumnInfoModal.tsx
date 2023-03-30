import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { Column } from '../../interfaces/Column'
import { ConnectionProfile } from '../../interfaces/ConnectionProfile'

type Props = {
    isOpen: boolean
    closeModal: () => void
    column: Column
    connectionProfile: ConnectionProfile
}

export default function ColumnInfoModal({ isOpen, closeModal, column, connectionProfile }: Props) {
    let completeButtonRef = useRef(null)

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" initialFocus={completeButtonRef} className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Column Info
                                    </Dialog.Title>
                                    <div className="mt-2 grid gap-2">
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                Column Name
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {column.name ? column.name : 'None'}
                                            </p>
                                        </div>
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                Data Type
                                            </div>
                                            <p className="text-sm text-gray-700 break-all">
                                                {column.dataType ? column.dataType : 'None'}
                                            </p>
                                        </div>
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                IsNullable
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {column.isNullable ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                Key
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {
                                                    column.key ?
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-200 px-2 py-1 text-xs font-semibold text-violet-600">
                                                            {column!.key}
                                                        </span> : 'None'
                                                }
                                            </p>
                                        </div>
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                Default Value
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {column.defaultValue ? column.defaultValue : 'None'}
                                            </p>
                                        </div>
                                        {
                                            connectionProfile.dbms.toLowerCase() !== 'postgresql' &&
                                            <div className='p-2 bg-gray-200 rounded-lg'>
                                                <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                    Extra
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    {column.extra ? column.extra : 'None'}
                                                </p>
                                            </div>
                                        }
                                        <div className='p-2 bg-gray-200 rounded-lg'>
                                            <div className="text-sm font-medium text-gray-900 underline underline-offset-2 mb-1">
                                                Description
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {column.description ? column.description : 'None'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
