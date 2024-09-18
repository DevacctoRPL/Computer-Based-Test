import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '_Ar0hJWT12CBTohDEVACCTORPL4jon250167'; // Pastikan kunci ini sama di tempat lain

interface JwtPayload {
  userId: string;
}

export function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  console.log('Token:', token); // Log token untuk debugging

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log('Decoded Token:', decoded); // Log decoded token
    req.user = decoded; // Tambahkan informasi user ke objek req
    next();
  } catch (error) {
    console.log('Token Verification Error:', error); // Log error
    res.status(403).json({ message: 'Invalid token' });
  }
}

