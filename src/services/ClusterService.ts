import { handleResponse, generateUserToken } from "./handleService";

export const getAllClustersByUserID = async () => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/cluster/getAllByUserId"
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "cluster")
}

export const createCluster = async (cluster: any) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/cluster/create"
    const res = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(cluster),
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "cluster")
}

export const updateTagsClusterByClusterId = async (payload: { clusterId: string, tagIds: string[] | undefined }) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/cluster/updateTagsClusterByClusterId?id=" + payload.clusterId
    const res = await fetch(api, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(payload),
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "cluster")
}

export const updateOneClusterByClusterId = async (cluster: any ) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/cluster/updateOne?id=" + cluster.id
    const res = await fetch(api, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(cluster),
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "cluster")
}

export const deleteClusterByClusterId = async (clusterId: string) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/cluster/deleteOne?id=" + clusterId
    const res = await fetch(api, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "cluster")
}