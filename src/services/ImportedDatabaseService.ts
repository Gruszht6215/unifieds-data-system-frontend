import { handleResponse, generateUserToken } from "./handleService";
import { ImportedDatabase } from "../interfaces/ImportedDatabase";

export const syncDatabaseSchema = async (importedDbId: string) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/imported-database/sync-schema?id=" + importedDbId
    const res = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "importedDatabase")
}

export const getImportedDatabasesByUserID = async () => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/imported-database/getAllByUserId"
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "importedDatabase")
}

export const deleteImportedDatabase = async (importedDbId: string) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/imported-database/deleteOne?id=" + importedDbId
    const res = await fetch(api, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "importedDatabase")
}

export const updateOneImportedDatabase = async (importedDatabase: ImportedDatabase) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/imported-database/updateOne?id=" + importedDatabase.id
    const res = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(importedDatabase),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "importedDatabase")
}