import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const ts = process.env.TOKEN_SECRET || "TheGreatestDevacctoRPLEra!";
export const rts = process.env.REFRESH_TOKEN_SECRET || "GOATRPL!";

interface JwtPayload {
    nis?: number;
    sandi: string;
}

export function generateAccessToken(payload: JwtPayload, secret: string, expiresIn: string | number): string {
  return jwt.sign(payload, secret, {expiresIn});
}
