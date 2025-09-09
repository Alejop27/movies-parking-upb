import { AccountingNotifier } from '../../../../parking/domain/interfaces/AccountingNotifier';
import { ParkingTransaction } from '../../../../parking/domain/model/ParkingTransaction';
import { AccountingService } from '../../../application/service/AccountingService';

export class SimpleAccountingNotifier implements AccountingNotifier {
    constructor(private readonly accountingService: AccountingService) {}

    async notifyTransaction(transaction: ParkingTransaction): Promise<void> {
        await this.accountingService.recordTransaction(transaction);
    }
}
