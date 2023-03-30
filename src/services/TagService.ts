import { handleResponse, generateUserToken } from "./handleService";

export const getTagsByUserId = async () => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/tag/getAllByUserId"
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "tag")
}

export const createTag = async (payload: any) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/tag/create"
    const res = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(payload),
    }).catch((err) => {
        console.log(err)
    });

    return await handleResponse(res, "tag")
}

export const updateOneTag = async (payload: {
    id: string,
    name: string,
    description: string,
    color: string
}) => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/tag/updateOne?id=" + payload.id
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

    return await handleResponse(res, "tag")
}