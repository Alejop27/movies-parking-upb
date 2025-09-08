import { ParkingRecord } from '../../../model/ParkingRecord';

export interface ProcessExitUseCase {
    execute(placa: string): Promise<ParkingRecord>;
}
