import { dbQuery, dbQueryFirst } from "../config/db";

export type Transaction = {
  id: number;
  user_id: number;
  source_currency: string;
  origin_value: string;
  conversion_rate: string;
};

const insertTransaction = async (transaction: Transaction) => {
  await dbQuery(
    "INSERT INTO transactions (user_id, source_currency, origin_value, conversion_rate) VALUES(?, ?, ?, ?)",
    [
      transaction.user_id,
      transaction.source_currency,
      transaction.origin_value,
      transaction.conversion_rate,
    ]
  );

  let createdTransaction: any = await dbQuery(
    `SELECT seq AS Id FROM sqlite_sequence WHERE name = 'transactions'`
  );

  console.log("createdTransaction: ");

  return getTransaction(createdTransaction[0].Id);
};

const listTransactions = async () => {
  const transactions = await dbQuery("SELECT * FROM transactions");

  return transactions as Transaction[];
};

const getTransaction = async (id: number) => {
  const transaction = await dbQueryFirst(
    "SELECT * FROM transactions WHERE id = ?",
    [id]
  );

  return transaction as Transaction | undefined;
};

const deleteTransaction = async (id: number) => {
  const transaction = await dbQueryFirst(
    "DELETE FROM transactions WHERE id = ?",
    [id]
  );

  return transaction as Transaction | undefined;
};

export const transactionModel = {
  insertTransaction,
  listTransactions,
  getTransaction,
  deleteTransaction,
};
