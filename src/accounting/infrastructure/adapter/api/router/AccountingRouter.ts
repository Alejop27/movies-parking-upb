import { Router } from 'express';
import { AccountingController } from '../controller/AccountingController';

export class AccountingRouter {
    constructor(private readonly accountingController: AccountingController) {}

    getRouter(): Router {
        const router = Router();

        router.get('/reportes/balance-diario', this.accountingController.getDailyBalance);

        return router;
    }
}
