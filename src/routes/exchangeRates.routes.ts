import { Router } from "express";
import ExchangeRatesController from "../controllers/exchangeRates.controller";
import { decryptBearer } from "../utils/bearer.util";
import { handleError } from "../utils/err.util";

const exchangeRatesRouter = Router();
const exchangeRatesController = new ExchangeRatesController();

// CONVERT VALUES
exchangeRatesRouter.post("/convert", async (req, res) => {
  const [, token] = req.get("Authorization")?.split(" ") || "";

  try {
    const decodedBearer: any = decryptBearer(token);

    const userBearer = JSON.parse(decodedBearer.bearer);

    const { amount, from, to } = req.body;

    if (!amount) throw "Missing amount";
    if (!from) throw "Missing from";
    if (!to) throw "Missing to";

    const exchangeRates = await exchangeRatesController.findConvert(
      userBearer,
      amount.toString(),
      from.toString(),
      to.toString()
    );

    res.send({
      status: "SUCCESS",
      data: exchangeRates,
    });
  } catch (err) {
    handleError(err, res, "There was an error converting values");
  }
});

// CONVERT VALUES LATEST
exchangeRatesRouter.post("/latest", async (req, res) => {
  const [, token] = req.get("Authorization")?.split(" ") || "";

  try {
    const decodedBearer: any = decryptBearer(token);

    const userBearer = JSON.parse(decodedBearer.bearer);

    const { amount, from, to } = req.body;

    if (!amount) throw "Missing amount";
    if (!from) throw "Missing from";
    if (!to) throw "Missing to";

    const exchangeRates = await exchangeRatesController.findConvertWithLatest(
      userBearer,
      Number(amount),
      from.toString(),
      to.toString()
    );

    res.send({
      status: "SUCCESS",
      data: exchangeRates,
    });
  } catch (err) {
    handleError(err, res, "There was an error converting values");
  }
});

export { exchangeRatesRouter };
