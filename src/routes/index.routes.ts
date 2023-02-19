// import { Application, Router } from "express";
// import { authMidleware } from "../middlewares/auth.middleware";
// import authRouter from "./auth.routes";
// import { exchangeRatesRouter } from "./exchangeRates.routes";
// import { transactionRouter } from "./transactions.routes";
// import { userRouter } from "./user.routes";

import { Router } from "express";
import { authMidleware } from "../middlewares/auth.middleware";
import authRouter from "./auth.routes";
import { exchangeRatesRouter } from "./exchangeRates.routes";
import { transactionRouter } from "./transactions.routes";

// export const useRoutes = (app: Application) => {
//   const apiRouter = Router();
//   apiRouter.use("/auth", authRouter);
//   apiRouter.use("/users", userRouter);
//   apiRouter.use("/transactions", transactionRouter);
//   apiRouter.use(
//     "/exchange-rates",
//     async (req, res, next) => {
//       const authorization = req.get("Authorization");

//       if (!authorization)
//         return res.status(401).send({
//           status: "Unauthorized",
//           message: "Missing Parameter: Authorization",
//         });

//       const auth = await authMidleware(authorization);

//       if (!auth)
//         return res.status(401).send({
//           status: "Unauthorized",
//         });

//       next();

//       return "";
//     },
//     exchangeRatesRouter
//   );

//   app.use("", apiRouter);
// };
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../docs/swagger.json";
import { userRouter } from "./user.routes";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
routes.use("/auth", authRouter);
routes.use("/transactions", transactionRouter);
routes.use("/users", userRouter);
routes.use(
  "/exchange-rates",
  async (req, res, next) => {
    const authorization = req.get("Authorization");

    if (!authorization)
      return res.status(401).send({
        status: "Unauthorized",
        message: "Missing Parameter: Authorization",
      });

    const auth = await authMidleware(authorization);

    if (!auth)
      return res.status(401).send({
        status: "Unauthorized",
      });

    next();

    return "";
  },
  exchangeRatesRouter
);

export { routes };
