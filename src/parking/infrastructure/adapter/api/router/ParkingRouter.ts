import AbstractRouter from '../../../../../api/domain/model/AbstractRouter'
import ParkingController from '../controller/ParkingController'

export default class ParkingRouter extends AbstractRouter {
    constructor(private readonly parkingController: ParkingController) {
        super('/api/v1.0/estacionamiento')
        this.routes()
    }

    protected routes(): void {
        this.router.post('/ingresos', this.parkingController.registerEntry)
        this.router.post('/salidas', this.parkingController.processExit)
    }
}
