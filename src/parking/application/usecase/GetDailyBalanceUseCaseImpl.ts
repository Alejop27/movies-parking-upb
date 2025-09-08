import { GetDailyBalanceUseCase } from '../../domain/port/driver/usecase/GetDailyBalanceUseCase';
import { DailyBalance } from '../../domain/model/DailyBalance';
import { ParkingRepository } from '../../domain/interfaces/ParkingRepository';

export class GetDailyBalanceUseCaseImpl implements GetDailyBalanceUseCase {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async execute(fecha: string): Promise<DailyBalance> {
        return await this.parkingRepository.getDailyBalance(fecha);
    }
}
