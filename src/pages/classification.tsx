import React, { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import { fetchClusters } from '../redux/slices/clusterSlice'
import { importedDatabaseSelector } from '../redux/slices/importedDatabaseSlice'
import { ImportedDatabase } from '../interfaces/ImportedDatabase'
import { tagColorClass } from '../components/tag/TagCard'
import ClusterCard from '../components/classification/ClusterCard'
import AddClusterFormModal from '../components/classification/AddClusterFormModal'
import DatabaseStatsCard from '../components/classification/DatabaseStatsCard'

type Props = {}

export default function Classification({ }: Props) {
  const dispatch = useAppDispatch()
  const clusterReducer = useSelector((state: any) => state.clusterReducer)
  const [isOpenAddClusterModal, setIsOpenAddClusterModal] = useState(false)
  const [isOpenStatsTab, setIsOpenStatsTab] = useState(false)
  const [statsTabData, setStatsTabData] = useState({ title: '', type: '', id: '', color: '' })
  const importedDatabaseReducer = useSelector(importedDatabaseSelector)
  const [databaseBySelectedItem, setDatabaseBySelectedItem] = useState<ImportedDatabase[]>([])
  const [amountTableBySelectedItem, setAmountTableBySelectedItem] = useState(0)
  const [amountColumnBySelectedItem, setAmountColumnBySelectedItem] = useState(0)

  useEffect(() => {
    dispatch(fetchClusters())
  }, [dispatch])

  useEffect(() => {
    if (statsTabData.type.toLowerCase() === 'tag') {
      // filter column in importedDatabases by tagId
      let dbByTagId: ImportedDatabase[] = []
      let amountTableIds: any = []
      let amountColumnIds: any = []
      importedDatabaseReducer.importedDatabases.forEach((database: ImportedDatabase) => {
        database?.tables?.forEach((table: any) => {
          table?.columns?.forEach((column: any) => {
            column?.tags?.forEach((tag: any) => {
              if (tag.id == statsTabData.id) {
                dbByTagId.push(database)
                amountTableIds.push(table.id)
                amountColumnIds.push(column.id)
              }
            })
          })
        })
      })
      setDatabaseBySelectedItem([...new Set(dbByTagId)])
      setAmountTableBySelectedItem([...new Set(amountTableIds)].length);
      setAmountColumnBySelectedItem([...new Set(amountColumnIds)].length);
    } else if (statsTabData.type.toLowerCase() === 'cluster') {
    }
  }, [statsTabData])

  let [filter] = useState({
    Cluster: [
      {
        status: "cluster",
      },
    ]
  })

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  function closeAddClusterModal() {
    setIsOpenAddClusterModal(false)
  }

  return (
    <div className={`grid grid-cols-${isOpenStatsTab ? '2' : '1'} gap-2`}>
      <div>
        <Tab.Group>
          <div className='flex items-center justify-between '>
            <Tab.List className="max-w-sm flex space-x-1 rounded-xl primary-bg-color p-1 w-full">
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
            <button
              className="flex rounded-xl secondary-bg-color hover:to-purple-900 text-white font-bold px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150
              shadow-lg shadow-purple-500/50"
              type="button"
              onClick={() => setIsOpenAddClusterModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="animate-bounce w-6 h-6 mr-1">
                <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
              </svg>
              Add Cluster
            </button>
            <AddClusterFormModal isOpen={isOpenAddClusterModal} closeModal={closeAddClusterModal} />
          </div>
          <Tab.Panels>
            <Tab.Panel>
              {Object.values(clusterReducer.clusters).map((cluster: any) => (
                <ClusterCard key={cluster.id} cluster={cluster} setIsOpenStatsTab={setIsOpenStatsTab} setStatsTabData={setStatsTabData} />
              ))}
            </Tab.Panel>
            <Tab.Panel>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {
        <div className={`mt-[-25px] mr-[-25px] p-4 shadow-black shadow-md bg-gray-100 border-l-black overflow-y-auto ease-in-out duration-300
        ${isOpenStatsTab ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <div className='flex justify-between text-3xl font-medium mb-2'>
              <div className={`px-6 py-1 rounded-full ${tagColorClass(statsTabData.color)}`}>
                {statsTabData.title} Stats
              </div>
              <button className='justify-self-end hover:rounded-lg hover:bg-gray-300 hover:bg-gray-400' onClick={() => setIsOpenStatsTab(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className='flex justify-around font-semibold bg-gray-100'>
              <div>
                <div className='text-center'>
                  {databaseBySelectedItem.length}
                </div>
                <div className='text-sm text-gray-600'>
                  Databases
                </div>
              </div>
              <div>
                <div className='text-center'>
                  {amountTableBySelectedItem}
                </div>
                <div className='text-sm text-gray-600'>
                  Tables
                </div>
              </div>
              <div>
                <div className='text-center'>
                  {amountColumnBySelectedItem}
                </div>
                <div className='text-sm text-gray-600'>
                  Columns
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            {databaseBySelectedItem.map((database: any, idx) => (
              <div key={idx} className="px-2 pt-2">
                <DatabaseStatsCard importedDatabase={database} selectedData={statsTabData} />
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}