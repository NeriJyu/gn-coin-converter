import { Router } from "express";
import UserController from "../controllers/user.controller";
import { I_CreateUser } from "../interfaces/user.interfaces";
import { handleError } from "../utils/err.util";

const userRouter = Router();
const userController = new UserController();

// CREATE USER
userRouter.post("/", async (req, res) => {
  try {
    const user: I_CreateUser = req.body;

    if (!user.email) throw "Email was not informed!";
    if (!user.password) throw "Password was not informed!";

    const newUser = await userController.createUser(user);

    res.status(201).send({
      status: "SUCCESS",
      data: newUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error creating user");
  }
});

export { userRouter };
