import { Transaction } from '../../../model/Transaction';

export interface RecordTransactionUseCase {
    execute(transactionData: any): Promise<void>;
}
