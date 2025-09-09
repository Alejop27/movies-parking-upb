import { ParkingService } from './ParkingService';
import { VehicleEntry } from '../../domain/model/VehicleEntry';
import { RegisterEntryUseCase } from '../../domain/port/driver/usecase/RegisterEntryUseCase';
import { ProcessExitUseCase } from '../../domain/port/driver/usecase/ProcessExitUseCase';

export class ParkingServiceImpl implements ParkingService {
    constructor(
        private readonly registerEntryUseCase: RegisterEntryUseCase,
        private readonly processExitUseCase: ProcessExitUseCase
    ) {}

    async registerVehicleEntry(placa: string): Promise<VehicleEntry> {
        return await this.registerEntryUseCase.execute(placa);
    }

    async processVehicleExit(placa: string): Promise<VehicleEntry> {
        return await this.processExitUseCase.execute(placa);
    }
}
