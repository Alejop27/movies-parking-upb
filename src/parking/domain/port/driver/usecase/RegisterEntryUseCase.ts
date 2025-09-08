import { ParkingRecord } from '../../../model/ParkingRecord';

export interface RegisterEntryUseCase {
    execute(placa: string): Promise<ParkingRecord>;
}
