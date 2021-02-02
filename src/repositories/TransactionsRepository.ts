import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const { income, outcome } = transactions.reduce(
      (previousValue, currentValue) => {
        const { value, type } = currentValue;
        const result = previousValue;
        result[type] += value;

        return result;
      },
      { income: 0, outcome: 0 },
    );

    return { income, outcome, total: income - outcome };
  }
}

export default TransactionsRepository;
