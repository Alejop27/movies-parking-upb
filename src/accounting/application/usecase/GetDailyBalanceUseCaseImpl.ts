import { GetDailyBalanceUseCase } from '../../domain/port/driver/usecase/GetDailyBalanceUseCase';
import { DailyBalance, VehicleDetail } from '../../domain/model/DailyBalance';
import { TransactionRepository } from '../../domain/interface/TransactionRepository';

export class GetDailyBalanceUseCaseImpl implements GetDailyBalanceUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(fecha: string): Promise<DailyBalance> {
        const transactions = await this.transactionRepository.getTransactionsByDate(fecha);
        
        const recaudoTotal = transactions.reduce((total, txn) => total + txn.monto, 0);
        
        const detalleVehiculos: VehicleDetail[] = transactions.map(txn => ({
            placa: txn.placa,
            tipo: txn.tipo,
            esClienteTienda: txn.esClienteTienda,
            montoPagado: txn.monto
        }));

        return {
            fechaReporte: fecha,
            recaudoTotalDelDia: recaudoTotal,
            detalleVehiculos
        };
    }
}
