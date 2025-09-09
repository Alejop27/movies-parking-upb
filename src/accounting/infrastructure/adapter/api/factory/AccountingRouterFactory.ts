import { Router } from 'express';
import { AccountingController } from '../controller/AccountingController';
import { AccountingRouter } from '../router/AccountingRouter';
import { AccountingServiceImpl } from '../../../../application/service/AccountingServiceImpl';
import { RecordTransactionUseCaseImpl } from '../../../../application/usecase/RecordTransactionUseCaseImpl';
import { GetDailyBalanceUseCaseImpl } from '../../../../application/usecase/GetDailyBalanceUseCaseImpl';
import { InMemoryTransactionRepository } from '../../repository/InMemoryTransactionRepository';
import { AccountingService } from '../../../../application/service/AccountingService';

export default class AccountingRouterFactory {
    static create(): { router: Router, service: AccountingService } {
        // Repositorio
        const transactionRepository = new InMemoryTransactionRepository();

        // Casos de uso
        const recordTransactionUseCase = new RecordTransactionUseCaseImpl(transactionRepository);
        const getDailyBalanceUseCase = new GetDailyBalanceUseCaseImpl(transactionRepository);

        // Servicio
        const accountingService = new AccountingServiceImpl(recordTransactionUseCase, getDailyBalanceUseCase);

        // Controlador y router
        const accountingController = new AccountingController(accountingService);
        const accountingRouter = new AccountingRouter(accountingController);
        
        return {
            router: accountingRouter.getRouter(),
            service: accountingService
        };
    }
}
