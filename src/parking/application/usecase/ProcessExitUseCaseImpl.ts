import { ProcessExitUseCase } from '../../domain/port/driver/usecase/ProcessExitUseCase';
import { VehicleEntry } from '../../domain/model/VehicleEntry';
import { ParkingTransaction } from '../../domain/model/ParkingTransaction';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';
import { ClientRepository } from '../../domain/interfaces/ClientRepository';
import { AccountingNotifier } from '../../domain/interfaces/AccountingNotifier';

export class ProcessExitUseCaseImpl implements ProcessExitUseCase {
    private readonly RATES = { CARRO: 88, MOTO: 66, IVA: 0.19 };

    constructor(
        private readonly parkingRepository: ParkingRepository,
        private readonly clientRepository: ClientRepository,
        private readonly accountingNotifier: AccountingNotifier
    ) {}

    async execute(placa: string): Promise<VehicleEntry> {
        // Buscar registro activo
        const activeEntry = await this.parkingRepository.findActiveByPlaca(placa);
        if (!activeEntry) {
            throw new Error(`No se encontró un registro activo para la placa ${placa}`);
        }

        // Calcular tiempo y monto
        const horaSalida = new Date().toISOString();
        const horaIngreso = new Date(activeEntry.horaIngreso);
        const tiempoMinutos = Math.ceil((new Date(horaSalida).getTime() - horaIngreso.getTime()) / (1000 * 60));

        const esClienteTienda = await this.clientRepository.isStoreClient(placa);
        let montoAPagar = 0;

        if (!esClienteTienda) {
            const tarifaBase = activeEntry.tipo === 'CARRO' ? this.RATES.CARRO : this.RATES.MOTO;
            const subtotal = tiempoMinutos * tarifaBase;
            montoAPagar = Math.round(subtotal * (1 + this.RATES.IVA));
        }

        // Actualizar registro de parking
        const exitEntry = await this.parkingRepository.updateExit(placa, horaSalida, tiempoMinutos, montoAPagar);

        // Notificar a contabilidad
        const transaction: ParkingTransaction = {
            registroId: exitEntry.registroId,
            placa: exitEntry.placa,
            tipo: exitEntry.tipo,
            horaIngreso: exitEntry.horaIngreso,
            horaSalida: horaSalida,
            tiempoMinutos: tiempoMinutos,
            monto: montoAPagar,
            esClienteTienda,
            fecha: new Date(horaSalida).toISOString().split('T')[0] || ''
        };

        await this.accountingNotifier.notifyTransaction(transaction);

        return exitEntry;
    }
}
