import { Router } from 'express';
import { ParkingController } from '../controller/ParkingController';
import { ParkingRouter } from '../router/ParkingRouter';
import { ParkingServiceImpl } from '../../../../application/service/ParkingServiceImpl';
import { RegisterEntryUseCaseImpl } from '../../../../application/usecase/RegisterEntryUseCaseImpl';
import { ProcessExitUseCaseImpl } from '../../../../application/usecase/ProcessExitUseCaseImpl';
import { InMemoryParkingRepository } from '../../repository/InMemoryParkingRepository';
import { InMemoryClientRepository } from '../../repository/InMemoryClientRepository';
import { AccountingService } from '../../../../../accounting/application/service/AccountingService';
import { AccountingNotifierImpl } from '../../../../../accounting/infrastructure/adapter/notifier/AccountingNotifierImpl';

export default class ParkingRouterFactory {
    static create(accountingService: AccountingService): Router {
        // Repositorios
        const parkingRepository = new InMemoryParkingRepository();
        const clientRepository = new InMemoryClientRepository();
        
        // Notificador a contabilidad
        const accountingNotifier = new AccountingNotifierImpl(accountingService);

        // Casos de uso
        const registerEntryUseCase = new RegisterEntryUseCaseImpl(parkingRepository, clientRepository);
        const processExitUseCase = new ProcessExitUseCaseImpl(parkingRepository, clientRepository, accountingNotifier);

        // Servicio
        const parkingService = new ParkingServiceImpl(registerEntryUseCase, processExitUseCase);

        // Controlador y router
        const parkingController = new ParkingController(parkingService);
        const parkingRouter = new ParkingRouter(parkingController);
        
        return parkingRouter.getRouter();
    }
}
