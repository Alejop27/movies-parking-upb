import { TransactionRepository } from '../../../domain/interface/TransactionRepository';
import { Transaction } from '../../../domain/model/Transaction';

export class InMemoryTransactionRepository implements TransactionRepository {
    private transactions: Transaction[] = [];

    async saveTransaction(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

    async getTransactionsByDate(fecha: string): Promise<Transaction[]> {
        return this.transactions.filter(txn => txn.fecha === fecha);
    }
}
