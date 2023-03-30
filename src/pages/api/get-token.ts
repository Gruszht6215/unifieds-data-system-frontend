import { getToken } from "next-auth/jwt"
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({
        req: req,
        // raw: true,
    })
    console.log("########### TOKEN ##########")
    console.log(req)
    console.log(req.cookies)
    console.log(token)
    res.status(200).json(token)
    // res.status(200).json(token?.user)
}