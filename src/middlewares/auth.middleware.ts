import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JWT } from "../utils/jwt";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = JWT.verify(token);
    req.user = decoded as string | JwtPayload;
    next()
  } catch(err) {
    res.status(403).json({ message: 'Invalid token' });
  }

}
