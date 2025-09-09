import { VehicleEntry } from '../../../model/VehicleEntry';

export interface RegisterEntryUseCase {
    execute(placa: string, tipo: string): Promise<VehicleEntry>;
}
