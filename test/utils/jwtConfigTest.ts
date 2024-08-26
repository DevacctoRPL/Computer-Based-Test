import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ts = process.env.TOKEN_SECRET || "TheGreatestDevacctoRPLEra!";

interface JwtPayload {
    niu?: number;
    sandi: string;
}

export function generateAccessTokenTest(payload: JwtPayload): string {
    console.log(ts)
    return jwt.sign(payload, ts, { expiresIn: '5m' });
}

