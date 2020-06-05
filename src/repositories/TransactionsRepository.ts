import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, transaction) => {
        const transactionType = transaction.type;
        if (transactionType === 'income') {
          acc.income += transaction.value;
        } else if (transactionType === 'outcome') {
          acc.outcome += transaction.value;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
