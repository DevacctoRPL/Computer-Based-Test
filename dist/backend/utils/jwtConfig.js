import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const ts = process.env.TOKEN_SECRET || "TheGreatestDevacctoRPLEra!";
export const rts = process.env.REFRESH_TOKEN_SECRET || "GOATRPL!";
export function generateAccessToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, { expiresIn });
}
