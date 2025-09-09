import { VehicleEntry } from '../../domain/model/VehicleEntry';

export interface ParkingService {
    registerVehicleEntry(placa: string): Promise<VehicleEntry>;
    processVehicleExit(placa: string): Promise<VehicleEntry>;
}
