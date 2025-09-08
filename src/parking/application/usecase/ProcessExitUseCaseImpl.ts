import { ProcessExitUseCase } from '../../domain/port/driver/usecase/ProcessExitUseCase';
import { ParkingRecord } from '../../domain/model/ParkingRecord';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';
import { ClientRepository } from '../../domain/interfaces/ClientRepository';
import { VehicleType } from '../../domain/model/Vehicle';

export class ProcessExitUseCaseImpl implements ProcessExitUseCase {
    private readonly CARRO_TARIFA = 88; // pesos por minuto
    private readonly MOTO_TARIFA = 66;  // pesos por minuto
    private readonly IVA = 0.19;

    constructor(
        private readonly parkingRepository: ParkingRepository,
        private readonly clientRepository: ClientRepository
    ) {}

    async execute(placa: string): Promise<ParkingRecord> {
        // Buscar registro activo
        const activeRecord = await this.parkingRepository.findActiveRecordByPlaca(placa);
        if (!activeRecord) {
            throw new Error(`No se encontró registro activo para la placa ${placa}`);
        }

        const horaSalida = new Date().toISOString();
        const horaIngreso = new Date(activeRecord.horaIngreso);
        const tiempoMinutos = Math.ceil((new Date(horaSalida).getTime() - horaIngreso.getTime()) / (1000 * 60));

        // Verificar si es cliente de tienda
        const storeClient = await this.clientRepository.isStoreClient(placa);
        let monto = 0;

        if (!storeClient || !storeClient.esClienteTienda) {
            // Calcular tarifa según tipo de vehículo
            const tarifa = activeRecord.tipo === VehicleType.CARRO ? this.CARRO_TARIFA : this.MOTO_TARIFA;
            const subtotal = tiempoMinutos * tarifa;
            monto = Math.round(subtotal * (1 + this.IVA));
        }

        return await this.parkingRepository.processExit(placa, horaSalida, tiempoMinutos, monto);
    }
}
