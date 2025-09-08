import { RegisterEntryUseCase } from '../../domain/port/driver/usecase/RegisterEntryUseCase';
import { ParkingRecord } from '../../domain/model/ParkingRecord';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';

export class RegisterEntryUseCaseImpl implements RegisterEntryUseCase {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async execute(placa: string): Promise<ParkingRecord> {
        // Validar que no existe un registro activo para esta placa
        const activeRecord = await this.parkingRepository.findActiveRecordByPlaca(placa);
        if (activeRecord) {
            throw new Error(`Vehículo con placa ${placa} ya está registrado en el parqueadero`);
        }

        return await this.parkingRepository.registerEntry(placa);
    }
}
