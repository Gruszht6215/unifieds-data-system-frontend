import React, { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Cluster } from '../../interfaces/Cluster'
import { Tag } from '../../interfaces/Tag'
import AddTagFormModal from './AddTagFormModal'
import TagCard from '../tag/TagCard'
import EditClusterModal from './EditClusterModal'
import DeleteClusterModal from './DeleteClusterModal'

type Props = {
    cluster: Cluster
    setIsOpenStatsTab: (isOpenStatsTab: boolean) => void
    setStatsTabData: (statTabTitle: any) => void
}

export default function ClusterCard({ cluster, setIsOpenStatsTab, setStatsTabData }: Props) {
    const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false)
    const [isEditClusterModalOpen, setIsEditClusterModalOpen] = useState(false)
    const [isDeleteClusterModalOpen, setIsDeleteClusterModalOpen] = useState(false)

    const firstCharToUpperCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const closeAddTagModal = () => {
        setIsAddTagModalOpen(false)
    }

    const onClickTagStatsHandler = (tag: Tag) => {
        setIsOpenStatsTab(true)
        const title = tag.name + ' Tag'
        setStatsTabData({ title: title, id: tag.id, type: 'tag', color: tag.color })
    }

    return (
        <div className='my-4'>
            <div className="px-4 py-2 rounded-lg secondary-bg-color">
                <div className="flex mb-2 items-center justify-between">
                    <h2 className="ml-4 my-1 px-6 py-1 primary-bg-color ring-2 ring-purple-900 text-2xl font-semibold text-white rounded-full">
                        {firstCharToUpperCase(cluster.name)}
                    </h2>
                    <div className=''>
                        <button className='p-2 mr-2 rounded-full bg-purple-200 text-purple-900 hover:text-orange-500 hover:bg-orange-200'
                            onClick={() => setIsEditClusterModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                        </button>
                        <button className=' p-2 rounded-full bg-purple-200 text-purple-900 hover:text-red-500 hover:bg-red-200'
                            onClick={() => setIsDeleteClusterModalOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='pb-2 mb-2 bg-gray-100 rounded-lg'>
                    <Disclosure defaultOpen>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-t-lg bg-purple-200 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <div className='flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="self-center w-6 h-6">
                                            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                                        </svg>
                                        <span className='ml-2 px-2 rounded-full bg-purple-100 text-base self-center border-dashed border-2 border-purple-500 '>
                                            {cluster.tags?.length}
                                        </span>
                                        <div className={`ml-6 inline-flex self-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold
                                            bg-purple-500 text-purple-100 hover:bg-purple-600 cursor-pointer`}
                                            onClick={() => setIsAddTagModalOpen(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            ADD TAG
                                        </div>
                                        <AddTagFormModal isOpen={isAddTagModalOpen} closeModal={closeAddTagModal} cluster={cluster} />
                                    </div>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-2 pt-2 text-sm text-gray-500">
                                    {cluster.tags!.map((tag) => (
                                        <div key={tag.id} className="inline-flex" onClick={() => { onClickTagStatsHandler(tag) }}>
                                            <TagCard tag={tag} />
                                        </div>
                                    ))}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
            {
                isEditClusterModalOpen &&
                <EditClusterModal isOpen={isEditClusterModalOpen}
                    closeModal={() => setIsEditClusterModalOpen(false)}
                    cluster={cluster}
                />
            }
            {
                isDeleteClusterModalOpen &&
                <DeleteClusterModal isOpen={isDeleteClusterModalOpen}
                    closeModal={() => setIsDeleteClusterModalOpen(false)}
                    cluster={cluster}
                />
            }

        </div>
    )
}