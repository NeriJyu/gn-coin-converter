import { I_FindConvert } from "../interfaces/exchangeRates.interfaces";
import { I_User } from "../interfaces/user.interfaces";
import TransactionRepositorie from "../repositories/transaction.repositorie";
import ExchangeRatesAPIService from "../services/exchangeRates.service";

class ExchangeRatesController {
  private exchangeRatesAPIService = new ExchangeRatesAPIService();
  private transactionRepositorie = new TransactionRepositorie();

  findConvert(
    userBearer: I_User,
    amount: string,
    from: string,
    to: string
  ): Promise<I_FindConvert> {
    return new Promise(async (resolve, reject) => {
      try {
        const convertedValue = await this.exchangeRatesAPIService.getConvert(
          amount,
          from,
          to
        );

        await this.transactionRepositorie.createTransaction({
          user_id: userBearer.id,
          source_currency: convertedValue.query.from,
          destination_currency: convertedValue.query.to,
          origin_value: convertedValue.query.amount,
          conversion_rate: convertedValue.info.rate,
          date: new Date(convertedValue.info.timestamp * 1000).toUTCString(),
        });

        const lastTransaction =
          await this.transactionRepositorie.findLastTransaction();

        const createdTransaction =
          await this.transactionRepositorie.findTransactionById(
            lastTransaction.Id
          );

        resolve({ ...createdTransaction, target_value: convertedValue.result });
      } catch (err) {
        reject(err);
      }
    });
  }

  findConvertWithLatest(
    userBearer: I_User,
    amount: number,
    from: string,
    to: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const latest = await this.exchangeRatesAPIService.getLatest(from);

        let latestValue = 0;

        Object.entries(latest.rates).map(([key, rate]) => {
          if (key == to) latestValue = Number(rate);
        });

        if (!latestValue) throw "Invalid valur for to";

        await this.transactionRepositorie.createTransaction({
          user_id: userBearer.id,
          source_currency: from,
          destination_currency: to,
          origin_value: amount.toString(),
          conversion_rate: latestValue.toString(),
          date: new Date(latest.timestamp * 1000).toUTCString(),
        });

        const lastTransaction =
          await this.transactionRepositorie.findLastTransaction();

        const createdTransaction =
          await this.transactionRepositorie.findTransactionById(
            lastTransaction.Id
          );

        resolve({ ...createdTransaction, target_value: amount * latestValue });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default ExchangeRatesController;
