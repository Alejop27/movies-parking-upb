import { AccountingService } from './AccountingService';
import { DailyBalance } from '../../domain/model/DailyBalance';
import { RecordTransactionUseCase } from '../../domain/port/driver/usecase/RecordTransactionUseCase';
import { GetDailyBalanceUseCase } from '../../domain/port/driver/usecase/GetDailyBalanceUseCase';

export class AccountingServiceImpl implements AccountingService {
    constructor(
        private readonly recordTransactionUseCase: RecordTransactionUseCase,
        private readonly getDailyBalanceUseCase: GetDailyBalanceUseCase
    ) {}

    async recordTransaction(transactionData: any): Promise<void> {
        await this.recordTransactionUseCase.execute(transactionData);
    }

    async getDailyBalance(fecha: string): Promise<DailyBalance> {
        return await this.getDailyBalanceUseCase.execute(fecha);
    }
}
