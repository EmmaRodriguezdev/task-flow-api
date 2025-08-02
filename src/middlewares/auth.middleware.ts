import { NextFunction, Request, Response } from "express";
import { JWT } from "../utils/jwt";
import { AuthToken } from "@/config/express/auth"; 

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = JWT.verify(token) as AuthToken;

    if (!decoded?.id) {
      res.status(403).json({ message: 'Invalid token structure' });
      return;
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
}
