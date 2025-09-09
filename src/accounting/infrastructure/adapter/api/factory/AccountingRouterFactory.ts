import { AccountingServiceImpl } from '../../../../application/service/AccountingServiceImpl'
import { RecordTransactionUseCaseImpl } from '../../../../application/usecase/RecordTransactionUseCaseImpl'
import { GetDailyBalanceUseCaseImpl } from '../../../../application/usecase/GetDailyBalanceUseCaseImpl'
import AbstractRouter from '../../../../../api/domain/model/AbstractRouter'
import { InMemoryTransactionRepository } from '../../repository/InMemoryTransactionRepository'
import { AccountingService } from '../../../../application/service/AccountingService'
import AccountingController from '../controller/AccountingController'
import AccountingRouter from '../router/AccountingRouter'

export default class AccountingRouterFactory {
    static readonly create = (): { router: AbstractRouter, service: AccountingService } => {
        const transactionRepository = new InMemoryTransactionRepository()
        if (!transactionRepository) {
            throw new Error('Failed to create TransactionRepository')
        }

        const recordTransactionUseCase = new RecordTransactionUseCaseImpl(transactionRepository)
        if (!recordTransactionUseCase) {
            throw new Error('Failed to create RecordTransactionUseCase')
        }

        const getDailyBalanceUseCase = new GetDailyBalanceUseCaseImpl(transactionRepository)
        if (!getDailyBalanceUseCase) {
            throw new Error('Failed to create GetDailyBalanceUseCase')
        }

        const accountingService = new AccountingServiceImpl(recordTransactionUseCase, getDailyBalanceUseCase)
        if (!accountingService) {
            throw new Error('Failed to create AccountingService')
        }

        const accountingController = new AccountingController(accountingService)
        if (!accountingController) {
            throw new Error('Failed to create AccountingController')
        }

        const accountingRouter = new AccountingRouter(accountingController)
        if (!accountingRouter) {
            throw new Error('Failed to create AccountingRouter')
        }

        return {
            router: accountingRouter,
            service: accountingService
        }
    }
}
