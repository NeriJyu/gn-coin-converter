import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import cors from "cors";
import "dotenv/config";
import { routes } from "./routes/index.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);

export { app };
