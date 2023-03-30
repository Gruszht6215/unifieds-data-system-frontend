import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { importedDatabaseSelector, fetchImportedDatabases } from '../../redux/slices/importedDatabaseSlice'
import { ImportedDatabase } from '../../interfaces/ImportedDatabase'
import ImportedDatabaseList from '../../components/imported-database/ImportedDatabaseList'

type Props = {}

export default function ManageDatabase({ }: Props) {
    const dispatch = useAppDispatch()
    const importedDatabaseReducer = useSelector(importedDatabaseSelector)

    let [filter] = useState({
        All: [
            {
                status: "all",
            },
        ],
        Active: [
            {
                status: 'active',
            },
        ],
        Pending: [
            {
                status: 'pending',
            },
        ],
    })


    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const isMatchFilter = (importedDatabase: ImportedDatabase, filter: string) => {
        if (filter === 'all') {
            return true
        }
        if (filter === 'active') {
            return importedDatabase.status === 'active'
        }
        if (filter === 'pending') {
            return importedDatabase.status === 'pending'
        }
        return false
    }

    useEffect(() => {
        dispatch(fetchImportedDatabases())
    }, [dispatch])

    return (
        <div className="w-full px-2 sm:px-0">
            <Tab.Group >
                <div className='flex items-center justify-between '>
                    <Tab.List className="max-w-md flex space-x-1 rounded-xl primary-bg-color p-1 w-full">
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
                </div>
                <Tab.Panels className="mt-2 w-full">
                    {Object.values(filter).map((items, idx) => {
                        return (
                            <Tab.Panel
                                key={idx}
                                className={classNames(
                                    "rounded-xl bg-white p-3 overflow-x-auto ",
                                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                                )}
                            >
                                {Object.values(items).map((item: any) =>
                                    Object.values(importedDatabaseReducer.importedDatabases).map((importedDatabase: ImportedDatabase, idx) =>
                                        isMatchFilter(importedDatabase, item.status) ? (
                                            <div key={idx}>
                                                <ImportedDatabaseList importedDatabase={importedDatabase} />
                                            </div>
                                        ) : (
                                            <div key={idx} />
                                        )
                                    )
                                )}
                            </Tab.Panel>
                        );
                    })}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}