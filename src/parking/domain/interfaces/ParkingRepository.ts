import { VehicleEntry } from '../model/VehicleEntry';

export interface ParkingRepository {
    registerEntry(placa: string, tipo: string): Promise<VehicleEntry>;
    findActiveByPlaca(placa: string): Promise<VehicleEntry | null>;
    updateExit(placa: string, horaSalida: string, tiempoMinutos: number, monto: number): Promise<VehicleEntry>;
    countActiveByType(tipo: string): Promise<number>;
}
