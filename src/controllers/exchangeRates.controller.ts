import { I_FindConvert } from "../interfaces/exchangeRates.interfaces";
import { I_User } from "../interfaces/user.interfaces";
import TransactionRepositorie from "../repositories/transactions.repositorie";
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
}

export default ExchangeRatesController;
