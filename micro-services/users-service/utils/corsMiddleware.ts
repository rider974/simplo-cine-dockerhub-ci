import { NextApiRequest, NextApiResponse } from "next";
import Cors from "nextjs-cors";

export const corsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await Cors(req, res, {
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 204,
  });
};
