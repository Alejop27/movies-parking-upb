import { RegisterEntryUseCase } from '../../domain/port/driver/usecase/RegisterEntryUseCase';
import { VehicleEntry, PARKING_LIMITS } from '../../domain/model/VehicleEntry';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';
import { ClientRepository } from '../../domain/interfaces/ClientRepository';

export class RegisterEntryUseCaseImpl implements RegisterEntryUseCase {
    constructor(
        private readonly parkingRepository: ParkingRepository,
        private readonly clientRepository: ClientRepository
    ) {}

    // src/parking/application/usecase/RegisterEntryUseCase.ts
async execute(placa: string): Promise<VehicleEntry> {
    // 1. Verificar si ya existe registro activo
    const existingEntry = await this.parkingRepository.findActiveByPlaca(placa);
    if (existingEntry) {
        throw new Error(`El vehículo con placa ${placa} ya se encuentra en el parqueadero`);
    }

    // 2. Determinar tipo de vehículo
    let vehicleType: 'CARRO' | 'MOTO';

    // Si es cliente registrado, tomar tipo desde el repositorio de clientes
    const clientType = await this.clientRepository.getClientType(placa);
    if (clientType) {
        vehicleType = clientType.toUpperCase() as 'CARRO' | 'MOTO';
    } else {
        // No es cliente -> inferir por formato de placa
        vehicleType = this.inferVehicleTypeFromPlaca(placa);
    }

    // 3. Validar tipo permitido
    if (vehicleType !== 'CARRO' && vehicleType !== 'MOTO') {
        throw new Error('Tipo de vehículo inválido. Debe ser CARRO o MOTO.');
    }

    // 4. Verificar disponibilidad de espacios
    const activeCount = await this.parkingRepository.countActiveByType(vehicleType);
    const limit = vehicleType === 'CARRO' ? PARKING_LIMITS.carros : PARKING_LIMITS.motos;

    if (activeCount >= limit) {
        throw new Error(`No hay espacios disponibles para ${vehicleType.toLowerCase()}s`);
    }

    // 5. Registrar ingreso
    return await this.parkingRepository.registerEntry(placa, vehicleType);
}

private inferVehicleTypeFromPlaca(placa: string): 'CARRO' | 'MOTO' {
    // Regla simple: placas de <= 6 caracteres son motos, el resto carros
    return placa.length <= 6 ? 'MOTO' : 'CARRO';
}
}