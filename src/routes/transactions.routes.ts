import { Router } from "express";
import TransactionController from "../controllers/transaction.controller";
import { handleError } from "../utils/err.util";

const transactionRouter = Router();
const transactionController = new TransactionController();

// FIND TRANSACTIONS BY USER
transactionRouter.get("/", async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) throw "Missing Parameters: user_id";

    const transactionsByUser =
      await transactionController.findTransactionsByUserId(Number(user_id));

    res.status(200).send({
      status: "SUCCESS",
      data: transactionsByUser,
    });
  } catch (err) {
    handleError(err, res, "There was an error finding transactions");
  }
});

export { transactionRouter };
