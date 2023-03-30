import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, ChangeEvent, useRef } from 'react'
import { Column } from '../../interfaces/Column'
import { updateOneColumn } from '../../services/ColumnService'
import { setGlobalToastOpen } from '../../redux/slices/globalToastSlice'
import { useAppDispatch } from '../../redux/store'
import { addColumnDescription } from '../../redux/slices/importedDatabaseSlice'

type Props = {
    isOpen: boolean
    closeModal: () => void
    column: Column
}

export default function EditColumnModal({ isOpen, closeModal, column }: Props) {
    const dispatch = useAppDispatch()
    const [descriptionValue, setDescriptionValue] = useState(column.description)
    let completeButtonRef = useRef(null)
    
    const setDescriptionHandler = (e: any) => {
        setDescriptionValue(e.target.value);
    };

    const saveDescriptionHandler = async () => {
        dispatch(addColumnDescription({columnId: column.id, description: descriptionValue}))
        let payloadBody = {
            columnId: column.id,
            description: descriptionValue
        }
        const res = await updateOneColumn(payloadBody);
        dispatch(setGlobalToastOpen(res));
        closeModal();
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={completeButtonRef} onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {column.name}
                                    </Dialog.Title>
                                    <form className="mt-2">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                                Description:
                                            </label>
                                            <textarea
                                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="description"
                                                rows={3}
                                                value={descriptionValue}
                                                onChange={setDescriptionHandler}
                                            ></textarea>
                                        </div>
                                    </form>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="mx-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            ref={completeButtonRef}
                                            onClick={saveDescriptionHandler}
                                        >
                                            Save
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
