import { NextApiResponse, NextApiRequest } from "next";
import { create } from 'svg-captcha';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const captcha = create({ size: 6, ignoreChars: '0oO' });
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(captcha);
}