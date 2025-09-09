import { DailyBalance } from '../../../model/DailyBalance';

export interface GetDailyBalanceUseCase {
    execute(fecha: string): Promise<DailyBalance>;
}
