import { RecordTransactionUseCase } from '../../domain/port/driver/usecase/RecordTransactionUseCase';
import { Transaction } from '../../domain/model/Transaction';
import { TransactionRepository } from '../../domain/interface/TransactionRepository';
export class RecordTransactionUseCaseImpl implements RecordTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(transactionData: any): Promise<void> {
        const transaction: Transaction = {
            id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            registroId: transactionData.registroId,
            placa: transactionData.placa,
            tipo: transactionData.tipo,
            horaIngreso: transactionData.horaIngreso,
            horaSalida: transactionData.horaSalida,
            tiempoMinutos: transactionData.tiempoMinutos,
            monto: transactionData.monto,
            esClienteTienda: transactionData.esClienteTienda,
            fecha: transactionData.fecha,
            fechaCreacion: new Date().toISOString()
        };

        await this.transactionRepository.saveTransaction(transaction);
    }
}
