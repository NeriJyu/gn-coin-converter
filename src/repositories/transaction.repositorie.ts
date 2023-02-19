import { dbQuery, dbQueryFirst } from "../config/db";
import {
  I_CreateTransaction,
  I_Transaction,
} from "../interfaces/transaction.interfaces";

class TransactionRepositorie {
  findTransactionsByUserId(user_id: number): Promise<I_Transaction[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user_id || user_id <= 0)
          throw { status: 400, message: "User Id invalid!" };

        const transactions = (await dbQuery(
          "SELECT * FROM transactions WHERE user_id = ?",
          [user_id]
        )) as I_Transaction[];

        if (transactions.length === 0)
          throw { status: 404, message: "Transactions not found!" };

        resolve(transactions);
      } catch (err) {
        reject(err);
      }
    });
  }

  findTransactionById(id: number): Promise<I_Transaction> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id || id <= 0) throw { status: 400, message: "Id invalid!" };

        const transaction = await dbQueryFirst(
          "SELECT * FROM transactions WHERE id = ?",
          [id]
        );

        if (!transaction)
          throw { status: 404, message: "Transaction not found!" };

        resolve(transaction);
      } catch (err) {
        reject(err);
      }
    });
  }

  findLastTransaction(): Promise<{ Id: number }> {
    return new Promise(async (resolve, reject) => {
      try {
        const transaction: any = await dbQuery(
          `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'transactions'`
        );

        if (!transaction[0])
          throw { status: 404, message: "Transaction not found!" };

        resolve(transaction[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  createTransaction(transaction: I_CreateTransaction): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!transaction.user_id || transaction.user_id <= 0)
          throw { status: 400, message: "User Id invalid!" };

        if (!transaction.source_currency)
          throw { status: 400, message: "Source Currency was not informed!" };

        if (!transaction.destination_currency)
          throw {
            status: 400,
            message: "Destination Currency was not informed!",
          };

        if (!transaction.origin_value)
          throw { status: 400, message: "Origin Value was not informed!" };

        if (!transaction.conversion_rate)
          throw { status: 400, message: "Conversion Rate was not informed!" };

        if (!transaction.date)
          throw { status: 400, message: "Date was not informed!" };

        const createdTransaction = await dbQuery(
          "INSERT INTO transactions (user_id, source_currency, destination_currency, origin_value, conversion_rate, date) VALUES(?, ?, ?, ?, ?, ?)",
          [
            transaction.user_id,
            transaction.source_currency,
            transaction.destination_currency,
            transaction.origin_value,
            transaction.conversion_rate,
            transaction.date,
          ]
        );

        resolve(createdTransaction);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TransactionRepositorie;
