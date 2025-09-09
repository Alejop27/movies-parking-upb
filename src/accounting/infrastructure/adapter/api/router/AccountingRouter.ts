import AbstractRouter from '../../../../../api/domain/model/AbstractRouter'
import AccountingController from '../controller/AccountingController'

export default class AccountingRouter extends AbstractRouter {
    constructor(private readonly accountingController: AccountingController) {
        super('/api/v1.0/estacionamiento')
        this.routes()
    }

    protected routes(): void {
        this.router.get('/reportes/balance-diario', this.accountingController.getDailyBalance)
    }
}
