import { Fragment, useState, useEffect, ChangeEvent } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Cluster } from '../../interfaces/Cluster'
import { Tag } from '../../interfaces/Tag'
import { useAppDispatch } from '../../redux/store'
import { getTagsByUserId, createTag } from '../../services/TagService'
import { updateTagsClusterByClusterIdDispatch, addTagToCluster } from '../../redux/slices/clusterSlice'
import useSWR from 'swr'
import TagCard from '../tag/TagCard'

type Props = {
    isOpen: boolean
    closeModal: () => void
    cluster: Cluster
}

const fetcher = async () => {
    const res = await getTagsByUserId()
    return res
}

const colors = [
    { id: 1, name: 'Red' },
    { id: 2, name: 'Blue' },
    { id: 3, name: 'Yellow' },
    { id: 4, name: 'Green' },
    { id: 5, name: 'Purple' },
]

export default function AddTagFormModal({ isOpen, closeModal, cluster }: Props) {
    const dispatch = useAppDispatch()
    const { data, error, isLoading } = useSWR('getTagsByUserId', fetcher)
    const [currentTags, setCurrentTags] = useState(cluster.tags)
    const [availableTags, setAvailableTags] = useState<Tag[]>([])
    const [resetCurentTags, setResetCurrentTags] = useState(cluster.tags)
    const [resetAvailableTags, setResetAvailableTags] = useState<Tag[]>([])
    const [selectedTagColor, setSelectedTagColor] = useState(colors[0])
    const [newTagName, setNewTagName] = useState('')

    useEffect(() => {
        setAvailableTags(removeCurrentTagFromAvailableTags)
        setResetAvailableTags(removeCurrentTagFromAvailableTags)
    }, [data])

    const removeCurrentTagFromAvailableTags = () => {
        let newAvailableTags = data?.data
        if (!newAvailableTags) return []
        if (!currentTags) return newAvailableTags

        currentTags.forEach((element) => {
            newAvailableTags = newAvailableTags.filter((tag: { id: string }) => {
                return tag.id !== element.id
            })
        })
        return newAvailableTags
    }
    const firstCharToUpperCase = (str: string) => {
        if (!str) return str
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const onClickConfirmHandler = () => {
        //current tags to tagIds
        const tagIds = currentTags?.map((tag) => {
            return tag.id
        })
        let payloadBody = {
            clusterId: cluster.id,
            tagIds: tagIds,
        }
        dispatch(updateTagsClusterByClusterIdDispatch(payloadBody))
        closeModal()
    }
    const onClickCancelHandler = () => {
        setCurrentTags(resetCurentTags)
        setAvailableTags(resetAvailableTags)
        closeModal()
    }
    const onClickCurrentTagHandler = (tag: Tag) => {
        const newCurrentTags = currentTags!.filter((element) => {
            return element.id !== tag.id
        })
        setCurrentTags(newCurrentTags)
        setAvailableTags([...availableTags, tag])
    }
    const onClickAvailableTagHandler = (tag: Tag) => {
        const newAvailableTags = availableTags.filter((element) => {
            return element.id !== tag.id
        })
        setAvailableTags(newAvailableTags)
        setCurrentTags([...currentTags!, tag])
    }
    const onClickAddTagHandler = async () => {
        const createTagBody: any = {
            name: firstCharToUpperCase(newTagName),
            color: selectedTagColor.name.toLowerCase(),
            clusterId: cluster.id,
        }
        try {
            const res = await createTag(createTagBody)
            if (res.status !== "success") return
            const newTag = res.data
            setCurrentTags([...currentTags!, newTag])
            dispatch(addTagToCluster(newTag))
            setNewTagName('')
            setResetCurrentTags([...currentTags!, newTag])
        } catch (error) { }
    }
    const setNewTagNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTagName(e.target.value);
    };

    const tagColorSelectionClass = (color: string) => {
        switch (color.toLowerCase()) {
            case 'red':
                return 'bg-red-500'
            case 'blue':
                return 'bg-blue-500'
            case 'yellow':
                return 'bg-yellow-500'
            case 'green':
                return 'bg-green-500'
            case 'purple':
                return 'bg-purple-500'
            default:
                return `bg-${color}-500`
        }
        // using switch case to avoid tailwindcss bug: https://github.com/tailwindlabs/tailwindcss/discussions/7745#discussioncomment-3686579
    }

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 overflow-auto" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-5xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Add Tag
                                    </Dialog.Title>
                                    <div className="grid grid-cols-2 mt-2 gap-4">
                                        <div className='w-full rounded-lg bg-black ring-2 ring-green-700'>
                                            <div className='w-full flex justify-center p-2 rounded-t-lg bg-gradient-to-r from-green-700 via-green-500 to-green-800 
                                            uppercase text-white text-sm font-semibold'>
                                                Current Tag
                                            </div>
                                            <div className='w-full flex gap-2 justify-center p-2 bg-gray-200 hover:bg-gray-300
                                            uppercase text-black text-sm font-semibold'>
                                                <input className='rounded-lg px-2 mr-2'
                                                    id="newTagName"
                                                    type="text"
                                                    placeholder="Tag Name"
                                                    value={newTagName}
                                                    onChange={setNewTagNameHandler}
                                                />
                                                <div className="self-center">
                                                    <Listbox value={selectedTagColor} onChange={setSelectedTagColor}>
                                                        <div className="relative">
                                                            <Listbox.Button className="relative w-full w-[100px] cursor-default rounded-lg bg-white py-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                                                                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                                                                        <div className={`w-4 h-4 mx-2 self-center rounded-full ${tagColorSelectionClass(color.name)}`} />
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
                                                <button className='ml-10 px-5 py-2 self-center rounded-lg text-white bg-green-500 hover:bg-green-600 text-sm'
                                                    onClick={() => onClickAddTagHandler()}>
                                                    Add
                                                </button>
                                            </div>
                                            <div className='p-2 rounded-b-lg bg-black'>
                                                {currentTags!.map((tag) => (
                                                    <div key={tag.id} className="inline-flex" onClick={() => onClickCurrentTagHandler(tag)}>
                                                        <TagCard tag={tag} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='w-full rounded-lg bg-black ring-2 ring-red-700'>
                                            <div className='w-full flex justify-center p-2 rounded-t-lg bg-gradient-to-r from-red-700 via-red-500 to-red-800 
                                            uppercase text-white text-sm font-semibold'>
                                                Available Tag
                                            </div>
                                            <div className='p-2 rounded-b-lg bg-black'>
                                                {availableTags.map((tag) => (
                                                    <div key={tag.id} className="inline-flex" onClick={() => onClickAvailableTagHandler(tag)}>
                                                        <TagCard tag={tag} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={onClickCancelHandler}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClickConfirmHandler}
                                        >
                                            Confirm
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
