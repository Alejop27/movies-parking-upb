import { ParkingRecord } from '../model/ParkingRecord';
import { DailyBalance } from '../model/DailyBalance';

export interface ParkingRepository {
    registerEntry(placa: string): Promise<ParkingRecord>;
    findActiveRecordByPlaca(placa: string): Promise<ParkingRecord | null>;
    processExit(placa: string, horaSalida: string, tiempoMinutos: number, monto: number): Promise<ParkingRecord>;
    getDailyBalance(fecha: string): Promise<DailyBalance>;
}
