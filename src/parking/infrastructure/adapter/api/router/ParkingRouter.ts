import { Router } from 'express';
import { ParkingController } from '../controller/ParkingController';

export class ParkingRouter {
    constructor(private readonly parkingController: ParkingController) {}

    getRouter(): Router {
        const router = Router();

        router.post('/ingresos', this.parkingController.registerEntry);
        router.post('/salidas', this.parkingController.processExit);

        return router;
    }
}
