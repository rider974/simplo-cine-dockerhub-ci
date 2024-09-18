import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "votre_secret_jwt";

export function authenticateToken(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check for token in the Authorization header (Bearer Token)
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      // Extract the token from the Authorization header
      token = authHeader.split(" ")[1];
    } else {
      // If not found in Authorization header, look for the token in cookies
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        const cookieToken = cookieHeader
          .split("; ")
          .find((row) => row.startsWith("authToken="));
        if (cookieToken) {
          token = cookieToken.split("=")[1];
        }
      }
    }

    // If no token is found in either the Authorization header or cookies
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      (req as any).user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(403).json({ error: "Invalid token" });
    }
  };
}
