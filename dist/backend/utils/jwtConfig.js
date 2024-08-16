import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const ts = process.env.TOKEN_SECRET || "TheGreatestDevacctoRPLEra!";
export function generateAccessToken(payload) {
    return jwt.sign(payload, ts, { expiresIn: '20s' });
}
