import { I_Transaction } from "../interfaces/transaction.interfaces";
import TransactionRepositorie from "../repositories/transaction.repositorie";

class TransactionController {
  private transactionRepositorie = new TransactionRepositorie();

  findTransactionsByUserId(user_id: number): Promise<I_Transaction[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const transactions =
          await this.transactionRepositorie.findTransactionsByUserId(user_id);

        resolve(transactions);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TransactionController;
