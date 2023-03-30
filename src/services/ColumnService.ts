import { handleResponse, generateUserToken } from "./handleService";

export const updateOneColumn = async (payload: any) => {
    // Payload example:
    // {    
    //     "columnId": 1,
    //     "description": "test",
    // }
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/column/updateOne?id=" + payload.columnId
    const res = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "column")
}

export const updateTagsColumnByColumnId = async (payload: { columnId:string, tagIds: any}) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/column/updateTagsColumnByColumnId?id=" + payload.columnId
    const res = await fetch(api, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "column")
}
