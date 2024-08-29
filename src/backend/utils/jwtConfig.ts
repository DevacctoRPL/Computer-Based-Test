import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ts = process.env.TOKEN_SECRET || "TheGreatestDevacctoRPLEra!";

interface JwtPayload {
    nis?: number;
    sandi: string;
}

export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, ts, { expiresIn: '10s' });
}

export default jwt