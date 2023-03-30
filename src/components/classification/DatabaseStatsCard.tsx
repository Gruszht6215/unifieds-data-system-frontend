import React from 'react'
import Link from 'next/link'
import { ImportedDatabase } from '../../interfaces/ImportedDatabase'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import TagCard from '../tag/TagCard'

type selectedData = {
  title: string
  type: string
  id: string
}

type Props = {
  importedDatabase: ImportedDatabase
  selectedData: selectedData
}

export default function DatabaseStatsCard({ importedDatabase, selectedData }: Props) {

  const isColumnContainSelectedData = (column: any) => {
    let isContain = false
    column.tags.forEach((tag: any) => {
      if (tag.id === selectedData.id) {
        isContain = true
      }
    })
    return isContain
  }

  const isTableContainSelectedData = (table: any) => {
    let isContain = false
    table.columns.forEach((column: any) => {
      if (isColumnContainSelectedData(column)) {
        isContain = true
      }
    })
    return isContain
  }

  return (
    <div className=''>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className={`flex w-full justify-between ${open ? 'rounded-t-lg' : 'rounded-lg'} primary-bg-color hover:bg-cyan-600 text-black px-4 py-2 text-left`}>
              <div>
                <div className='w-full'>
                  <div className='font-medium text-sm text-white'>
                    Database
                  </div>
                  <Link href={`/manage-database/database-profile/${importedDatabase.connectionProfileId}`}>
                    <div className='flex text-center w-[500px] bg-cyan-200 hover:bg-cyan-300 px-5 py-1 rounded-full'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
                      <div className='font-semibold w-full'>
                        {importedDatabase.name}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='flex justify-around mt-2'>
                  {/* <div className='grid grid-rows-2 place-items-center'> */}
                  <div className='grid justify-items-center'>
                    <div className='pt-1 w-10 h-10 text-center text-white rounded-full bg-cyan-600 border-4 border-x-cyan-300'>
                      {importedDatabase.tables?.filter((table: any) => isTableContainSelectedData(table)).length}
                    </div>
                    <div className='text-center font-normal text-xs text-white'>
                      Attached Table
                    </div>
                  </div>
                  {/* <div className='grid grid-rows-2 place-items-center'> */}
                  <div className='grid justify-items-center'>
                    <div className='flex justify-center pt-1 w-10 h-10 text-center text-white rounded-full bg-cyan-600 border-4 border-x-cyan-300'>
                      {importedDatabase.tables?.filter((table: any) => isTableContainSelectedData(table)).reduce((acc: number, table: any) => {
                        return acc + table.columns.filter((column: any) => isColumnContainSelectedData(column)).length
                      }, 0)}
                    </div>
                    <div className='text-center font-normal text-xs text-white'>
                      Attached Column
                    </div>
                  </div>
                </div>
              </div>
              <ChevronUpIcon
                className={`${open ? 'rotate-180 transform' : ''
                  } h-5 w-5 bg-sky-200 rounded-full ring-2 ring-sky-900`}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="primary-bg-color rounded-b-lg p-2 text-sm">
                <div>
                  <div className='flex flex-col'>
                    <div className='font-medium text-sm text-white'>
                      Database Description
                    </div>
                    <div className='font-normal text-xs w-full bg-cyan-200 rounded-lg p-1'>
                      {importedDatabase.description ? importedDatabase.description : 'No description'}
                    </div>
                  </div>
                  {
                    importedDatabase.tables?.filter((table: any) => isTableContainSelectedData(table))
                      .map((table, index) => (
                        <div key={index} className='mb-2'>
                          <div className={`bg-cyan-400 ring-2 ring-sky-900 rounded-lg mt-1 p-1`}>
                            <div className='w-full text-center rounded-full bg-cyan-200'>
                              <span className='font-semibold text-blue-900 mr-2'>
                                Table:
                              </span>
                              {table.name}
                            </div>
                            <div className='w-full bg-cyan-200 rounded-full px-2 mt-1'>
                              <span className='font-semibold text-blue-900 mr-2'>
                                Description:&nbsp;
                              </span>
                              {table.description ? table.description : 'No description'}
                            </div>
                            {
                              table.columns?.map((column, index) => (
                                <div key={index} className='px-1 bg-gray-100 rounded-lg'>
                                  {
                                    isColumnContainSelectedData(column) &&
                                    <div className='mt-2'>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Column:&nbsp;
                                        </span>
                                        {column.name}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Description:&nbsp;
                                        </span>
                                        {column.description}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Data Type:&nbsp;
                                        </span>
                                        {column.dataType}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Nullable:&nbsp;
                                        </span>
                                        {column.isNullable ? 'Yes' : 'No'}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Key:&nbsp;
                                        </span>
                                        {column.key}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Default Value:&nbsp;
                                        </span>
                                        {column.defaultValue}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Extra:&nbsp;
                                        </span>
                                        {column.extra}
                                      </div>
                                      <div>
                                        <span className='font-semibold text-blue-600 mr-2'>
                                          Tags:&nbsp;
                                        </span>
                                        {column.tags!.map((tag) => (
                                          <span key={tag.id}>
                                            <TagCard tag={tag}/>
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  }
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div >
  )
}