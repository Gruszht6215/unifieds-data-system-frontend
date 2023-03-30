import { handleResponse, generateUserToken } from "./handleService";
import { Table } from "../interfaces/Table";

export const getAllDbTableByImportedDB = async (importedDbId: string, userData?: any) => {
    const token = await generateUserToken(userData)

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/table/getAllByImportedDbId?id=" + importedDbId
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "table")
}

export const updateOneTable = async (table: Table) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/table/updateOne?id=" + table.id
    const res = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(table),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "table")
}