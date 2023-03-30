import { Fragment, useState, ChangeEvent, useEffect } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Tag } from '../../interfaces/Tag'
import { updateOneTag } from '../../services/TagService'
import { useAppDispatch } from '../../redux/store'
import { setGlobalToastOpen } from '../../redux/slices/globalToastSlice'
import { updateTagByTagIdToColumn } from '../../redux/slices/importedDatabaseSlice'
import { updateTagByTagIdToCluster, clearClusters } from '../../redux/slices/clusterSlice'

type Props = {
    isOpen: boolean
    closeModal: () => void
    tag: Tag
}

const colors = [
    { id: 1, name: 'Red' },
    { id: 2, name: 'Blue' },
    { id: 3, name: 'Yellow' },
    { id: 4, name: 'Green' },
    { id: 5, name: 'Purple' },
]

export default function EditTagModal({ isOpen, closeModal, tag }: Props) {
    const dispatch = useAppDispatch()
    const [nameValue, setNameValue] = useState(tag.name)
    const [descriptionValue, setDescriptionValue] = useState(tag.description)
    const [selectedTagColor, setSelectedTagColor] = useState(colors[0])


    useEffect(() => {
        const index = colors.findIndex((color) => color.name.toLowerCase() === tag.color.toLowerCase())
        setSelectedTagColor(colors[index])
    }, [tag.color])

    const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    };
    const setDescriptionHandler = (e: any) => {
        setDescriptionValue(e.target.value);
    };
    const onClickSaveTagHandler = async () => {
        const payloadBody = {
            id: tag.id,
            name: nameValue,
            description: descriptionValue,
            color: selectedTagColor.name.toLowerCase()
        }
        try {
            const tagRes = await updateOneTag(payloadBody);
            dispatch(setGlobalToastOpen(tagRes));
            let despatchPayload = {
                tagId: tag.id,
                tag: tagRes.data
            }
            dispatch(updateTagByTagIdToColumn(despatchPayload));
            dispatch(updateTagByTagIdToCluster(tagRes.data));
        } catch (error) {}
        closeModal();
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        Tag: {tag.name}
                                    </Dialog.Title>
                                    <div className="w-full mt-2">
                                        <div>
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                                                color
                                            </label>
                                            <Listbox value={selectedTagColor} onChange={setSelectedTagColor}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative border-[0.1px] border-[#9EA5B1] w-full w-[100px] cursor-default rounded-lg bg-white py-2 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                        <div className='flex'>
                                                            <div className={`fixed w-4 h-4 mx-2 self-center bg-${selectedTagColor.name.toLowerCase()}-500 rounded-full`} />
                                                            <div className='ml-7'>{selectedTagColor.name}</div>
                                                        </div>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {colors.map((color, colorIdx) => (
                                                                <Listbox.Option
                                                                    key={colorIdx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                        }`
                                                                    }
                                                                    value={color}
                                                                >
                                                                    {({ selected }) => (
                                                                        <>
                                                                            <div className='flex'>
                                                                                <div className={`w-4 h-4 mx-2 self-center bg-${color.name.toLowerCase()}-500 rounded-full`} />
                                                                                <div>{color.name}</div>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                        <div className='mb-2'>
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                                                name
                                            </label>
                                            <input className='w-full rounded-md p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none border-[#9EA5B1]'
                                                id="newTagName"
                                                type="text"
                                                placeholder="Tag name"
                                                value={nameValue}
                                                onChange={setNameHandler}
                                            />
                                        </div>
                                        <div>
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" >
                                                description
                                            </label>
                                            <textarea className="p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none h-[120px] border-[#9EA5B1] rounded-md w-full"
                                                placeholder="Add your description..."
                                                value={descriptionValue}
                                                onChange={setDescriptionHandler}>
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClickSaveTagHandler}
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
