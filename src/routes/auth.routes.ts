import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { I_User } from "../interfaces/user.interfaces";
import { handleError } from "../utils/err.util";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", async (req, res) => {
  try {
    const credentials: I_User = req.body;

    if (!credentials.email)
      res.status(400).send({
        status: "ERROR",
        err: "An error occurred during login",
        message: "Missing Parameters: E-mail",
      });

    if (!credentials.password)
      res.status(400).send({
        status: "ERROR",
        err: "An error occurred during login",
        message: "Missing Parameters: Password",
      });

    const auth = await authController.login(credentials);

    if (!auth)
      res.status(401).send({
        message: "Invalid credentials",
      });

    res.status(200).send({
      status: "OK",
      data: auth,
    });
  } catch (err) {
    handleError(err, res, "An error occurred during login");
  }
});

// authRouter.post("/login", async (req, res) => {
//   const credentials: any = req.body;

//   if (!credentials.email)
//     return res.status(400).send({
//       status: "ERROR",
//       err: "An error occurred during login",
//       message: "Missing Parameters: E-mail",
//     });

//   if (!credentials.password)
//     return res.status(400).send({
//       status: "ERROR",
//       err: "An error occurred during login",
//       message: "Missing Parameters: Password",
//     });
//   console.log("1");

//   const auth = await authController.login(credentials);

//   console.log("2", auth);

//   if (!auth)
//     return res.status(401).send({
//       message: "Invalid credentials",
//     });

//   res.status(200).send({
//     status: "OK",
//     data: auth,
//   });
// });

export default authRouter;
