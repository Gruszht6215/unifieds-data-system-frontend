import React, { useEffect } from 'react'
import useSWR from 'swr'
import { getImportedDatabasesByUserID } from '../services/ImportedDatabaseService'
import { getTagsByUserId } from '../services/TagService'
import { getAllClustersByUserID } from '../services/ClusterService'
import { getTagColumnTreeMapData } from '../services/DashboardService'
import { fetchImportedDatabases } from '../redux/slices/importedDatabaseSlice'
import { useAppDispatch } from '../redux/store'
import DatabaseStatusPieChart from '../components/dashboard/DatabaseStatusPieChart';
import DbmsBarChart from '../components/dashboard/DbmsBarChart'
import TagColorRadarChart from '../components/dashboard/TagColorRadarChart'
import ClusterPieChart from '../components/dashboard/ClusterPieChart'
import TagColumnTreemap from '../components/dashboard/TagColumnTreemap'

type Props = {}

const importedDbfetcher = async () => {
    const res = await getImportedDatabasesByUserID()
    return res
}
const tagfetcher = async () => {
    const res = await getTagsByUserId()
    return res
}
const clusterfetcher = async () => {
    const res = await getAllClustersByUserID()
    return res
}
const tagColumnTreeMapDatafetcher = async () => {
    const res = await getTagColumnTreeMapData()
    return res
}

export default function dashboard({ }: Props) {
    const dispatch = useAppDispatch()
    const { data: importedDbData, error: importedDbError, isLoading: isImportedDbLoading } = useSWR('/api/imported-database', importedDbfetcher)
    const { data: tagData, error: tagError, isLoading: isTagLoading } = useSWR('/api/tags', tagfetcher)
    const { data: clusterData, error: clusterError, isLoading: isClusterLoading } = useSWR('/api/clusters', clusterfetcher)
    const { data: tagColumnTreeMapData, error: tagColumnTreeMapError, isLoading: isTagColumnTreeMapLoading } = useSWR('/api/tagColumnTreeMap', tagColumnTreeMapDatafetcher)

    useEffect(() => {
        dispatch(fetchImportedDatabases())
    }, [dispatch])

    if (importedDbError || tagError || clusterError || tagColumnTreeMapError) return <div>failed to load</div>
    if (isImportedDbLoading || isTagLoading || isClusterLoading || isTagColumnTreeMapLoading) return <div>loading...</div>
    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <div className="md:col-span-2 lg:col-span-1 hover:lg:col-span-2" >
                    <div className="h-[500px] p-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                        <div className='h-full mt-[-100px]'>
                            <DatabaseStatusPieChart data={importedDbData.data} />
                        </div>
                        <div className=''>
                            <h5 className="mt-[-110px] font-semibold text-xl text-gray-600 text-center">
                                Database Connection Status
                            </h5>
                        </div>
                        <div>
                            <table className="w-full text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-2">
                                            Database amount
                                        </td>
                                        <td className="text-gray-500">
                                            {importedDbData.data && importedDbData.data.length}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1 hover:lg:col-span-2" >
                    <div className="h-[500px] p-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                        <div className='h-full mt-[-100px]'>
                            <ClusterPieChart data={clusterData.data} />
                        </div>
                        <div className=''>
                            <h5 className="mt-[-110px] font-semibold text-xl text-gray-600 text-center">
                                Cluster
                            </h5>
                        </div>
                        <div>
                            <table className="w-full text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-2">
                                            Cluster amount
                                        </td>
                                        <td className="text-gray-500">
                                            {clusterData.data && clusterData.data.length}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="h-[500px] p-6 rounded-xl border border-gray-200">
                        <div className='h-full'>
                            <DbmsBarChart data={importedDbData.data} />
                        </div>
                        <div className='mt-[-12px] w-full text-xs'>
                            X Axis: #Database instance amount<br />
                            Y Axis: DBMS
                        </div>
                    </div>
                </div>
                <div className="h-full col-span-2 p-6 rounded-xl border border-gray-200">
                    <div className='flex justify-around'>
                        <TagColumnTreemap data={tagColumnTreeMapData.data} />
                        <div>
                            <h5 className="font-semibold text-xl text-gray-600 text-center">
                                Tag Usage
                            </h5>
                            <div className='text-center text-gray-600'>
                                top 10 most used tags
                            </div>
                            <table className="w-full text-gray-600">
                                {tagColumnTreeMapData.data && tagColumnTreeMapData.data
                                    .sort((a: any, b: any) => b.columnAmount - a.columnAmount)
                                    .slice(0, 10)
                                    .map((tagUsage: any, index: any) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td className="py-2 w-[200px]">
                                                    {index + 1}.&nbsp;{tagUsage.name}
                                                </td>
                                                <td className="text-gray-500">
                                                    {tagUsage.columnAmount}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="lg:h-full p-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                        <TagColorRadarChart data={tagData.data} />
                        <h5 className="font-semibold text-xl text-gray-600 text-center">
                            Tag Color Type
                        </h5>
                        <table className="w-full text-gray-600">
                            <tbody>
                                <tr>
                                    <td className="py-2">
                                        Tag amount
                                    </td>
                                    <td className="text-gray-500">
                                        {tagData.data && tagData.data.length}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}