import React, { useState } from 'react'
import { Tag } from '../../interfaces/Tag'
import EditTagModal from './EditTagModal'

type Props = {
    tag: Tag
}

export const tagColorClass = (color: string) => {
    switch (color) {
        case 'red':
            return 'ring-1 ring-red-700 bg-red-100 text-red-600'
        case 'yellow':
            return 'ring-1 ring-yellow-700 bg-yellow-100 text-yellow-600'
        case 'green':
            return 'ring-1 ring-green-700 bg-green-100 text-green-600'
        case 'blue':
            return 'ring-1 ring-blue-700 bg-blue-100 text-blue-600'
        case 'purple':
            return 'ring-1 ring-purple-700 bg-purple-100 text-purple-600'
        default:
            return `ring-1 ring-${color}-700 bg-${color}-100 text-${color}-600`
    }
    // using switch case to avoid tailwindcss bug: https://github.com/tailwindlabs/tailwindcss/discussions/7745#discussioncomment-3686579
}

export default function TagCard({ tag }: Props) {
    const [isOpenEditTagModal, setIsOpenEditTagModal] = useState(false)
    const closeEditTagModal = () => {
        setIsOpenEditTagModal(false)
    }
    const firstCharToUpperCase = (str: string) => {
        try {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } catch (error) {
            return str
        }
    }

    return (
        <>
            <div className="relative group m-2 inline-flex cursor-pointer">
                <div className={`justify-self-center gap-1 rounded-full px-2 py-1 text-xs font-semibold
                ${tagColorClass(tag.color)}`} >
                    {firstCharToUpperCase(tag.name)}
                </div>
                <div className='overflow-visible absolute z-50 min-w-[100px] w-[200px] p-2 top-6 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg ring-1 ring-white'>
                    <button className='self-center'
                        onClick={() => {
                            setIsOpenEditTagModal(true)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    Description: {tag.description ? tag.description : 'No description'}
                </div>
            </div>
            {
                isOpenEditTagModal &&
                <EditTagModal
                    isOpen={isOpenEditTagModal}
                    closeModal={closeEditTagModal}
                    tag={tag}
                />
            }
        </>
    )
}