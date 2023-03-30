import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchConnectionProfiles, connectionProfileSelector } from '../redux/slices/connectionProfileSlice'
import { ConnectionProfile } from '../interfaces/ConnectionProfile'
import { useAppDispatch } from '../redux/store'
import { Tab } from '@headlessui/react'
import { fetchImportedDatabases } from '../redux/slices/importedDatabaseSlice'

import AddConnectionModal from '../components/connection-profile/AddConnectionModal'
import ConnectionProfileList from '../components/connection-profile/ConnectionProfileList'

type Props = {}

export default function ConectionProfile({ }: Props) {
  const connectionProfileReducer = useSelector(connectionProfileSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchImportedDatabases())
  }, [dispatch])

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

  const isMatchFilter = (connectionProfileItem: ConnectionProfile, filter: string) => {
    if (filter === 'all') {
      return true
    }
    if (filter === 'active') {
      return connectionProfileItem.importedDatabase?.status === 'active'
    }
    if (filter === 'pending') {
      return connectionProfileItem.importedDatabase?.status === 'pending'
    }
    return false
  }

  useEffect(() => {
    dispatch(fetchConnectionProfiles())
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
          <AddConnectionModal actionType='Add' connectionProfile={null} isOpenEditModal={null} setIsOpenEditModal={() => { }} />
        </div>
        <Tab.Panels className="mt-2 w-full">
          {Object.values(filter).map((items, idx) => {
            return (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white p-3 pb-10 overflow-x-auto ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                {Object.values(items).map((item: any) =>
                  Object.values(connectionProfileReducer.connectionProfiles).map(
                    (connectionProfileItem: ConnectionProfile, idx) =>
                      isMatchFilter(connectionProfileItem, item.status) ? (
                        <div key={idx}>
                          <ConnectionProfileList connectionProfileItem={connectionProfileItem} />
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
