import { ParkingTransaction } from '../model/ParkingTransaction';

export interface AccountingNotifier {
    notifyTransaction(transaction: ParkingTransaction): Promise<void>;
}
