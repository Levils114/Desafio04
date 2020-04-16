import Transaction from '../models/Transaction';

interface CreateAppointmentDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    const allIncome = this.transactions.map(transaction => transaction.type === 'income' ? transaction.value: 0).reduce((acumulatedValue, currentValue) => acumulatedValue + currentValue,0);
    const allOutcome = this.transactions.map(transaction => transaction.type === 'outcome' ? transaction.value: 0).reduce((acumulatedValue, currentValue) => acumulatedValue + currentValue,0);

    const total = allIncome - allOutcome;

    const balance = {
      income: allIncome,
      outcome: allOutcome,
      total
    };

    return balance;

  }

  public create({ title, value, type }: CreateAppointmentDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
