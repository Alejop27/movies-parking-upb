import { VehicleEntry } from '../../../model/VehicleEntry';

export interface RegisterEntryUseCase {
    execute(placa: string): Promise<VehicleEntry>;
}
