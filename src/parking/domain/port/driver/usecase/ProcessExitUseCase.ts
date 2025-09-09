import { VehicleEntry } from '../../../model/VehicleEntry';

export interface ProcessExitUseCase {
    execute(placa: string): Promise<VehicleEntry>;
}
