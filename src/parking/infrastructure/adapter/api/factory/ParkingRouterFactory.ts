import { ParkingServiceImpl } from '../../../../application/service/ParkingServiceImpl'
import { RegisterEntryUseCaseImpl } from '../../../../application/usecase/RegisterEntryUseCaseImpl'
import { ProcessExitUseCaseImpl } from '../../../../application/usecase/ProcessExitUseCaseImpl'
import AbstractRouter from '../../../../../api/domain/model/AbstractRouter'
import { JsonParkingRepository } from '../../repository/JsonParkingRepository'
import { JsonClientRepository } from '../../repository/JsonClientRepository'
import { SimpleAccountingNotifier } from '../../../../../accounting/infrastructure/adapter/notifier/AccountingNotifierImpl'
import ParkingController from '../controller/ParkingController'
import ParkingRouter from '../router/ParkingRouter'
import { AccountingService } from '../../../../../accounting/application/service/AccountingService'

export default class ParkingRouterFactory {
    static readonly create = (accountingService: AccountingService): AbstractRouter => {
        const parkingRepository = new JsonParkingRepository()
        if (!parkingRepository) {
            throw new Error('Failed to create ParkingRepository')
        }

        const clientRepository = new JsonClientRepository()
        if (!clientRepository) {
            throw new Error('Failed to create ClientRepository')
        }

        const accountingNotifier = new SimpleAccountingNotifier(accountingService)
        if (!accountingNotifier) {
            throw new Error('Failed to create AccountingNotifier')
        }

        const registerEntryUseCase = new RegisterEntryUseCaseImpl(parkingRepository, clientRepository)
        if (!registerEntryUseCase) {
            throw new Error('Failed to create RegisterEntryUseCase')
        }

        const processExitUseCase = new ProcessExitUseCaseImpl(parkingRepository, clientRepository, accountingNotifier)
        if (!processExitUseCase) {
            throw new Error('Failed to create ProcessExitUseCase')
        }

        const parkingService = new ParkingServiceImpl(registerEntryUseCase, processExitUseCase)
        if (!parkingService) {
            throw new Error('Failed to create ParkingService')
        }

        const parkingController = new ParkingController(parkingService)
        if (!parkingController) {
            throw new Error('Failed to create ParkingController')
        }

        const parkingRouter = new ParkingRouter(parkingController)
        if (!parkingRouter) {
            throw new Error('Failed to create ParkingRouter')
        }

        return parkingRouter
    }
}
