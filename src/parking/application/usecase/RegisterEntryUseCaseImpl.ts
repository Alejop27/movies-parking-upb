import { RegisterEntryUseCase } from '../../domain/port/driver/usecase/RegisterEntryUseCase';
import { VehicleEntry, PARKING_LIMITS } from '../../domain/model/VehicleEntry';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';
import { ClientRepository } from '../../domain/interfaces/ClientRepository';

export class RegisterEntryUseCaseImpl implements RegisterEntryUseCase {
    constructor(
        private readonly parkingRepository: ParkingRepository,
        private readonly clientRepository: ClientRepository
    ) {}

    async execute(placa: string): Promise<VehicleEntry> {
        // Verificar si ya existe registro activo
        const existingEntry = await this.parkingRepository.findActiveByPlaca(placa);
        if (existingEntry) {
            throw new Error(`El vehículo con placa ${placa} ya se encuentra en el parqueadero`);
        }

        // Determinar tipo de vehículo
        let vehicleType = await this.clientRepository.getClientType(placa) || 'CARRO';
        
        // Si no es cliente registrado, inferir por formato de placa
        if (!await this.clientRepository.isStoreClient(placa)) {
            vehicleType = this.inferVehicleTypeFromPlaca(placa);
        }

        // Verificar disponibilidad de espacios
        const activeCount = await this.parkingRepository.countActiveByType(vehicleType);
        const limit = vehicleType === 'CARRO' ? PARKING_LIMITS.carros : PARKING_LIMITS.motos;
        
        if (activeCount >= limit) {
            throw new Error(`No hay espacios disponibles para ${vehicleType.toLowerCase()}s`);
        }

        return await this.parkingRepository.registerEntry(placa, vehicleType);
    }

    private inferVehicleTypeFromPlaca(placa: string): string {
        // Lógica simple para inferir tipo por formato de placa
        return placa.length <= 6 ? 'MOTO' : 'CARRO';
    }
}
