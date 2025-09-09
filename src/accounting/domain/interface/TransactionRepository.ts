import { Transaction } from '../model/Transaction';

export interface TransactionRepository {
    saveTransaction(transaction: Transaction): Promise<void>;
    getTransactionsByDate(fecha: string): Promise<Transaction[]>;
}
