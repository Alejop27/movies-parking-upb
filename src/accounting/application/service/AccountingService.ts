import { DailyBalance } from '../../domain/model/DailyBalance';

export interface AccountingService {
    recordTransaction(transactionData: any): Promise<void>;
    getDailyBalance(fecha: string): Promise<DailyBalance>;
}
