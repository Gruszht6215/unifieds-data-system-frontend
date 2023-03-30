import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { globalLoadingSelector } from '../../redux/slices/globalLoadingSlice'

type Props = {
    size: number
}

export default function GlobalLoading({ size }: Props) {
    const { isLoading } = useSelector(globalLoadingSelector)
    let completeButtonRef = useRef(null)

    function closeModal() {
    }
    return (
        <>
            {/* <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div> */}
            <Transition appear show={isLoading} as={Fragment}>
                <Dialog initialFocus={completeButtonRef} as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="transform align-middle transition-all">
                                    <div className="w-[50%] flex-center h-10">
                                        <div
                                            style={{ width: `${size}px`, height: `${size}px` }}
                                            className="animate-spin">
                                            <div className="h-full w-full border-8 border-t-cyan-500 border-b-purple-500 rounded-[50%]">
                                            </div>
                                        </div>
                                    </div>
                                    <button ref={completeButtonRef}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}