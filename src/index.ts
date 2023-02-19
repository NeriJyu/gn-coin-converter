// import bodyParser from "body-parser";
// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import { useRoutes } from "./routes/index.routes";

// dotenv.config();
// class App {
//   public app!: express.Application;
//   public PORT = process.env.PORT || 8091;

//   constructor() {
//     this.app = express();
//     this.config();
//   }

//   private async config() {
//     this.app.use(cors());

//     this.app.listen(this.PORT);
//     this.app.use(bodyParser.json());
//     useRoutes(this.app);

//     this.app.get("/", (_req, res) => {
//       res.send({ message: "Hello World!" });
//     });

//     console.log(`🚀 listening on port: ${this.PORT}`);
//   }
// }

// export default new App().app;
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";

import "dotenv/config";
import { routes } from "./routes/index.routes";

const app = express();

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
