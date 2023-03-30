import { handleResponse, generateUserToken } from "./handleService";

export const getTagColumnTreeMapData = async () => {
    const token = await generateUserToken()

    const api = process.env.NEXT_PUBLIC_BACK_BASE_URL + "/api/dashboard/getTagColumnTreeMapData"
    const res = await fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).catch((err) => {
        console.log(err)
    });

    return await res.json()
}