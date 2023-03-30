import { ConnectionProfile } from "../interfaces/ConnectionProfile";
import { handleResponse, generateUserToken } from "./handleService";

//fetch api from backend
export const getAllConnectionProfiles = async () => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/getAllByUserId"
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "connectionProfile")
}

export const getOneConnectionProfile = async (connectionId: string, userData?: any) => {
    const token = await generateUserToken(userData)

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/getOne?id=" + connectionId
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    })

    return await handleResponse(res, "connectionProfile")
}

//api create new connection profile
export const createConnectionProfile = async (connectionProfile: ConnectionProfile) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/create"
    const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify(connectionProfile),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "connectionProfile")
}

//api update connection profile
export const updateConnectionProfile = async (connectionProfile: any) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/updateOne?id=" + connectionProfile.id
    const res = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(connectionProfile),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "connectionProfile")
}

//api delete connection profile
export const deleteConnectionProfile = async (connectionId: string) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/deleteOne?id=" + connectionId
    const res = await fetch(api, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "connectionProfile")
}

//api import database
export const importConnectionDatabase = async (connectionId: string, importDbPayload: object) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/connection-profile/importDatabaseByConnectionId?id=" + connectionId
    const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify(importDbPayload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "connectionProfile")
}
